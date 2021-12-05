import { RatesByCurrency } from "../../../../types/slices/RatesState";
import { Transaction } from "../../../../types/Transaction";

export type TransactionsTableProps = {
  transactions: Transaction[];
  rates: RatesByCurrency;
};
