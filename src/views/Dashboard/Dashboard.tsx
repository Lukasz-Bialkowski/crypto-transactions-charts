import { useEffect } from "react";

import { fetchRates } from "../../store/rates/rates.slice";
import { fetchTransactions } from "../../store/transactions/transactions.slice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { CurrencyRatesTable } from "./components/CurrencyRatesTable";
import { TransactionsTable } from "./components/TransactionsTable";
import { CurrencyBalanceTable } from "./components/CurrencyBalanceTable";

const Dashboard = () => {
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchRates());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <CurrencyRatesTable />
      <TransactionsTable />
      <CurrencyBalanceTable />
    </div>
  );
};

export { Dashboard };
