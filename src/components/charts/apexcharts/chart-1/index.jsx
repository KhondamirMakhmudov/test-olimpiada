import React from "react";
import dynamic from "next/dynamic";
import moment from "moment";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ReactApexChart = ({ dataSet = [[], [], []] }) => {
  const options = {
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [20, 100, 100, 100],
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#8e8da4",
        },
        offsetX: 0,
        formatter: (val) => (val / 1000000).toFixed(2),
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      tickAmount: 8,
      min: new Date("01/01/2014").getTime(),
      max: new Date("01/20/2014").getTime(),
      labels: {
        rotate: -15,
        rotateAlways: true,
        formatter: (val, timestamp) =>
          moment(new Date(timestamp)).format("DD MMM YYYY"),
      },
    },
    title: {
      text: "Irregular Data in Time Series",
      align: "left",
      offsetX: 14,
    },
    tooltip: {
      shared: true,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetX: -10,
    },
  };

  const series = [
    { name: "PRODUCT A", data: dataSet[0] || [] },
    { name: "PRODUCT B", data: dataSet[1] || [] },
    { name: "PRODUCT C", data: dataSet[2] || [] },
  ];

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default ReactApexChart;
