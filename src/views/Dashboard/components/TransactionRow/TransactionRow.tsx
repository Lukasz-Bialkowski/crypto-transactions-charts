import { formatDate } from "../../../../utils/datesUtil";
import { formatNumbers } from "../../../../utils/numbersUtil";
import { TransactionRowProps } from "./TransactionRowProps";

const TransactionRow = ({
  transaction: { amount, currency, status, timestamp, type },
  rates,
}: TransactionRowProps) => (
  <tr>
    <td>{formatDate(timestamp)}</td>
    <td>{currency}</td>
    <td>{amount}</td>
    <td>
      {currency && rates && rates[currency]
        ? formatNumbers(rates[currency]! * amount)
        : "-"}
    </td>
    <td>{type}</td>
    <td>{status}</td>
  </tr>
);

export { TransactionRow };
