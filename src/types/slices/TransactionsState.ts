import { Transaction } from "../Transaction";
import { AsyncStatus } from "../AsyncStatus";

export const TRANSACTIONS_SLICE_NAME = "transactions";

export type TransactionsState = {
  transactions: Transaction[];
  status: AsyncStatus;
};
