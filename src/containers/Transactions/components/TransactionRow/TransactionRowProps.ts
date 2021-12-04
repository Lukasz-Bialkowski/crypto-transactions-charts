import { Currency } from "../../../../types/enums/Currency";
import { Transaction } from "../../../../types/Transaction";

export type TransactionRowProps = {
  transaction: Transaction;
  rates: Record<Currency, number | null>
}