import { formatNumbers } from "../../../../utils/numbers.util";
import { CurrencyRatesRowProps } from "./CurrencyRatesRowProps";

const CurrencyRatesRow = ({ currency, rate }: CurrencyRatesRowProps) => (
  <tr key={currency}>
    <td>{currency}</td>
    <td>{rate ? formatNumbers(rate) : "-"}</td>
  </tr>
);

export { CurrencyRatesRow };
