import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "next-themes"; // Import useTheme

const data = [
  { name: "A", uv: 40, pv: 24, amt: 24 },
  { name: "B", uv: 30, pv: 13, amt: 22 },
  { name: "C", uv: 20, pv: 98, amt: 22 },
  { name: "D", uv: 27, pv: 39, amt: 20 },
  { name: "E", uv: 18, pv: 48, amt: 21 },
  { name: "F", uv: 23, pv: 38, amt: 25 },
  { name: "G", uv: 34, pv: 43, amt: 21 },
];

const DiagramChart = () => {
  const { theme } = useTheme(); // Get the current theme

  // Define colors based on the theme
  const gridStroke = theme === "dark" ? "#4A5568" : "#E2E8F0"; // Dark: gray.600, Light: gray.200
  const axisStroke = theme === "dark" ? "#CBD5E0" : "#718096"; // Dark: gray.400, Light: gray.600
  const tooltipBg = theme === "dark" ? "#2D3748" : "#FFFFFF"; // Dark: gray.800, Light: white
  const tooltipText = theme === "dark" ? "#FFFFFF" : "#000000"; // Dark: white, Light: black
  const lineColors = {
    pv: theme === "dark" ? "#805AD5" : "#8884d8", // Dark: purple.500, Light: default
    uv: theme === "dark" ? "#38B2AC" : "#82ca9d", // Dark: teal.500, Light: default
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 50,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
        <XAxis dataKey="name" stroke={axisStroke} />
        <YAxis stroke={axisStroke} />
        <Tooltip
          contentStyle={{
            backgroundColor: tooltipBg,
            border: "none",
            borderRadius: "8px",
            color: tooltipText,
          }}
        />
        <Legend />
        <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
        <ReferenceLine y={9800} label="Max" stroke="red" />
        <Line
          type="monotone"
          dataKey="pv"
          stroke={lineColors.pv}
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke={lineColors.uv}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DiagramChart;
