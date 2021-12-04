import { useEffect, useState } from "react";
import { TRANSACTION_API_URL } from "../../constants/config";
import { TRANSACTIONS_PATH } from "../../constants/paths";
import { TransactionsProps } from "./TransactionsProps"

const Transactions = ({}: TransactionsProps) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await fetch(`${TRANSACTION_API_URL}${TRANSACTIONS_PATH}`);
      const dataJson = await data.json();

      console.log('data', data, 'dataJson', dataJson);
      setTransactions(dataJson);
    }

    fetchTransactions();
  }, []);

  return (
    <div>Transactions</div>
  )
};

export {
  Transactions,
}