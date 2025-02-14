import MainIcon from "../icons/main";
import OlimpiadaIcon from "../icons/olimpiada";
import SidebarTitle from "../title/sidebar-title";
import ResultsIcon from "../icons/results";
import { useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import { signOut } from "next-auth/react";
const DashboardNav = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const [tab, setTab] = useState("main");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleTab = (tab) => {
    setTab(tab);
  };

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "https://iq-math.uz", // Redirect to iq-math.uz after sign out
    });

    localStorage.clear();
    sessionStorage.clear();
  };

  // Function to handle showing the modal
  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsExiting(false);
    }, 300); // Delay for the animation to complete
  };

  return (
    <div className="p-[30px]">
      <div>
        <SidebarTitle>{t("dashboard")}</SidebarTitle>
        <div className="h-[calc(100vh-200px)]  flex flex-col  justify-between">
          <ul className="mt-[12px]">
            <li
              onClick={() => {
                handleTab("main");
                router.push("/dashboard");
              }}
              className="cursor-pointer"
            >
              <div
                className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
                  router.pathname === "/dashboard"
                    ? "bg-[#5D87FF] text-white"
                    : "text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48]"
                }`}
              >
                <MainIcon
                  color={router.pathname === "/dashboard" ? "#fff" : "#5A6A85"}
                />
                <p className="text-[14px]">{t("main")}</p>
              </div>
            </li>

            <li
              onClick={() => {
                handleTab("olimpiada");
                router.push("/olimpiada");
              }}
              className="cursor-pointer"
            >
              <div
                className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
                  router.pathname === "/olimpiada"
                    ? "bg-[#5D87FF] text-white"
                    : "text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48]"
                }`}
              >
                <OlimpiadaIcon
                  color={router.pathname === "/olimpiada" ? "#fff" : "#5A6A85"}
                />
                <p className="text-[14px]">{t("olympics")}</p>
              </div>
            </li>

            <li
              onClick={() => {
                handleTab("results");
                router.push("/results");
              }}
              className="cursor-pointer"
            >
              <div
                className={`flex gap-x-[10px] items-center py-[10px] px-[12px] rounded-[4px] active:scale-90 scale-100 transition-all duration-300 ${
                  router.pathname === "/results"
                    ? "bg-[#5D87FF] text-white"
                    : "text-[#5A6A85] dark:bg-[#202936] hover:bg-[#ECF2FF] dark:hover:bg-[#252B48]"
                }`}
              >
                <ResultsIcon
                  color={router.pathname === "/results" ? "#fff" : "#5A6A85"}
                />
                <p className="text-[14px]">{t("results")}</p>
              </div>
            </li>
            <li></li>
          </ul>
          <button
            onClick={handleLogout}
            className=" text-[#FA896B] py-[8px] w-full] bg-[#FA896B] text-white rounded-md hover:bg-[#FA714B]  transform duration-200"
          >
            {t("logout")}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div
            className={`fixed inset-0 bg-black bg-opacity-40 z-50 transition-opacity duration-300 ${
              isExiting ? "opacity-0" : "opacity-40"
            }`}
          ></div>
          <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ${
              isExiting ? "scale-95 opacity-0" : "scale-100 opacity-100"
            }`}
          >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
              <h2 className="text-xl font-semibold mb-1">
                Web sahifadan chiqish
              </h2>
              <p className="text-lg font-medium text-[#7C8FAC] mb-4">
                Haqiqatan ham sahifani tark etmoqchimisiz?
              </p>
              <div className="flex justify-end gap-x-[10px]">
                <button
                  onClick={handleLogout}
                  className="bg-green-500  text-white py-2 px-4 rounded"
                >
                  Ha
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black py-2 px-4 rounded"
                >
                  Yo&apos;q
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardNav;
