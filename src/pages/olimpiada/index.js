import Dashboard from "@/components/dashboard";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import useGetQuery from "@/hooks/api/useGetQuery";
import Image from "next/image";
import { get } from "lodash";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import ContentLoader from "@/components/loader/content-loader";
const Index = () => {
  const { t, i18n } = useTranslation();

  const router = useRouter();
  const { data, isLoading, isFetching } = useGetQuery({
    key: KEYS.olimpiadaQuizList,
    url: URLS.olimpiadaQuizList,
  });

  if (isLoading || isFetching) {
    return (
      <Dashboard>
        <ContentLoader />
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px] -z-0  relative h-[125px] `}
      >
        <div className={"space-y-[15px]"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            {t("olympics")}
          </p>

          <div className="flex gap-x-[12px] items-center z-30">
            <Link href={"/"} className="text-[#5A6A85BF]">
              {t("homePage")}
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">{t("olympics")}</p>
          </div>
        </div>

        <div className={"absolute md:right-[40px] right-3 -z-10 bottom-0"}>
          <Image
            src={"/icons/user-profile-bg.svg"}
            alt={"user-profile-bg"}
            width={168}
            height={165}
            className="md:blur-0 blur-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 my-6 md:gap-4 md:my-4 sm:gap-2 sm:my-2">
        <div className="col-span-12 bg-white dark:bg-[#26334AFF] self-start border border-[#EAEFF4] dark:border-[#2A3447FF] rounded-md ">
          <div className="p-6 md:p-4 sm:p-3">
            <h3 className="capitalize text-lg font-semibold text-black dark:text-white">
              {t("reminder")}
            </h3>
          </div>
          <div className="w-full h-[1px] bg-[#EAEFF4] dark:bg-[#2A3447FF]"></div>
          <ul className="space-y-4 p-6 md:p-4 sm:p-3">
            {[
              "first_reminder",
              "second_reminder",
              "fourth_reminder",
              "fifth_reminder",
              "sixth_reminder",
            ].map((reminder, index) => (
              <li
                key={index}
                className="flex items-start gap-x-4 md:gap-x-3 sm:gap-x-2"
              >
                <Image
                  src={"/icons/remind.svg"}
                  alt={"remind"}
                  width={24}
                  height={24}
                  className="w-6 h-6 sm:w-5 sm:h-5"
                />
                {reminder === "fifth_reminder" ? (
                  <div>
                    {i18n.language === "uz" ? (
                      <div className="text-sm text-[#5A6A85] dark:text-white ">
                        Ikkinchi bosqich haqida va boshqa qiziqtirgan
                        savollaringizga bu havola orqali{" "}
                        <Link
                          href={"https://iq-math.uz/about-olympics"}
                          className="hover:underline text-[#5D87FF]"
                        >
                          'https://iq-math.uz/about-olympics'
                        </Link>{" "}
                        javob olishingiz mumkin.
                      </div>
                    ) : (
                      <div className="text-sm text-[#5A6A85] dark:text-white ">
                        Информацию о втором этапе и ответы на другие
                        интересующие вас вопросы можно найти по этой ссылке:
                        <Link
                          href={"https://iq-math.uz/about-olympics"}
                          className="hover:underline text-[#5D87FF]"
                        >
                          'https://iq-math.uz/about-olympics'
                        </Link>{" "}
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-[#5A6A85] dark:text-white">
                    {t(reminder)}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {get(data, "data", []).map((item) => (
            <div
              key={get(item, "id")}
              className="px-6 mb-6 md:px-4 md:mb-4 sm:px-2 sm:mb-2 rounded-lg"
            >
              <div>
                <div className=" flex flex-wrap justify-between md:grid grid-cols-3 lg:place-items-center place-items-start gap-4 md:gap-3 sm:gap-2 my-4 md:my-3 sm:my-2">
                  {[
                    {
                      label: "leadTime",
                      color: "#539BFF",
                      value: `${get(item, "duration_in_minutes", "")} ${t(
                        "minut"
                      )}`,
                    },
                    {
                      label: "startDate",
                      color: "#12DEB9",
                      value: dayjs(get(item, "start_date", "")).format(
                        "DD.MM.YYYY"
                      ),
                      time: dayjs(get(item, "start_date", "")).format("HH:mm"),
                    },
                    {
                      label: "endDate",
                      color: "#EB0000",
                      value: dayjs(get(item, "end_date", "")).format(
                        "DD.MM.YYYY"
                      ),
                      time: dayjs(get(item, "end_date", "")).format("HH:mm"),
                    },
                  ].map(({ label, color, value, time }) => (
                    <div
                      key={label}
                      className="col-span-1 flex lg:items-baseline  gap-x-3 md:gap-x-2 sm:gap-x-1"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                      <div>
                        <h3 className="text-[#868EAB] text-sm sm:text-xs">
                          {t(label)}
                        </h3>
                        <div className="flex gap-x-[5px] items-center">
                          <p className="font-semibold text-lg dark:text-white text-black text-sm md:text-base sm:text-sm">
                            {value}
                          </p>
                          <p className="font-semibold !text-sm  dark:text-white !text-gray-400 text-sm md:text-base sm:text-sm">
                            {time}
                          </p>{" "}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() =>
                    router.push(`olimpiada/start-quiz/${get(item, "id", [])}`)
                  }
                  className="py-2 w-full px-4 bg-[#5D87FF] rounded text-white text-sm md:text-base sm:text-sm hover:bg-[#4570EA] transition-all duration-300"
                >
                  {t("startTheTest")}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-10 self-start grid grid-cols-10"></div>
      </div>
    </Dashboard>
  );
};

export default Index;
