import { formatNumbers } from "../../../../utils/NumberUtils";
import { CurrencyBalanceRowProps } from "./CurrencyBalanceRowProps";

const CurrencyBalanceRow = ({
  balance,
  rates,
}: CurrencyBalanceRowProps) => {
  const {
    currency,
    completedWithdrawals = 0,
    completedDeposits = 0,
    pendingWithdrawals = 0,
    pendingDeposits = 0,
  } = balance || {};
  const totalBalance = completedDeposits - completedWithdrawals;
  const totalBalanceEurEquiv = (rates && currency && rates[currency] && totalBalance !== 0) ? formatNumbers(rates[currency]! * totalBalance) : '-';

  return (
    <tr>
      <td>{currency}</td>
      <td>{completedWithdrawals}</td>
      <td>{completedDeposits}</td>
      <td>{pendingWithdrawals}</td>
      <td>{pendingDeposits}</td>
      <td>{totalBalance}</td>
      <td>{totalBalanceEurEquiv}</td>
    </tr>
  );
};

export {
  CurrencyBalanceRow
};