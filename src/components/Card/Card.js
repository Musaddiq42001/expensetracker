import React from "react";
import classes from "./Card.module.css";

const Card = ({ type, amount, openModal }) => {
  return (
    <div className={classes.outer}>
      <h2 className={classes.text}>
        {type === "expense" ? (
          <span>Expenses : </span>
        ) : (
          <span>Wallet Balance : </span>
        )}
        <span
          className={type === "expense" ? classes.expAmount : classes.balAmount}
        >
          &#8377;{amount}
        </span>
      </h2>
      <button
        onClick={openModal}
        className={type === "expense" ? classes.redBtn : classes.greenBtn}
      >
        + Add
        {type === "expense" ? <span> Expenses</span> : <span> Income</span>}
      </button>
    </div>
  );
};

export default Card;
