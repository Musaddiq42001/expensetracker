import React, { useState } from "react";
import { PiPizza } from "react-icons/pi";
import { MdCancel } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { CiRollingSuitcase } from "react-icons/ci";
import { GoGift } from "react-icons/go";

import classes from "./TransactionItem.module.css";
import EditExpenseModal from "../Modal/EditExpenseModal";
import { formattedDate } from "../../utils/helper";
import { useData } from "../../context/DataContext";

const TransactionItem = ({ name, date, amount, type, id }) => {
  const { dispatch } = useData();

  let setIcon;
  if (type === "food") {
    setIcon = <PiPizza />;
  } else if (type === "travel") {
    setIcon = <CiRollingSuitcase />;
  } else {
    setIcon = <GoGift />;
  }

  const [editExpenseModalIsOpen, setEditExpenseIsOpen] = useState(false);

  const opeEditExpenseModal = () => {
    setEditExpenseIsOpen(true);
  };

  function closeEditExpenseModal() {
    setEditExpenseIsOpen(false);
  }

  return (
    <>
      <div className={classes.outer}>
        <div className={classes.left}>
          <div className={classes.itemIcon}>{setIcon}</div>
          <div className={classes.item}>
            <p className={classes.name}>{name}</p>
            <p className={classes.date}>{new Date(date).toDateString()}</p>
          </div>
        </div>
        <div className={classes.right}>
          <p className={classes.amount}>&#8377;{amount}</p>
          <div
            className={classes.cancekIcon}
            onClick={() => dispatch({ type: "expense/delete", payload: id })}
          >
            <MdCancel />
          </div>
          <div className={classes.editIcon} onClick={opeEditExpenseModal}>
            <MdModeEdit />
          </div>
        </div>
      </div>
      <hr />
      <EditExpenseModal
        name={name}
        id={id}
        date={formattedDate(date)}
        amount={amount}
        type={type}
        modalIsOpen={editExpenseModalIsOpen}
        closeModal={closeEditExpenseModal}
      />
    </>
  );
};

export default TransactionItem;
