import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

// const DATA = [
//   {
//     id: 1,
//     item: "Samosa",
//     date: new Date(),
//     amount: 150,
//     type: "food",
//   },
//   {
//     id: 2,
//     item: "Movie",
//     date: new Date(),
//     amount: 300,
//     type: "entertainment",
//   },
//   {
//     id: 3,
//     item: "Auto",
//     date: new Date(),
//     amount: 50,
//     type: "travel",
//   },
//   {
//     id: 4,
//     item: "Pizza",
//     date: new Date(),
//     amount: 250,
//     type: "food",
//   },
//   {
//     id: 5,
//     item: "Flight",
//     date: new Date(),
//     amount: 1000,
//     type: "travel",
//   },
// ];

const intialRecentTransactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

const DataContext = createContext();

const initialState = {
  recentTransactions: intialRecentTransactions,
  itemsPerPage: 3,
  currentPage: 1,
};

function reducer(state, action) {
  switch (action.type) {
    case "expense/add":
      let { item, date, amount, type } = action.payload;
      const itemId = state.recentTransactions.length + 1;
      return {
        ...state,
        recentTransactions: [
          ...state.recentTransactions,
          {
            id: itemId,
            item: item,
            date: new Date(date),
            amount: Number(amount),
            type: type,
          },
        ],
      };
    case "expense/edit":
      return {
        ...state,
        recentTransactions: state.recentTransactions.map((transaction) =>
          transaction.id === action.payload.id
            ? {
                id: action.payload.id,
                item: action.payload.item,
                date: new Date(action.payload.date),
                amount: Number(action.payload.amount),
                type: action.payload.type,
              }
            : transaction
        ),
      };
    case "expense/delete":
      return {
        ...state,
        recentTransactions: state.recentTransactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };

    case "transactions/changePage":
      return { ...state, currentPage: action.payload };
    case "transactions/rightPage":
      return { ...state, currentPage: state.currentPage + 1 };
    case "transactions/leftPage":
      return { ...state, currentPage: state.currentPage - 1 };

    default:
      throw new Error("action type unknown!");
  }
}

function DataProvider({ children }) {
  const [{ recentTransactions, itemsPerPage, currentPage }, dispatch] =
    useReducer(reducer, initialState);

  //Derive states based on recentTransactionss

  const initialWalletBalance =
    Number(localStorage.getItem("userWallet")) || 5000;

  const [totalExpense, setTotalExpense] = useState(0);

  const [walletBalance, setWalletBalance] = useState(initialWalletBalance);
  const [expenseType, setExpenseType] = useState([
    { name: "entertainment", value: 0 },
    { name: "food", value: 0 },
    { name: "travel", value: 0 },
  ]);

  const prevTotalExpenseRef = useRef(0);

  const handleWalletBalance = (amount) => {
    setWalletBalance((prev) => {
      const balance = prev + Number(amount);
      localStorage.setItem("userWallet", balance);
      return balance;
    });
  };

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(recentTransactions));
  }, [recentTransactions]);

  useEffect(() => {
    localStorage.setItem("userWallet", walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    const total = recentTransactions.reduce((acc, val) => acc + val.amount, 0);
    setTotalExpense(total);

    const updatedExpenseType = expenseType.map((expense) => {
      const totalAmount = recentTransactions
        .filter((transaction) => transaction.type === expense.name)
        .reduce((sum, transaction) => sum + transaction.amount, 0);
      return { ...expense, value: totalAmount };
    });
    setExpenseType(updatedExpenseType);

    // updating wallet balance according to total expenses
    const prevTotalExpense = prevTotalExpenseRef.current;
    const difference = total - prevTotalExpense;
    setWalletBalance((prev) => {
      const balance = prev - difference;
      localStorage.setItem("userWallet", balance);
      return balance;
    });
    prevTotalExpenseRef.current = total;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recentTransactions]);

  return (
    <DataContext.Provider
      value={{
        walletBalance,
        totalExpense,
        expenseType,
        recentTransactions,
        itemsPerPage,
        currentPage,
        dispatch,
        handleWalletBalance,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Data context used outside the DataProvider");
  }
  return context;
}

export { useData, DataProvider };
