import Brand from "@/components/brand";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import usePostQuery from "@/hooks/api/usePostQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Header from "@/components/header";
const Index = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: forgetPassword } = usePostQuery({
    listKeyId: KEYS.forgetPassword,
  });

  const onSubmit = ({ phone }) => {
    let formData = new FormData();
    formData.append("phone", `${String(998) + String(phone)}`);
    forgetPassword(
      {
        url: URLS.forgetPassword,
        attributes: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Logged in successfully");
          router.push(`/auth/forget-password/verify-sms/${phone}`);
        },
        onError: (error) => {
          console.log("Full error response:");

          toast.error(error.response?.data.error);
        },
      }
    );
  };
  return (
    <div
      className="min-h-screen bg-center bg-cover   flex flex-col"
      style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
    >
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white mx-auto rounded-lg p-6 sm:p-8 shadow-md">
          <p className="text-xl sm:text-2xl font-medium text-center mb-4 sm:mb-6">
            {t("resetPassword")}
          </p>

          <div className="w-full mt-4 sm:mt-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 sm:space-y-5 border p-4 sm:p-6 rounded-md"
            >
              <div className="bg-white">
                <p className="mb-2 text-sm sm:text-base text-[#2A3547] font-semibold">
                  {t("phone number")}
                </p>

                <div className="border border-[#EAEFF4] flex gap-x-3 sm:gap-x-4 items-center rounded-md px-3 sm:px-4 py-2">
                  <Image
                    src={"/icons/uzb-flag.svg"}
                    alt="flag"
                    width={28}
                    height={28}
                    className="w-7 h-7 sm:w-8 sm:h-8"
                  />

                  <div className="w-[1px] h-10 bg-[#EAEFF4]" />

                  <span className="text-gray-700 text-sm sm:text-base">
                    +998
                  </span>

                  <input
                    type="tel"
                    maxLength="9"
                    {...register("phone", { required: true })}
                    className="w-full bg-white text-sm sm:text-base text-black py-2 sm:py-3 pl-2"
                  />
                </div>
              </div>

              <button className="bg-[#5D87FF] hover:bg-[#4570EA] text-white py-2 sm:py-3 w-full rounded-md transition-all duration-300">
                {t("submit")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
