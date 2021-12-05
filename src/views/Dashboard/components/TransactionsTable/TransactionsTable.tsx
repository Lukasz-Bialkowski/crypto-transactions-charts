import { shallowEqual } from "react-redux";

import { Table } from "../../../../components/Table";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { TransactionRow } from "../TransactionRow";

const TransactionsTable = () => {
  const [transactions, transactionsLoading, transactionsError] =
    useTypedSelector(
      ({ transactions: { transactions, loading, error } }) => [
        transactions,
        loading,
        error,
      ],
      shallowEqual
    );
  const [rates, ratesLoading] = useTypedSelector(
    ({ rates: { rates, loading } }) => [rates, loading],
    shallowEqual
  );

  return (
    <section>
      <h2>Transactions</h2>
      <Table
        error={transactionsError}
        loading={ratesLoading || transactionsLoading}
        items={transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            transaction={transaction}
            rates={rates}
          />
        ))}
        header={
          <tr>
            <th>Timestamp</th>
            <th>Currency</th>
            <th>Amount</th>
            <th>Eur equiv</th>
            <th>Type</th>
            <th>Status</th>
          </tr>
        }
      />
    </section>
  );
};

export { TransactionsTable };
