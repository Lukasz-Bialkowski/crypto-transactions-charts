import { Transaction } from "../Transaction";

export const TRANSACTIONS_SLICE_NAME = 'transactions';

export type TransactionsState = {
  transactions: Transaction[],
  loading: boolean,
  error: boolean,
}