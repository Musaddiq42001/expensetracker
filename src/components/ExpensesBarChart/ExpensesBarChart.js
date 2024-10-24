import React from "react";
import { BarChart, Bar, XAxis } from "recharts";

const ExpensesBarChart = ({ data }) => {
  return (
    <BarChart width={320} height={280} data={data}>
      <Bar dataKey="value" fill="#8784D2" />
      <XAxis dataKey="name" />
    </BarChart>
  );
};

export default ExpensesBarChart;
