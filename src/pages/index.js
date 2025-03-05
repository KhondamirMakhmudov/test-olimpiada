import Brand from "@/components/brand";
import Link from "next/link";
import { useState } from "react";
import "react-international-phone/style.css";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import LanguageDropdown from "@/components/language";
import { useTranslation } from "react-i18next";
import Modal from "@/components/modal";
import Header from "@/components/header";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import { get } from "lodash";

const Home = () => {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      router.push("/dashboard");
    }
  };

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "https://iq.iq-math.uz", // Redirect to iq-math.uz after sign out
    });

    localStorage.clear();
    sessionStorage.clear();
  };

  return (
    <div
      style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
      className="bg-center bg-cover bg-no-repeat min-h-screen flex flex-col"
    >
      <Header />
      <div className="flex flex-grow items-center justify-center p-4">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg bg-white mx-auto rounded-lg p-6 md:p-8 shadow-lg">
          {!session?.accessToken ? (
            <div className="w-full">
              {/* Tab Buttons */}
              <div className="flex">
                <button
                  onClick={() => {
                    handleTab("login");
                    router.push("/");
                  }}
                  className={`py-2 px-4 w-1/3 rounded-md text-lg transition-all duration-300 capitalize ${
                    tab === "login"
                      ? "bg-[#5D87FF] text-white"
                      : "text-[#5A6A85] hover:bg-[#ECF2FF]"
                  }`}
                >
                  {t("login")}
                </button>

                <button
                  onClick={() => {
                    handleTab("register");
                    router.push("/register");
                  }}
                  className={`py-2 px-4 w-2/3 rounded-md transition-all duration-300 ${
                    tab === "register"
                      ? "bg-[#5D87FF] text-white"
                      : "text-[#5A6A85] hover:bg-[#ECF2FF]"
                  }`}
                >
                  {t("sign in")}
                </button>
              </div>

              {/* Form Section */}
              <div className="w-full mt-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-5 border p-4 rounded-md"
                >
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                      {t("phone number")}
                    </label>

                    <div className="border border-[#EAEFF4] flex items-center rounded-md px-3 py-2">
                      <Image
                        src="/icons/uzb-flag.svg"
                        alt="flag"
                        width={30}
                        height={30}
                      />
                      <div className="w-px h-10 bg-[#EAEFF4] mx-2"></div>
                      <span className="text-gray-700 text-sm">+998</span>
                      <input
                        type="tel"
                        maxLength="9"
                        {...register("phone", { required: true })}
                        className="w-full bg-white text-sm text-black p-2 focus:outline-none"
                        placeholder="---------"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-semibold text-[#2A3547]">
                      {t("password")}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        {...register("password", { required: true })}
                        placeholder="********"
                        className="border border-[#EAEFF4] bg-white rounded-md text-black w-full px-3 py-2 focus:outline-none relative"
                      />
                      <div
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute top-3 right-3 bottom-0 cursor-pointer"
                      >
                        {showPassword ? (
                          <Image
                            src={"/icons/eye.svg"}
                            alt={"edit"}
                            width={18}
                            height={18}
                          />
                        ) : (
                          <Image
                            src={"/icons/eye-closed.svg"}
                            alt={"edit"}
                            width={18}
                            height={18}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between items-center mt-4">
                    <label className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4"
                      />
                      <span>{t("remember")}</span>
                    </label>

                    <Link
                      href="/auth/forget-password"
                      className="text-[#5D87FF] font-medium hover:underline transition duration-200"
                    >
                      {t("forget password")}
                    </Link>
                  </div>

                  <button className="w-full bg-[#5D87FF] hover:bg-[#4570EA] text-white py-2 rounded-md transition-all duration-300">
                    {t("login")}
                  </button>
                </form>
              </div>
              <Modal />
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-2xl font-medium mb-5">{t("welcome")}!</h1>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="bg-[#5D87FF] hover:bg-[#4570EA] py-3 w-full text-white rounded-md transition-all"
                >
                  {t("enter")}
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-[#FA896B] hover:bg-[#E77F63] py-3 w-full text-white rounded-md transition-all"
                >
                  {t("left")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
