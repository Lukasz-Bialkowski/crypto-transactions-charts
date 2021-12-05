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
    <td className="align-right">{formatNumbers(amount)}</td>
    {currency && rates && rates[currency] ? (
      <td className="align-right">
        {formatNumbers(rates[currency]! * amount)}
      </td>
    ) : (
      <td>-</td>
    )}
    <td>{type}</td>
    <td>{status}</td>
  </tr>
);

export { TransactionRow };
