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

const BalanceModal = ({ modalIsOpen, closeModal }) => {
  const { enqueueSnackbar } = useSnackbar();
  // const { dispatch  } = useData();
  const { handleWalletBalance } = useData();

  const [balance, setBalance] = useState(0);

  const handleBalanceAmount = (e) => {
    e.preventDefault();
    if (balance < 0) {
      enqueueSnackbar("Amount should be more than 0");
      closeModal();
    } else {
      // dispatch({ type: "income/add", payload: Number(balance) });
      handleWalletBalance(balance);
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Balance Modal"
    >
      <h1 className={classes.header}>Add Balance</h1>
      <form onSubmit={handleBalanceAmount}>
        <input
          placeholder="Income Amount"
          className={classes.input}
          onChange={(e) => setBalance(e.target.value)}
          type="number"
          required
        />
        <button className={classes.addBtn}>Add Balance</button>
      </form>
      <button onClick={closeModal} className={classes.cancelBtn}>
        Cancel
      </button>
    </Modal>
  );
};

export default BalanceModal;
