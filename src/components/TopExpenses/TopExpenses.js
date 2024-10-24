import React from "react";
import classes from "./TopExpenses.module.css";
import ExpensesBarChart from "../ExpensesBarChart/ExpensesBarChart";
import { useData } from "../../context/DataContext";

/** 
const Data = [
  { name: "Entertainment", value: 60 },
  { name: "Food", value: 30 },
  { name: "Travel", value: 10 },
];
*/

const TopExpenses = () => {
  const { expenseType } = useData();

  return (
    <div className={classes.summaryItem2}>
      <h1 className={classes.heading}>Top Expenses</h1>
      <div className={classes.outer}>
        <ExpensesBarChart data={expenseType} />
      </div>
    </div>
  );
};

export default TopExpenses;
