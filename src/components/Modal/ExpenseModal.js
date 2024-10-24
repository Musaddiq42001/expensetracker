import React, { useState } from "react";

import classes from "./Modal.module.css";

import Modal from "react-modal";
import { useData } from "../../context/DataContext";
import { useSnackbar } from "notistack";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#EFEFEF",
    borderRadius: "1rem",
  },
};

Modal.setAppElement("#root");

const initialState = {
  item: "",
  date: "",
  amount: "",
  type: "",
};

const ExpenseModal = ({ modalIsOpen, closeModal }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { walletBalance, dispatch } = useData();

  const [expenseData, setExpenseData] = useState(initialState);

  const handleExpenseData = (e) => {
    setExpenseData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitData = (e) => {
    e.preventDefault();

    if (expenseData.amount > walletBalance) {
      enqueueSnackbar("You dont have enough money for this expense!");
      closeModal();
      setExpenseData(initialState);
    } else {
      dispatch({ type: "expense/add", payload: expenseData });
      closeModal();
      setExpenseData(initialState);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Expenses Modal"
    >
      <h1 className={classes.header}>Add Expenses</h1>
      <form onSubmit={submitData} className={classes.expenseForm}>
        <input
          placeholder="Title"
          className={classes.input}
          onChange={handleExpenseData}
          value={expenseData.item}
          type="text"
          required
          name="item"
        />
        <input
          placeholder="Price"
          className={classes.input}
          onChange={handleExpenseData}
          value={expenseData.amount}
          type="number"
          required
          name="amount"
        />
        <select
          className={classes.input}
          name="type"
          onChange={handleExpenseData}
          value={expenseData.type}
          required
        >
          <option value="">Select Category</option>
          <option value="travel">Travel</option>
          <option value="food">Food</option>
          <option value="entertainment">Entertainment</option>
        </select>
        <input
          className={classes.input}
          onChange={handleExpenseData}
          value={expenseData.date}
          type="date"
          required
          name="date"
        />
        <button className={classes.addBtn}>Add Expenses</button>
      </form>
      <button onClick={closeModal} className={classes.cancelBtn}>
        Cancel
      </button>
    </Modal>
  );
};

export default ExpenseModal;
