import React from "react";
import classes from "./Transactions.module.css";
import TransactionItem from "../TransactionItem/TransactionItem";
import { useData } from "../../context/DataContext";
import Pagination from "../Pagination/Pagination";

/** 
const Data = [
  {
    item: "Samosa",
    date: new Date(),
    amount: 150,
    type: "food",
  },
  {
    item: "Movie",
    date: new Date(),
    amount: 300,
    type: "entertainment",
  },
  {
    item: "Auto",
    date: new Date(),
    amount: 50,
    type: "travel",
  },
];
*/

const Transactions = () => {
  const { recentTransactions, itemsPerPage, currentPage } = useData();

  console.log(recentTransactions);

  const lastIndex = currentPage * itemsPerPage;

  const firstIndex = lastIndex - itemsPerPage;

  const recentTransactionsPerScreen = recentTransactions.slice(
    firstIndex,
    lastIndex
  );

  return (
    <div className={classes.summaryItem1}>
      <h1 className={classes.heading}>Recent Transactions</h1>
      <div className={classes.outer}>
        <div>
          {recentTransactionsPerScreen.map((item) => (
            <TransactionItem
              key={item.id}
              id={item.id}
              name={item.item}
              date={new Date(item.date)}
              amount={item.amount}
              type={item.type}
            />
          ))}
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Transactions;
