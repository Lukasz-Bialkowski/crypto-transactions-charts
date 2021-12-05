import { Table } from "../../../../components/Table";
import { useTypedSelector } from "../../../../hooks/useTypedSelector";
import { TransactionRow } from "../TransactionRow";

const TransactionsTable = () => {
  const transactions = useTypedSelector(
    ({ transactions: { transactions } }) => transactions
  );
  const transactionsStatus = useTypedSelector(
    ({ transactions: { status } }) => status
  );
  const rates = useTypedSelector(({ rates: { rates } }) => rates);
  const ratesStatus = useTypedSelector(({ rates: { status } }) => status);

  const resolveTableStatus = () => {
    if (
      [ratesStatus, transactionsStatus].some((status) => status === "loading")
    ) {
      return "loading";
    } else if (
      [ratesStatus, transactionsStatus].every((status) => status === "success")
    ) {
      return "success";
    } else if (transactionsStatus === "failed") {
      return "failed";
    } else {
      return "idle";
    }
  };

  return (
    <section>
      <h2>Transactions</h2>
      <Table
        status={resolveTableStatus()}
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
