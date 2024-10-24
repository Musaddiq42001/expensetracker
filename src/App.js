import Dashboard from "./components/Dashboard/Dashboard";
import TopExpenses from "./components/TopExpenses/TopExpenses";
import Transactions from "./components/Transactions/Transactions";
import { useData } from "./context/DataContext";

function App() {
  const { totalExpense } = useData();

  return (
    <>
      <Dashboard />
      {totalExpense > 0 && (
        <div className="summary">
          <Transactions />
          <TopExpenses />
        </div>
      )}
    </>
  );
}

export default App;
