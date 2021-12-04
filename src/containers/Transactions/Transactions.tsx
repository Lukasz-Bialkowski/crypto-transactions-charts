import { useEffect, useMemo } from "react";
import { shallowEqual } from "react-redux";
import { fetchRates } from "../../features/rates/ratesSlice";

import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { CurrencyBalance } from "../../types/CurrencyBalance";
import { Currency } from "../../types/enums/Currency";
import { TransactionStatus } from "../../types/enums/TransactionStatus";
import { TransactionType } from "../../types/enums/TransactionType";
import { Transaction } from "../../types/Transaction";
import { formatNumbers } from "../../utils/NumberUtils";
import { CurrencyBalanceRow } from "./components/CurrencyBalanceRow";
import { TransactionRow } from "./components/TransactionRow";

import "./Transactions.module.css";

const Transactions = () => {
  const [transactions, loadingTransactions] = useTypedSelector(({ transactions: { transactions, loading } }) => [transactions, loading], shallowEqual);
  const [rates, loadingRates] = useTypedSelector(({ rates: { rates, loading } }) => [rates, loading], shallowEqual);
  const dispatch = useTypedDispatch();

  useEffect(() => {
    dispatch(fetchRates());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const currenciesBalance = useMemo(() => {
    return transactions.reduce((acc, transaction: Transaction) => {
      const currentCompletedWithdrawals = acc[transaction.currency]?.completedWithdrawals ?? 0;
      const currentCompletedDeposits = acc[transaction.currency]?.completedDeposits ?? 0;
      const currentPendingWithdrawals = acc[transaction.currency]?.pendingWithdrawals ?? 0;
      const currentPendingDeposits = acc[transaction.currency]?.pendingDeposits ?? 0;

      return ({
        ...acc,
        [transaction.currency]: {
          currency: transaction.currency,
          completedWithdrawals: transaction.type === TransactionType.WITHDRAWAL && transaction.status === TransactionStatus.COMPLETED ? currentCompletedWithdrawals + 1 : currentCompletedWithdrawals,
          completedDeposits: transaction.type === TransactionType.DEPOSIT && transaction.status === TransactionStatus.COMPLETED ? currentCompletedDeposits + 1 : currentCompletedDeposits,
          pendingWithdrawals: transaction.type === TransactionType.WITHDRAWAL && transaction.status === TransactionStatus.PENDING ? currentPendingWithdrawals + 1: currentPendingWithdrawals,
          pendingDeposits: transaction.type === TransactionType.DEPOSIT && transaction.status === TransactionStatus.PENDING ? currentPendingDeposits + 1 : currentPendingDeposits,
        }
      })
    }, {} as Record<Currency, CurrencyBalance>);

  }, [transactions]);

  return (
    <div>
      <h1>Transactions</h1>
      
      <section>
        <h2>Currency rates (€)</h2>
        <table>
          <tbody>
            <tr>
              <th>Currency</th>
              <th>Eur rate</th>
            </tr>
            {Object.keys(rates).map(currency => (
              <tr key={currency}>
                <td>{currency}</td>
                <td>{rates[currency] ? formatNumbers(rates[currency]!) : '-'}</td>
              </tr>
            ))}    
          </tbody>
        </table>
      </section>


      <section>
        <h2>Transactions</h2>
        <table>
          <tbody>
            <tr>
              <th>Timestamp</th>
              <th>Currency</th>
              <th>Amount</th>
              <th>Eur equiv</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
            {transactions.map(transaction => <TransactionRow key={transaction.id} transaction={transaction} rates={rates} />)}
          </tbody>
        </table>
      </section>


      <section>
        <h2>Currency balance</h2>
        <table>
          <tbody>
            <tr>
              <th>Currency</th>
              <th>Total completed withdrawals</th>
              <th>Total completed deposits</th>
              <th>Total pending withdrawals</th>
              <th>Total pending deposits</th>
              <th>Total balance (completed deposits - completed withdrawals)</th>
              <th>Total balance eur equiv</th>
            </tr>
            {Object.values(currenciesBalance).map(balance => <CurrencyBalanceRow key={balance.currency}  balance={balance} rates={rates} />)}
          </tbody>
        </table>
      </section>
    </div>
  )
};

export {
  Transactions,
}