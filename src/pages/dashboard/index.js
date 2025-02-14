import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { get } from "lodash";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Dashboard from "@/components/dashboard";
import PieChartComponent from "@/components/charts/pie-chart";
import DiagramChart from "@/components/charts/diagram";
import { useSearchParams } from "next/navigation";
import { PieChart } from "recharts";
export default function DashboardPage() {
  const { data: session } = useSession();
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const phone = searchParams.get("phone");

  console.log(phone);
  const [isExiting, setIsExiting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userData, setUserData] = useState(null);

  const [showModal, setShowModal] = useState(!!phone);

  const {
    data: studentProfile,
    isLoading,
    isFetching,
  } = useGetQuery({
    key: KEYS.studentProfile,
    url: URLS.studentProfile,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    enabled: !!session?.accessToken, // Only fetch if accessToken is available
  });

  // Copy login/password to clipboard
  const handleCopy = () => {
    const textToCopy = `Login: ${session.login}\nPassword: ${session.password}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((err) => console.error("Failed to copy text:", err));
  };

  // Close the modal
  const closeModal = () => {
    setIsExiting(true);

    setTimeout(() => {
      setIsExiting(false);
      setShowModal(false); // Close the modal
    }, 300);
  };

  return (
    <Dashboard>
      {/* Modal for showing login/password */}
      {showModal && phone && (
        <div>
          <div
            className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
              !isExiting ? "opacity-90" : "opacity-40"
            }`}
          ></div>
          <div
            className={`fixed top-7 w-full left-1/2 transform -translate-x-1/2 flex items-center justify-center z-50 transition-all duration-300 ${
              isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full sm:w-3/4 md:w-2/3 lg:w-1/3 max-w-[90%]">
              <div className="flex items-center gap-x-[5px]">
                <h2 className="text-lg sm:text-xl font-semibold mb-1 text-[#13DEB9]">
                  {t("successRegister")}
                </h2>
                <Image
                  src={"/icons/success.svg"}
                  alt="success"
                  width={24}
                  height={24}
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              </div>
              <h2 className="lg:text-lg md:text-base text-sm font-semibold mb-1">
                {t("userLoginandPassword")}
              </h2>
              <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-2">
                {t("yourLogin")}: {session?.login}
              </p>
              <p className="md:text-base lg:text-lg text-sm  font-medium text-[#7C8FAC] mb-4">
                {t("yourPassword")}: {session?.password}
              </p>
              <p className="text-xs sm:text-sm font-medium text-[#7C8FAC]">
                {t("WantchangePassword")}
              </p>
              <div className="flex flex-col sm:flex-row justify-end gap-y-2 sm:gap-y-0 gap-x-2 mt-4">
                <button
                  onClick={handleCopy}
                  className="bg-green-500 text-white py-2 px-4 rounded w-full sm:w-auto"
                >
                  {copied ? `${t("copied")}` : `${t("copy")}`}
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black py-2 px-4 rounded w-full sm:w-auto"
                >
                  {t("got it")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rest of the dashboard content */}
      <div className="p-5 md:p-[30px] bg-[#EBF3FE] dark:bg-[#26334AFF] my-5 md:my-[30px] rounded-[12px] relative min-h-[200px] md:h-[200px]">
        <div className="space-y-5 md:space-y-[60px] ">
          <div className="flex gap-x-3 md:gap-x-[12px] items-center">
            <Image
              src="/images/user-welcome.png"
              alt="welcome"
              width={40}
              height={40}
              className="w-8 h-8 md:w-10 md:h-10"
            />
            <p className="text-[16px] md:text-[18px] dark:text-white text-black font-semibold">
              {t("welcome")}! {get(studentProfile, "data.full_name")}
            </p>
          </div>
          <a
            target="_blank"
            href="https://t.me/iq_mathbot"
            className="block md:mt-[60px]"
          >
            <button className="py-2 px-4 md:py-[8px] md:px-[16px] text-white bg-[#5D87FF] rounded-[4px] text-sm md:text-base">
              {t("telegram_bot")}
            </button>
          </a>
        </div>
        <div className="absolute right-0 bottom-0 w-[150px] md:w-[326px]">
          <Image
            src="/icons/welcome-bg.svg"
            alt="welcome"
            width={326}
            height={96}
            className="w-full h-auto"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-12 gap-5 md:gap-[30px]">
        {/* First Card */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6 shadow-lg bg-white dark:bg-[#26334AFF] rounded-[12px] p-5 md:p-[30px]">
          <div>
            <h1 className="text-base md:text-lg dark:text-white text-black font-semibold">
              {t("questions")}
            </h1>
          </div>
          <PieChartComponent />
        </div>

        {/* Second Card */}
        <div className="col-span-1 md:col-span-6 lg:col-span-6 xl:col-span-6 p-5 md:p-[30px] bg-white dark:bg-[#26334AFF] shadow-lg rounded-md">
          <DiagramChart />
        </div>
      </div>
    </Dashboard>
  );
}
