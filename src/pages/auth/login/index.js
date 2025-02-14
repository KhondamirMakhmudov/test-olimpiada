import Brand from "@/components/brand";
import InternationalPhoneInput from "@/components/phone-number";
import Link from "next/link";
import { useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { useForm } from "react-hook-form";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";
import { get } from "lodash";
import { signIn } from "next-auth/react";

const Login = () => {
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [phone, setPhone] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginRequest, isLoading } = usePostQuery({
    listKeyId: KEYS.login,
  });

  const onSubmit = async ({ phone, password }) => {
    const formattedPhone = `998${phone.replace(/[^0-9]/g, "")}`;
    const result = await signIn("credentials", {
      phone: formattedPhone,
      password,
      redirect: false, // Prevent automatic redirect
    });

    if (result?.error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Logged in successfully");
      router.push("/");
    }
  };

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div
        className={
          "flex items-center justify-center h-screen bg-center bg-cover"
        }
        style={{ backgroundImage: `url(/images/bg-auth.png)` }}
      >
        <div
          className={
            "w-[436px] h-[506px] bg-white mx-auto  rounded-[8px] p-[30px]"
          }
        >
          <div className="flex justify-center items-center mb-[30px]">
            <Brand />
          </div>

          <div className="w-full">
            <div className="flex">
              <button
                onClick={() => {
                  handleTab("login");
                  router.push("");
                }}
                className={`py-[8px] px-[16px]  w-1/3  ${
                  tab === "login"
                    ? "bg-[#5D87FF] text-white"
                    : "text-[#5A6A85] bg-transparent"
                } rounded-[4px] text-lg active:scale-90 scale-100 transition-all duration-300`}
              >
                Kirish
              </button>

              <button
                onClick={() => {
                  handleTab("register");
                  router.push("/register");
                }}
                className={`py-[8px] px-[16px]  w-2/3  ${
                  tab === "register"
                    ? "bg-[#5D87FF] text-white"
                    : "text-[#5A6A85] bg-transparent"
                } rounded-[4px] active:scale-90 scale-100 transition-all duration-300`}
              >
                Ro&apos;yhatdan o&apos;tish
              </button>
            </div>

            <div className="w-full mt-[30px]">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-[20px] border p-[16px] rounded-[4px]"
              >
                <div className="bg-white">
                  <p className="mb-[8px] text-sm text-[#2A3547] font-semibold">
                    Telefon raqam
                  </p>

                  <div className="border border-[#EAEFF4] flex gap-x-[10px] items-center rounded-[8px] px-[8px] ">
                    <Image
                      src={"/icons/uzb-flag.svg"}
                      alt="flag"
                      width={30}
                      height={30}
                    />

                    <div className="w-[1px] h-[40px] bg-[#EAEFF4]  "></div>
                    <span className="text-gray-700 text-sm">+998</span>
                    <input
                      type="tel"
                      maxLength="9"
                      {...register("phone", { required: true })}
                      className="  w-full text-sm bg-white text-black py-[9px] pl-[5px]"
                      placeholder="331234567"
                    />
                  </div>
                  {/* <PhoneInput
                    defaultCountry="uz"
                    value={phone}
                    {...register("phone", { required: true })}
                    onChange={(phone) => setPhone(phone)}
                  /> */}
                </div>

                <div className="bg-white">
                  <p className="mb-[8px] text-sm text-[#2A3547] font-semibold">
                    Parol
                  </p>

                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="border border-[#EAEFF4] bg-white rounded-[8px] text-black  w-full px-[8px] py-[8px]"
                    placeholder="Kiriting"
                  />
                </div>

                <div className="mt-[20px] flex justify-between">
                  <label className="custom-checkbox flex gap-x-[10px] items-center">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />{" "}
                    <span className="checkmark"></span>
                    <p className="text-sm text-dark">Eslab qolsin</p>
                  </label>

                  <Link
                    href={"/auth/forget-password"}
                    className="text-[#5D87FF] font-medium underline-0 hover:underline"
                  >
                    Parolni unitdingizmi ?
                  </Link>
                </div>

                <button className="bg-[#5D87FF] text-white py-[8px] px-[16px] w-full rounded-[4px]">
                  Kirish
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
