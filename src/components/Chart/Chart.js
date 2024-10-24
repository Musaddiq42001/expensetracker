import React from "react";
import { Cell, Pie, PieChart } from "recharts";

import classes from "./Chart.module.css";

const COLORS = ["#ff9304", "#a000ff", "#fde006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Chart = ({ data }) => {
  return (
    <div>
      <PieChart width={400} height={220}>
        <Pie
          data={data}
          cx={200}
          cy={100}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className={classes.details}>
        {data.map((item, index) => {
          return (
            <div className={classes.outer} key={index}>
              <div
                className={classes.box}
                style={{ backgroundColor: COLORS[index] }}
              ></div>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
