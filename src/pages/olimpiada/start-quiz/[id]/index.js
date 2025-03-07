import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import { useContext, useEffect, useState } from "react";
import { get, isEmpty } from "lodash";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { useTheme } from "next-themes";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import usePostQuery from "@/hooks/api/usePostQuery";
import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";
import { UserProfileContext } from "@/context/responseProvider";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import ContentLoader from "@/components/loader/content-loader";
const Index = () => {
  const initialTimeLeft = 3599;
  const [timeLeft, setTimeLeft] = useState(initialTimeLeft);
  const { t, i18n } = useTranslation();
  const { setResult } = useContext(UserProfileContext);
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = router.query;
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [openProfile, setOpenProfile] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isExiting, setIsExiting] = useState(false);

  const [remainingTime, setRemainingTime] = useState(null);

  const handleProfile = () => {
    setOpenProfile(!openProfile);
  };

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const {
    data: dateOfOlympics,
    isLoading: isLoadingDateOfRegister,
    isFetching: isFetchingDateOfRegister,
  } = useGetQuery({
    key: KEYS.olimpiadaQuizList,
    url: URLS.olimpiadaQuizList,
  });

  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
    }, 300);
  };

  const { data, isLoading, isFetching, isError, error } = useGetQuery({
    key: KEYS.quizTest,
    url: `${URLS.quizTest}${id}/`,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!id && !!session?.accessToken,
  });

  useEffect(() => {
    if (get(data, "data.remaining_time")) {
      setRemainingTime(get(data, "data.remaining_time"));
    }
  }, [data]);

  useEffect(() => {
    if (!remainingTime) return;

    const remainingTimestamp = new Date(remainingTime).getTime();
    const currentTimestamp = Date.now();

    const elapsedSeconds = Math.floor(
      (currentTimestamp - remainingTimestamp) / 1000
    );
    const adjustedTimeLeft = Math.max(initialTimeLeft - elapsedSeconds, 0);

    setTimeLeft(adjustedTimeLeft);
  }, [remainingTime]);

  const errorMessage = error?.response?.data?.message;

  const totalQuizzes = get(data, "data.questions", []).length;

  const handleNext = () => {
    setCurrentQuizIndex((prevIndex) =>
      Math.min(prevIndex + 1, totalQuizzes - 1)
    );
  };

  const handlePrevious = () => {
    setCurrentQuizIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && currentQuizIndex < totalQuizzes - 1) {
        handleNext();
      } else if (
        event.key === "ArrowRight" &&
        currentQuizIndex < totalQuizzes - 1
      ) {
        handleNext();
      } else if (event.key === "ArrowLeft" && currentQuizIndex > 0) {
        handlePrevious();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentQuizIndex, totalQuizzes]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("quizQuestions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      const fetchedQuestions = get(data, "data.questions", []);
      if (fetchedQuestions.length > 0) {
        localStorage.setItem("quizQuestions", JSON.stringify(fetchedQuestions));
        setQuestions(fetchedQuestions);
      }
    }
  }, [data]);

  console.log(selectedAnswers);

  const { mutate: submitAnswers } = usePostQuery({
    listKeyId: KEYS.submitAnswers,
  });

  const onSubmit = () => {
    if (!session?.accessToken) {
      console.error("Access token is missing.");
      return;
    }

    // `questions` tartibida `selectedAnswers`dan javoblarni olish
    const answers = questions
      .map(({ id }) => {
        if (selectedAnswers[id]) {
          const cleanedAnswer = selectedAnswers[id].split("_")[0];
          return {
            quiz_id: id,
            answer: cleanedAnswer,
          };
        }
        return null;
      })
      .filter(Boolean); // `null` qiymatlarni olib tashlaydi

    const payload = {
      answers,
      test_time: String(3600 - timeLeft),
    };

    setIsSubmitting(true);

    submitAnswers(
      {
        url: URLS.submitAnswers,
        attributes: payload,
        config: {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        },
      },
      {
        onSuccess: (data) => {
          setIsSubmitting(false);
          router.push("/results");
          setResult(data);
          localStorage.removeItem("timeLeft");
          localStorage.removeItem("selectedAnswers");
          localStorage.removeItem("answeredQuestions");
          localStorage.removeItem("quizQuestions");
        },
        onError: (error) => {
          setIsSubmitting(false);
          console.error("Error submitting answers:", error);
          if (error.response) {
            console.error("Server error response:", error.response.data);
          }
        },
      }
    );
  };

  useEffect(() => {
    if (timeLeft === 0) {
      onSubmit();
    }
  }, [timeLeft]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      get(data, "data.message", "") === "Siz allaqachon test topshirgansiz !!!"
    ) {
      setTimeLeft(0);
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTime = localStorage.getItem("timeLeft");
      if (savedTime) {
        setTimeLeft(parseInt(savedTime, 10));
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const updatedTime = prev - 1;
        if (typeof window !== "undefined") {
          localStorage.setItem("timeLeft", updatedTime);
        }
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    const handleUnload = () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("timeLeft", timeLeft);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [timeLeft]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAnswers = localStorage.getItem("selectedAnswers");
      const savedAnsweredQuestions = localStorage.getItem("answeredQuestions");
      if (savedAnswers) {
        setSelectedAnswers(JSON.parse(savedAnswers)); // Javoblarni holatga tiklash
      }
      if (savedAnsweredQuestions) {
        setAnsweredQuestions(JSON.parse(savedAnsweredQuestions)); // Javob berilgan savollarni tiklash
      }
    }
  }, []);

  const handleAnswer = (questionIndex, answer) => {
    if (
      !questionIndex ||
      questionIndex === "null" ||
      questionIndex === "undefined"
    ) {
      console.warn("Invalid Quiz ID:", questionIndex);
      return;
    }
    setSelectedAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [questionIndex]: answer,
      };

      // Javoblarni localStorage'ga saqlash
      if (typeof window !== "undefined") {
        localStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
      }
      return updatedAnswers;
    });

    if (!answeredQuestions.includes(questionIndex)) {
      setAnsweredQuestions((prev) => {
        const updatedQuestions = [...prev, questionIndex];

        // Javob berilgan savollarni localStorage'ga saqlash
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "answeredQuestions",
            JSON.stringify(updatedQuestions)
          );
        }
        return updatedQuestions;
      });
    }
  };

  if (isLoading || isFetching) {
    return (
      <Dashboard>
        <ContentLoader />
      </Dashboard>
    );
  }

  const percentage = (timeLeft / 3600) * 100;

  return (
    <Dashboard>
      {error ? (
        <div>
          <div
            className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] `}
          >
            <div className={"space-y-[15px]"}>
              <p
                className={
                  "text-[18px] dark:text-white text-black font-semibold"
                }
              >
                {t("testStart")}
              </p>

              <div className="flex gap-x-[12px] items-center">
                <Link
                  href={"/"}
                  className="text-[#5A6A85BF] dark:text-gray-200"
                >
                  {t("homePage")}
                </Link>
                <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
                <p className="text-black dark:text-white">{t("testStart")}</p>
              </div>
            </div>

            <div className={"absolute right-[40px] bottom-0"}>
              <Image
                src={"/icons/user-profile-bg.svg"}
                alt={"user-profile-bg"}
                width={168}
                height={165}
              />
            </div>
          </div>

          <div className="text-white bg-[#FA896B] flex gap-x-[10px] py-[20px] px-[10px] rounded-[10px]">
            <Image
              src={"/icons/Error.svg"}
              alt={"error"}
              width={24}
              height={24}
            />
            <div>
              {get(dateOfOlympics, "data", []).map((item, index) => (
                <p key={index}>
                  {i18n.language === "uz"
                    ? `Testni
                ${dayjs(get(item, "start_date", "")).format("DD.MM.YYYY")} dan
                ${dayjs(get(item, "end_date", "")).format(
                  "DD.MM.YYYY"
                )} gacha test topshirishingiz mumkin bo'ladi`
                    : `Тест можно будет пройти с ${dayjs(
                        get(item, "start_date", "")
                      ).format("DD.MM.YYYY")} по ${dayjs(
                        get(item, "end_date", "")
                      ).format("DD.MM.YYYY")}.`}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="my-[30px] ">
            {isEmpty(get(data, "data.message", "")) ? (
              <div className="grid sm:grid-cols-1 md:grid-cols-12 gap-x-[20px] gap-y-[20px]">
                {/* Quiz Section */}
                <div className="sm:col-span-12 md:col-span-8 space-y-[20px] order-2 md:order-none">
                  {questions?.length > 0 && (
                    <div className="border p-[20px] sm:p-[15px] shadow-md rounded-[8px] bg-white border-[#EAEFF4] dark:bg-[#26334AFF] dark:border-[#2A3447FF]">
                      <div className="text-lg sm:text-base mb-[8px]">
                        <p className="mb-[15px] dark:text-white text-black">
                          {currentQuizIndex + 1} - {t("question")} :
                        </p>
                        {i18n.language === "uz" ? (
                          <div className="!text-lg sm:!text-base font-semibold mt-[20px] dark:text-white text-black dark:filter dark:brightness-0 dark:invert">
                            {parse(
                              questions[currentQuizIndex]?.question_uz,
                              ""
                            ) || ""}
                          </div>
                        ) : (
                          <div className="!text-lg sm:!text-base font-semibold mt-[20px] dark:text-white text-black dark:filter dark:brightness-0 dark:invert">
                            {parse(
                              questions[currentQuizIndex]?.question_ru,
                              ""
                            ) || ""}
                          </div>
                        )}

                        {/* Quizzes */}
                        {i18n.language === "uz" ? (
                          <ul className="mt-[20px] space-y-[10px]">
                            {["A_uz", "B_uz", "C_uz", "D_uz"].map(
                              (option, index) => (
                                <li
                                  key={index}
                                  className={`border cursor-pointer transform duration-200 p-[14px] sm:p-[10px] rounded-md text-black dark:text-white ${
                                    selectedAnswers[
                                      questions[currentQuizIndex]?.id
                                    ] === option
                                      ? "bg-blue-500 text-white"
                                      : "bg-transparent border-[#EAEFF4] hover:bg-[#f3f4f6] dark:border-transparent dark:bg-[#232f42] dark:hover:bg-[#20335DFF]"
                                  }`}
                                  onClick={() =>
                                    handleAnswer(
                                      questions[currentQuizIndex]?.id,
                                      option
                                    )
                                  }
                                >
                                  <div>
                                    {parse(
                                      get(data, "data.questions", [])[
                                        currentQuizIndex
                                      ][option],
                                      ""
                                    )}
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <ul className="mt-[20px] space-y-[10px]">
                            {["A_ru", "B_ru", "C_ru", "D_ru"].map(
                              (option, index) => (
                                <li
                                  key={index}
                                  className={`border cursor-pointer transform duration-200 p-[14px] sm:p-[10px] rounded-md text-black dark:text-white ${
                                    selectedAnswers[
                                      questions[currentQuizIndex]?.id
                                    ] === option
                                      ? "bg-blue-500 text-white"
                                      : "bg-transparent border-[#EAEFF4] hover:bg-[#f3f4f6] dark:border-transparent dark:bg-[#232f42] dark:hover:bg-[#20335DFF]"
                                  }`}
                                  onClick={() =>
                                    handleAnswer(
                                      questions[currentQuizIndex]?.id,
                                      option
                                    )
                                  }
                                >
                                  <div className="answers">
                                    {parse(
                                      get(data, "data.questions", [])[
                                        currentQuizIndex
                                      ][option],
                                      ""
                                    )}
                                  </div>
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-[15px] sm:mt-[10px]">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuizIndex === 0}
                      className={`text-white px-4 py-2 rounded-md ${
                        currentQuizIndex === 0 ? "bg-gray-400" : "bg-blue-500"
                      }`}
                    >
                      Oldingisi
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={currentQuizIndex === totalQuizzes - 1}
                      className={`text-white px-4 py-2 rounded-md ${
                        currentQuizIndex === totalQuizzes - 1
                          ? "bg-gray-400"
                          : "bg-blue-500"
                      }`}
                    >
                      Keyingisi
                    </button>
                  </div>
                </div>

                {/* Timer & Navigation */}
                <div className="sm:col-span-12 md:col-span-4 order-1 md:order-none rounded-md self-start p-[20px] sm:p-[15px] bg-white border-[#EAEFF4] border dark:bg-[#26334AFF] dark:border-[#2A3447FF]">
                  <div className="flex flex-col items-center justify-center space-y-5 p-4 w-full">
                    {/* Timer */}
                    <div className="relative w-44 h-44 hidden sm:block">
                      {" "}
                      {/* faqat katta ekranda ko'rinadi */}
                      <CircularProgressbar
                        value={percentage}
                        styles={buildStyles({
                          pathColor: "#6366F1",
                          textColor: theme === "light" ? "#000" : "#fff",
                          trailColor: "#E5E7EB",
                          textSize: "16px",
                        })}
                        className="w-full h-full"
                      />
                      <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-black dark:text-white">
                        {`${String(Math.floor((timeLeft % 3600) / 60)).padStart(
                          2,
                          "0"
                        )}:${String(timeLeft % 60).padStart(2, "0")}`}
                      </p>
                    </div>

                    {/* Mobil timer */}
                    <div className="text-2xl font-semibold text-black dark:text-white sm:hidden">
                      {`${String(Math.floor((timeLeft % 3600) / 60)).padStart(
                        2,
                        "0"
                      )}:${String(timeLeft % 60).padStart(2, "0")}`}
                    </div>

                    {/* Quiz Number Buttons */}
                    <div className="flex-wrap flex gap-3">
                      {Array.isArray(questions) &&
                        questions?.map((item, index) => (
                          <div
                            key={index}
                            className={`w-8 h-8 flex items-center justify-center rounded-full border cursor-pointer text-sm font-medium
                              ${
                                currentQuizIndex === index
                                  ? "bg-green-500 text-white border-green-500"
                                  : answeredQuestions.includes(item.id)
                                  ? "bg-blue-500 text-white border-blue-500"
                                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300"
                              }`}
                            onClick={() => setCurrentQuizIndex(index)}
                          >
                            {index + 1}
                          </div>
                        ))}
                    </div>

                    {/* Finish Button */}
                    <button
                      className=" bg-red-500 text-white py-2 w-1/2 rounded-md text-lg font-semibold hover:bg-red-600"
                      onClick={handleLogoutClick}
                    >
                      Yakunlash
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <div
                    className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]   relative h-[125px] z-10`}
                  >
                    <div className={"space-y-[15px] z-20"}>
                      <p
                        className={
                          "text-[18px] dark:text-white text-black font-semibold"
                        }
                      >
                        {t("testStart")}
                      </p>

                      <div className="flex gap-x-[12px] items-center">
                        <Link href={"/"} className="text-[#5A6A85BF]">
                          {t("homePage")}
                        </Link>
                        <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
                        <p className="text-black dark:text-white">
                          {t("testStart")}
                        </p>
                      </div>
                    </div>

                    <div className={"absolute right-[40px] bottom-0 -z-10"}>
                      <Image
                        src={"/icons/user-profile-bg.svg"}
                        alt={"user-profile-bg"}
                        width={168}
                        height={165}
                        className="md:blur-0 blur-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-x-5 items-center">
                    {/* Error Message Box */}
                    <div className="text-white bg-[#FFAE1F] flex gap-x-2 sm:gap-x-3 p-4 rounded-lg w-full sm:w-auto">
                      <Image
                        src={"/icons/Error.svg"}
                        alt={"error"}
                        width={24}
                        height={24}
                      />
                      <p>
                        {i18n === "uz"
                          ? get(data, "data.message", "")
                          : `${t("alreadyPassedTest")}`}
                      </p>
                    </div>

                    {/* Results Button */}
                    <Link href={"/results"} className="w-full sm:w-auto">
                      <button className="w-full sm:w-auto py-4 px-6 bg-[#12DEB9] hover:bg-[#10C7A6] transition-all duration-300 rounded-lg text-white flex items-center justify-center">
                        {t("knowAboutResult")}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isModalOpen && (
            <>
              {/* Overlay Background */}
              <div
                className={`fixed inset-0 bg-black bg-opacity-90 z-50 transition-opacity duration-300 ${
                  isExiting ? "opacity-0" : "opacity-40"
                }`}
              ></div>

              {/* Modal Container */}
              <div
                className={`fixed inset-0 flex items-center justify-center z-50 mx-[10px] md:mx-0 transition-all duration-300 ${
                  isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
                }`}
              >
                {/* Modal Box */}
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:w-[400px] md:w-[500px]">
                  <h2 className="text-xl font-semibold mb-1">
                    {t("finishTest")}
                  </h2>
                  <p className="text-lg font-medium text-[#7C8FAC] mb-4">
                    {t("areYouSure")}
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end gap-3">
                    <button
                      onClick={onSubmit}
                      className="bg-green-500 text-white py-2 px-4 rounded w-full sm:w-auto"
                    >
                      {t("yes")}
                    </button>
                    <button
                      onClick={closeModal}
                      className="bg-gray-300 text-black py-2 px-4 rounded w-full sm:w-auto"
                    >
                      {t("no")}
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
