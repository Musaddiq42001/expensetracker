import React, { useState } from "react";

import classes from "./Dashboard.module.css";
import Card from "../Card/Card";
import Chart from "../Chart/Chart";
import { useData } from "../../context/DataContext";
import BalanceModal from "../Modal/BalanceModal";
import ExpenseModal from "../Modal/ExpenseModal";

/** 
const Data = [
  { name: "Entertainment", value: 60 },
  { name: "Food", value: 30 },
  { name: "Travel", value: 10 },
];
*/

const Dashboard = () => {
  const { walletBalance, totalExpense, expenseType } = useData();

  const [balanceModalIsOpen, setBalanceIsOpen] = useState(false);
  const [expenseModalIsOpen, setExpenseIsOpen] = useState(false);

  const openBalanceModal = () => {
    setBalanceIsOpen(true);
  };

  function closeBalanceModal() {
    setBalanceIsOpen(false);
  }

  const opeExpenseModal = () => {
    setExpenseIsOpen(true);
  };

  function closeExpenseModal() {
    setExpenseIsOpen(false);
  }

  return (
    <>
      <h1 className={classes.heading}>Expense Tracker</h1>
      <div className={classes.outer}>
        <Card
          type="wallet"
          amount={walletBalance}
          openModal={openBalanceModal}
        />
        <Card
          type="expense"
          amount={totalExpense}
          openModal={opeExpenseModal}
        />
        {totalExpense > 0 && <Chart data={expenseType} />}
      </div>

      <BalanceModal
        modalIsOpen={balanceModalIsOpen}
        closeModal={closeBalanceModal}
      />
      <ExpenseModal
        modalIsOpen={expenseModalIsOpen}
        closeModal={closeExpenseModal}
      />
    </>
  );
};

export default Dashboard;
