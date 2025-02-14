"use client";
import useGetQuery from "@/hooks/api/useGetQuery";
import { KEYS } from "@/constants/key";
import { URLS } from "@/constants/url";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { get, isNil } from "lodash";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { useSession } from "next-auth/react";
import { useTranslation } from "react-i18next";

const PieChartComponent = () => {
  const { t, i18n } = useTranslation();
  const { data: session } = useSession();
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

  const [chartData, setChartData] = useState({
    series: [0, 0], // Example values
    options: {
      chart: {
        type: "donut",
      },
      labels:
        i18n.language === "uz"
          ? ["To'g'ri javoblar", "Noto'g'ri javoblar"]
          : ["Правильные ответы", "Неправильные ответы"],
      colors: ["#548CFF", "#63C5DA"],
      stroke: {
        width: 5, // Creates gaps between slices
        colors: ["#ffffff"], // White gap effect
      },
      plotOptions: {
        pie: {
          donut: {
            size: "85%", // Controls ring thickness
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
        formatter: (val) => `${val.toFixed(1)}%`, // Shows percentage
      },
      legend: {
        show: true,
        position: "top",
        fontSize: "14px",
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val} ta `, // Tooltip format
        },
      },
    },
  });

  const chartDataDefault = {
    series: [10, 10, 10], // Static values: 5.1, 3.1, 2.1 ball questions
    options: {
      chart: {
        type: "donut",
      },
      labels: [
        "5.1 ballik savollar",
        "3.1 ballik savollar",
        "2.1 ballik savollar",
      ],
      colors: ["#548CFF", "#63C5DA", "#00D4FF"],
      stroke: {
        width: 3, // Creates gaps between slices
        colors: ["#ffffff"], // White gap effect
      },
      plotOptions: {
        pie: {
          donut: {
            size: "85%", // Controls ring thickness
          },
        },
      },
      dataLabels: {
        enabled: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
        },
        formatter: (val) => `${val.toFixed(1)}%`, // Shows percentage
      },
      legend: {
        show: true,
        position: "top",
        fontSize: "14px",
      },
      tooltip: {
        enabled: true,
        y: {
          formatter: (val) => `${val} ta `, // Tooltip format
        },
      },
    },
  };

  useEffect(() => {
    if (quizResult) {
      const correctCount = get(quizResult, "data.correct_questions", []).length;
      const incorrectCount = get(
        quizResult,
        "data.incorrect_questions",
        []
      ).length;

      setChartData({
        series: [correctCount, incorrectCount], // Wrap numbers in an array
        options: {
          chart: { type: "donut" },
          labels:
            i18n.language === "uz"
              ? ["To'g'ri javoblar", "Noto'g'ri javoblar"]
              : ["Правильные ответы", "Неправильные ответы"],
          colors: ["#63C5DA", "#00D4FF"],
          stroke: {
            width: 5, // Creates gaps between slices
            colors: ["#ffffff"], // White gap effect
          },
          plotOptions: {
            pie: {
              donut: {
                size: "85%", // Controls ring thickness
              },
            },
          },
          dataLabels: {
            enabled: false,
            style: {
              fontSize: "14px",
              fontWeight: "bold",
            },
            formatter: (val) => `${val.toFixed(1)}%`, // Shows percentage
          },
          legend: {
            show: true,
            position: "top",
            fontSize: "15px",
            formatter: function (seriesName, opts) {
              const value = opts.w.globals.series[opts.seriesIndex]; // Har bir qism uchun qiymatni olish
              return `${seriesName}: ${value} `; // Legend'da ko'rsatish
            },
          },
          tooltip: {
            enabled: true,
            y: {
              formatter: (val) => `${val} ta `, // Tooltip format
            },
          },
        },
      });
    }
  }, [quizResult]);

  return (
    <div>
      {isNil(get(quizResult, "data.score")) ? (
        <div>
          <div className="w-full max-w-md mx-auto !text-black dark:text-white">
            <Chart
              options={chartDataDefault.options}
              series={chartDataDefault.series}
              type="donut"
              height={250}
            />
          </div>
          <div className="flex items-end gap-x-3 md:gap-x-[12px]">
            <div className="bg-[#ECF2FF] p-2 md:p-[10px] rounded-[8px] inline-block">
              <Image src="/icons/grid.svg" alt="grid" width={24} height={24} />
            </div>
            <div>
              <h4 className="text-lg md:text-[21px] dark:text-white text-black font-semibold">
                103 {t("score")}
              </h4>
              <p className="text-sm text-[#7C8FAC]">{t("totalScores")}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full max-w-md mx-auto">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="donut"
              height={350}
            />
          </div>
          <div className="flex items-end gap-x-3 md:gap-x-[12px]">
            <div className="bg-[#ECF2FF] p-2 md:p-[10px] rounded-[8px] inline-block">
              <Image src="/icons/grid.svg" alt="grid" width={24} height={24} />
            </div>
            <div>
              <h4 className="text-lg md:text-[21px] dark:text-white text-black font-semibold">
                {parseFloat(get(quizResult, "data.score")).toFixed(2)}{" "}
                {t("score")}
              </h4>
              <p className="text-sm text-[#7C8FAC]">{t("SumScore")}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartComponent;
