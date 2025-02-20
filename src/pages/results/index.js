import Dashboard from "@/components/dashboard";
import Image from "next/image";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";

import { get, isEmpty, isNil } from "lodash";
import Link from "next/link";

import { useState, useEffect, useContext } from "react";
import GridIcon from "@/components/icons/grid";
import AnswerIcon from "@/components/icons/answer";
import { useTranslation } from "react-i18next";
import { useSession } from "next-auth/react";
import { UserProfileContext } from "@/context/responseProvider";
import { useTheme } from "next-themes";
const Index = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const { t } = useTranslation();
  const [tab, setTab] = useState("results");
  const { result } = useContext(UserProfileContext);

  const handleTab = (tab) => {
    setTab(tab);
  };
  const {
    data: quizResult,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.resultQuiz,
    url: URLS.resultQuiz,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken,
  });

  const scores2_1 = get(quizResult, "data.answer_more", []).filter(
    (item) => item.score === 2.1
  );
  const scores3_1 = get(quizResult, "data.answer_more", []).filter(
    (item) => item.score === 3.1
  );
  const scores5_1 = get(quizResult, "data.answer_more", []).filter(
    (item) => item.score === 5.1
  );

  return (
    <Dashboard>
      <div
        className={` p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF]  my-[30px] rounded-[12px]  -z-0 relative h-[125px] `}
      >
        <div className={"space-y-[15px] z-20"}>
          <p className={"text-[18px] dark:text-white text-black font-semibold"}>
            {t("resultsPage")}
          </p>

          <div className="flex gap-x-[12px] items-center">
            <Link href={"/"} className="text-[#5A6A85BF] dark:text-gray-300">
              {t("homePage")}
            </Link>
            <div className="bg-black w-[6px] h-[6px] rounded-full  dark:bg-white"></div>
            <p className="text-black dark:text-white">{t("results")}</p>
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

      <div className="shadow-lg p-[16px] rounded-md">
        <div className="flex gap-x-[10px]">
          <button
            onClick={() => handleTab("results")}
            className={`flex gap-x-[8px] items-center py-[8px] px-[16px] rounded-md transform duration-200 ${
              tab === "results"
                ? "bg-[#5D87FFFF] text-white"
                : "bg-white text-black "
            }`}
          >
            <GridIcon color={tab === "results" ? "white " : "black"} />

            <p className="text-sm">{t("testResults")}</p>
          </button>

          <button
            onClick={() => handleTab("my-answers")}
            className={`flex items-center gap-x-[8px] py-[8px] px-[16px] rounded-md transform duration-200 ${
              tab === "my-answers"
                ? "bg-[#5D87FFFF] text-white"
                : "bg-white text-black"
            }`}
          >
            <AnswerIcon color={tab === "my-answers" ? "white" : "black"} />

            <p className="text-sm">{t("myAnswers")}</p>
          </button>
        </div>
      </div>

      {tab === "results" && (
        <div className="grid grid-cols-12 gap-[30px]">
          <div className="py-[16px] shadow-lg my-[50px] col-span-12 md:col-span-6 lg:col-span-4 rounded-md">
            <div className="flex gap-x-[30px] items-center">
              <div className="w-[3px] h-[50px] bg-orange-400"></div>

              <div>
                <p className="text-sm text-[#5A6A85] dark:text-gray-300">
                  {t("totalScore")}
                </p>

                {isNil(get(quizResult, "data.score")) ? (
                  <div className="bg-[#539BFF] flex items-center gap-x-[4px] text-white py-1 px-2 rounded-md mt-[10px]">
                    <Image
                      src={"/icons/Error.svg"}
                      alt={"error"}
                      width={24}
                      height={24}
                    />
                    <p className="text-sm">{t("doNotTestYet")}</p>
                  </div>
                ) : (
                  <p className="font-medium text-lg text-[#2A3547] dark:text-white">
                    {parseFloat(get(quizResult, "data.score")).toFixed(2)}{" "}
                    {t("score")}
                  </p>
                )}
              </div>
            </div>

            <p className="px-[30px] text-sm mt-[30px] text-[#2A3547] dark:text-white">
              {t("resultsDesc")}
            </p>
          </div>
        </div>
      )}

      {tab === "my-answers" && (
        <div>
          <div className="grid grid-cols-12 gap-[30px] mt-[30px] ">
            {isEmpty(scores2_1) ? (
              ""
            ) : (
              <div className="lg:col-span-4 md:col-span-6 col-span-12 space-y-[10px]">
                <p className="text-lg font-medium text-gray-600">
                  {scores2_1[0]["score"]} ballik
                </p>
                {scores2_1.map((item, index) => (
                  <div
                    className={`border ${
                      get(item, "is_correct") === true
                        ? "border-[#13DEB9]"
                        : "border-[#FA896B]"
                    } flex justify-between px-[10px] py-[12px] rounded-[4px]`}
                    key={index}
                  >
                    <div className="flex gap-x-[10px]">
                      <p
                        className={` ${
                          get(item, "is_correct") === true
                            ? "text-[#13DEB9]"
                            : "text-[#FA896B]"
                        } `}
                      >
                        {get(item, "order")}.{" "}
                      </p>
                      {/* <p className="text-[#FA896B]">{get(item, "order")} - savol</p> */}
                    </div>

                    <div>
                      <Image
                        src={`/icons/${
                          get(item, "is_correct") === true ? "success" : "fail"
                        }.svg`}
                        alt="fail"
                        width={26}
                        height={26}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isEmpty(scores3_1) ? (
              ""
            ) : (
              <div className="lg:col-span-4 md:col-span-6 col-span-12 space-y-[10px]">
                <p className="text-lg font-medium text-gray-600">
                  {scores3_1[0]["score"]} ballik
                </p>
                {scores3_1.map((item, index) => (
                  <div
                    className={`border ${
                      get(item, "is_correct") === true
                        ? "border-[#13DEB9]"
                        : "border-[#FA896B]"
                    } flex justify-between px-[10px] py-[12px] rounded-[4px]`}
                    key={index}
                  >
                    <div className="flex gap-x-[10px]">
                      <p
                        className={` ${
                          get(item, "is_correct") === true
                            ? "text-[#13DEB9]"
                            : "text-[#FA896B]"
                        } `}
                      >
                        {get(item, "order")}.{" "}
                      </p>
                      {/* <p className="text-[#FA896B]">{get(item, "order")} - savol</p> */}
                    </div>

                    <div>
                      <Image
                        src={`/icons/${
                          get(item, "is_correct") === true ? "success" : "fail"
                        }.svg`}
                        alt="fail"
                        width={26}
                        height={26}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isEmpty(scores3_1) ? (
              ""
            ) : (
              <div className="lg:col-span-4 md:col-span-6 col-span-12 space-y-[10px]">
                <p className="text-lg font-medium text-gray-600">
                  {scores5_1[0]["score"]} ballik
                </p>
                {scores5_1.map((item, index) => (
                  <div
                    className={`border ${
                      get(item, "is_correct") === true
                        ? "border-[#13DEB9]"
                        : "border-[#FA896B]"
                    } flex justify-between px-[10px] py-[12px] rounded-[4px]`}
                    key={index}
                  >
                    <div className="flex gap-x-[10px]">
                      <p
                        className={` ${
                          get(item, "is_correct") === true
                            ? "text-[#13DEB9]"
                            : "text-[#FA896B]"
                        } `}
                      >
                        {get(item, "order")}.{" "}
                      </p>
                      {/* <p className="text-[#FA896B]">{get(item, "order")} - savol</p> */}
                    </div>

                    <div>
                      <Image
                        src={`/icons/${
                          get(item, "is_correct") === true ? "success" : "fail"
                        }.svg`}
                        alt="fail"
                        width={26}
                        height={26}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isEmpty(scores2_1) && isEmpty(scores3_1) && isEmpty(scores5_1) && (
              <div className="bg-[#539BFF] col-span-12 flex items-center gap-x-[4px] text-white py-1 px-2 rounded-md mt-[10px]">
                <Image
                  src={"/icons/Error.svg"}
                  alt={"error"}
                  width={24}
                  height={24}
                />
                <p className="text-sm">{t("doNotTestYet")}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </Dashboard>
  );
};

export default Index;
