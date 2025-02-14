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
  const { t } = useTranslation();
  const router = useRouter();
  const { phone } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: newPassword } = usePostQuery({
    listKeyId: KEYS.newPassword,
  });

  const onSubmit = ({ new_password }) => {
    let formData = new FormData();
    formData.append("phone", `${String(998) + String(phone)}`);
    formData.append("new_password", new_password);
    newPassword(
      {
        url: URLS.newPassword,
        attributes: formData,
      },
      {
        onSuccess: (data) => {
          console.log(data);
          toast.success("Logged in successfully");
          router.push(`/`);
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
      className="min-h-screen bg-center bg-cover px-4 sm:px-6 flex flex-col"
      style={{ backgroundImage: `url(/images/main-bg.jpg)` }}
    >
      <Header />
      <div className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-white mx-auto rounded-lg p-6 sm:p-8 shadow-md">
          <p className="text-xl sm:text-2xl font-medium text-center mb-6">
            {t("resetPassword")}
          </p>

          <div className="w-full mt-4">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5 border p-4 sm:p-6 rounded-md"
            >
              <div>
                <p className="mb-2 text-sm sm:text-base text-[#2A3547] font-semibold">
                  {t("phone number")}
                </p>

                <div className="border border-[#EAEFF4] flex gap-x-2 items-center rounded-md px-3 py-2">
                  <Image
                    src="/icons/uzb-flag.svg"
                    alt="flag"
                    width={24}
                    height={24}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <div className="w-[1px] h-8 bg-[#EAEFF4]"></div>
                  <span className="text-gray-700 text-sm">+998</span>
                  <input
                    type="tel"
                    maxLength="9"
                    value={phone}
                    disabled
                    className="w-full bg-white text-sm sm:text-base text-black py-2 pl-2"
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm sm:text-base text-[#2A3547] font-semibold">
                  {t("newPassword")}
                </p>
                <input
                  type="password"
                  {...register("new_password", { required: true })}
                  className="border border-[#EAEFF4] bg-white rounded-md text-sm sm:text-base text-black w-full px-3 py-2 sm:py-3"
                />
              </div>

              <button className="bg-[#5D87FF] hover:bg-[#4570EA] text-white py-2 sm:py-3 w-full rounded-md transition-all duration-300">
                {t("finish")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
