import { Currency } from "./enums/Currency";

export type CurrencyBalance = {
  currency: Currency;
  completedWithdrawals: number;
  completedDeposits: number;
  pendingWithdrawals: number;
  pendingDeposits: number;
};
