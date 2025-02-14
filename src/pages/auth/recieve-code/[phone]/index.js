import { useState, useEffect, useContext } from "react";
import Brand from "@/components/brand";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import storage from "@/services/storage";
import { useRouter } from "next/router";
import { UserProfileContext } from "@/context/responseProvider";
import { get } from "lodash";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { phone } = router.query;
  const { setResult } = useContext(UserProfileContext);
  const [code, setCode] = useState(new Array(5).fill(""));
  const [timer, setTimer] = useState(10);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Get saved timestamp from localStorage
    const savedTimestamp = localStorage.getItem("timerTimestamp");
    const savedTime = parseInt(localStorage.getItem("timer"), 10);

    if (savedTimestamp && savedTime) {
      const elapsedTime = Math.floor(
        (Date.now() - parseInt(savedTimestamp, 10)) / 1000
      );
      const newTime = Math.max(savedTime - elapsedTime, 0); // Ensure timer never goes negative
      setTimer(newTime);
    } else {
      setTimer(120);
      localStorage.setItem("timer", 120);
      localStorage.setItem("timerTimestamp", Date.now().toString());
    }

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        localStorage.setItem("timer", prev - 1);
        localStorage.setItem("timerTimestamp", Date.now().toString());
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (value, index) => {
    if (value.match(/^[0-9]$/)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Focus the next input
      if (index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const onSubmit = async () => {
    const formattedPhone = `998${phone.replace(/[^0-9]/g, "")}`;
    const result = await signIn("credentials", {
      phone: formattedPhone,
      sms_code: code.join(""),
      redirect: false, // Prevent automatic redirect
    });

    if (result?.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Logged in successfully");
      await router.push(`/dashboard?phone=${phone}`);
    }
  };

  const { mutate: resendSMSCode, isLoading } = usePostQuery({
    listKeyId: KEYS.resendSMSCode,
  });

  const onSubmitResendedCode = () => {
    setTimer(120);
    localStorage.setItem("timer", 120);
    localStorage.setItem("timerTimestamp", Date.now().toString());

    // Clear any existing interval to avoid duplication
    clearInterval(window.timerInterval);

    // Start the countdown again
    window.timerInterval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(window.timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    resendSMSCode(
      {
        url: URLS.resendSMSCode,
        attributes: {
          phone: parseInt(`998${phone.replace(/[^0-9]/g, "")}`),
        },
      },

      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Logged in successfully");
          router.push(`/auth/recieve-code/${phone}`);
        },
        onError: (error) => {
          console.log("Full error response:");

          toast.error(error.response?.data.error);
        },
      }
    );
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newCode = [...code];

      if (code[index] !== "") {
        // Remove the digit from the current input
        newCode[index] = "";
        setCode(newCode);
      } else if (index > 0) {
        // Move focus to the previous input
        document.getElementById(`input-${index - 1}`).focus();
      }
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover bg-no-repeat px-4"
      style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
    >
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white mx-auto rounded-lg p-6 sm:p-8">
        <div className="flex justify-center items-center mb-6">
          <Brand />
        </div>

        <p className="text-sm text-center mt-4 mb-2">{t("enterSMSCode")}</p>

        <div className="border p-4 sm:p-6 rounded-md">
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 sm:p-6 rounded-lg">
              <div className="flex justify-center space-x-2 mb-6">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-10 sm:w-12 sm:h-12 text-center border border-gray-300 rounded-md shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
              <div className="flex justify-center items-center mb-6">
                <hr className="border-t border-gray-300 flex-grow mx-2" />
                <span className="text-gray-600 text-xs sm:text-sm">
                  {formattedTime}
                </span>
                <hr className="border-t border-gray-300 flex-grow mx-2" />
              </div>
              <button
                onClick={
                  isCodeComplete
                    ? onSubmit
                    : timer === 0
                    ? onSubmitResendedCode
                    : onSubmit
                }
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-sm sm:text-base"
              >
                {isCodeComplete
                  ? t("submit")
                  : timer === 0
                  ? t("resendSMSCode")
                  : t("submit")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
