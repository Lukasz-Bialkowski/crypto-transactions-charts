import { useMemo } from "react";

import { Table } from "../../../../components/Table";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { CurrencyBalance } from "../../../../types/CurrencyBalance";
import { Currency } from "../../../../types/enums/Currency";
import { TransactionStatus } from "../../../../types/enums/TransactionStatus";
import { TransactionType } from "../../../../types/enums/TransactionType";
import { Transaction } from "../../../../types/Transaction";
import { CurrencyBalanceRow } from "../CurrencyBalanceRow";

const CurrencyBalanceTable = () => {
  const transactions = useTypedSelector(
    ({ transactions: { transactions } }) => transactions
  );
  const status = useTypedSelector(({ transactions: { status } }) => status);
  const rates = useTypedSelector(({ rates: { rates } }) => rates);

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
            transaction.type === TransactionType.Withdrawal &&
            transaction.status === TransactionStatus.Completed
              ? currentCompletedWithdrawals + 1
              : currentCompletedWithdrawals,
          completedDeposits:
            transaction.type === TransactionType.Deposit &&
            transaction.status === TransactionStatus.Completed
              ? currentCompletedDeposits + 1
              : currentCompletedDeposits,
          pendingWithdrawals:
            transaction.type === TransactionType.Withdrawal &&
            transaction.status === TransactionStatus.Pending
              ? currentPendingWithdrawals + 1
              : currentPendingWithdrawals,
          pendingDeposits:
            transaction.type === TransactionType.Deposit &&
            transaction.status === TransactionStatus.Pending
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
        status={status}
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
