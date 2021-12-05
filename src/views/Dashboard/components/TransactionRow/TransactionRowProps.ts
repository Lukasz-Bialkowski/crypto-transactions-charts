import { RatesByCurrency } from "../../../../types/slices/RatesState";
import { Transaction } from "../../../../types/Transaction";

export type TransactionRowProps = {
  transaction: Transaction;
  rates: RatesByCurrency;
};
