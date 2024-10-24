import React from "react";

import classes from "./Pagination.module.css";
import { useData } from "../../context/DataContext";

const Pagination = () => {
  const { itemsPerPage, currentPage, recentTransactions, dispatch } = useData();

  const noOfPages = [];

  const totalPageRequired = Math.ceil(recentTransactions.length / itemsPerPage);

  for (let i = 1; i <= totalPageRequired; i++) {
    noOfPages.push(i);
  }

  return (
    <div className={classes.outer}>
      <button
        onClick={() => dispatch({ type: "transactions/leftPage" })}
        className={classes.arrowBtn}
        disabled={currentPage <= 1}
      >
        &larr;
      </button>
      {noOfPages.map((page) => (
        <button
          key={page}
          onClick={() =>
            dispatch({ type: "transactions/changePage", payload: page })
          }
          className={
            page === currentPage ? classes.countBtnActive : classes.countBtn
          }
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => dispatch({ type: "transactions/rightPage" })}
        className={classes.arrowBtn}
        disabled={currentPage >= totalPageRequired}
      >
        &rarr;
      </button>
    </div>
  );
};

export default Pagination;
