import { formatNumbers } from "../../../../utils/numbersUtil";
import { CurrencyBalanceRowProps } from "./CurrencyBalanceRowProps";

const CurrencyBalanceRow = ({ balance, rates }: CurrencyBalanceRowProps) => {
  const {
    currency,
    completedWithdrawals = 0,
    completedDeposits = 0,
    pendingWithdrawals = 0,
    pendingDeposits = 0,
  } = balance || {};
  const totalBalance = completedDeposits - completedWithdrawals;
  const totalBalanceEurEquiv =
    rates && currency && rates[currency] && totalBalance !== 0 ? (
      <td className="align-right">
        {formatNumbers(rates[currency]! * totalBalance)}
      </td>
    ) : (
      <td>-</td>
    );

  return (
    <tr>
      <td>{currency}</td>
      <td>{completedWithdrawals}</td>
      <td>{completedDeposits}</td>
      <td>{pendingWithdrawals}</td>
      <td>{pendingDeposits}</td>
      <td>{totalBalance}</td>
      {totalBalanceEurEquiv}
    </tr>
  );
};

export { CurrencyBalanceRow };
