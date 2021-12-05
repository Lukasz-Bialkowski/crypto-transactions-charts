import { useMemo } from "react";
import { shallowEqual } from "react-redux";

import { Table } from "../../../../components/Table";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CurrencyBalance } from "../../../../types/CurrencyBalance";
import { Currency } from "../../../../types/enums/Currency";
import { TransactionStatus } from "../../../../types/enums/TransactionStatus";
import { TransactionType } from "../../../../types/enums/TransactionType";
import { Transaction } from "../../../../types/Transaction";
import { CurrencyBalanceRow } from "../CurrencyBalanceRow";

const CurrencyBalanceTable = () => {
  const [transactions, transactionsLoading] = useTypedSelector(
    ({ transactions: { transactions, loading } }) => [transactions, loading],
    shallowEqual
  );
  const [rates, ratesLoading] = useTypedSelector(
    ({ rates: { rates, loading } }) => [rates, loading],
    shallowEqual
  );

  const currenciesBalance = useMemo(() => {
    return transactions.reduce((acc, transaction: Transaction) => {
      const currentCompletedWithdrawals =
        acc[transaction.currency]?.completedWithdrawals ?? 0;
      const currentCompletedDeposits =
        acc[transaction.currency]?.completedDeposits ?? 0;
      const currentPendingWithdrawals =
        acc[transaction.currency]?.pendingWithdrawals ?? 0;
      const currentPendingDeposits =
        acc[transaction.currency]?.pendingDeposits ?? 0;

      return {
        ...acc,
        [transaction.currency]: {
          currency: transaction.currency,
          completedWithdrawals:
            transaction.type === TransactionType.WITHDRAWAL &&
            transaction.status === TransactionStatus.COMPLETED
              ? currentCompletedWithdrawals + 1
              : currentCompletedWithdrawals,
          completedDeposits:
            transaction.type === TransactionType.DEPOSIT &&
            transaction.status === TransactionStatus.COMPLETED
              ? currentCompletedDeposits + 1
              : currentCompletedDeposits,
          pendingWithdrawals:
            transaction.type === TransactionType.WITHDRAWAL &&
            transaction.status === TransactionStatus.PENDING
              ? currentPendingWithdrawals + 1
              : currentPendingWithdrawals,
          pendingDeposits:
            transaction.type === TransactionType.DEPOSIT &&
            transaction.status === TransactionStatus.PENDING
              ? currentPendingDeposits + 1
              : currentPendingDeposits,
        },
      };
    }, {} as Record<Currency, CurrencyBalance>);
  }, [transactions]);

  return (
    <section>
      <h2>Currency balance</h2>
      <Table
        loading={ratesLoading || transactionsLoading}
        items={Object.values(currenciesBalance).map((balance) => (
          <CurrencyBalanceRow
            key={balance.currency}
            balance={balance}
            rates={rates}
          />
        ))}
        header={
          <tr>
            <th>Currency</th>
            <th>Total completed withdrawals</th>
            <th>Total completed deposits</th>
            <th>Total pending withdrawals</th>
            <th>Total pending deposits</th>
            <th>Total balance (completed deposits - completed withdrawals)</th>
            <th>Total balance eur equiv</th>
          </tr>
        }
      />
    </section>
  );
};

export { CurrencyBalanceTable };
