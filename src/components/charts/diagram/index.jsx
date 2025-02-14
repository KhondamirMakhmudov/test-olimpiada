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
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <ReferenceLine x="Page C" stroke="red" label="Max PV PAGE" />
        <ReferenceLine y={9800} label="Max" stroke="red" />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DiagramChart;
