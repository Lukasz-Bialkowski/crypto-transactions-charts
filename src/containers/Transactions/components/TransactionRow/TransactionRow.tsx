import { formatDate } from "../../../../utils/DateUtils"
import { formatNumbers } from "../../../../utils/NumberUtils"
import { TransactionRowProps } from "./TransactionRowProps"

const TransactionRow = ({
  transaction: {
    amount, currency, status, timestamp, type,
  },
  rates,
}: TransactionRowProps) => (
  <tr>
    <td>{formatDate(timestamp)}</td>
    <td>{currency}</td>
    <td>{amount}</td>
    <td>{(currency && rates && rates[currency]) ? formatNumbers(rates[currency]! * amount) : '-'}</td>
    <td>{type}</td>
    <td>{status}</td>
  </tr>
)

export {
  TransactionRow,
}
