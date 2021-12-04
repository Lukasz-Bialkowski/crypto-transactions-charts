import { Currency } from "./enums/Currency";
import { TransactionStatus } from "./enums/TransactionStatus";
import { TransactionType } from "./enums/TransactionType";

export type Transaction = {
  id: string,
  timestamp: number,
  type: TransactionType,
  status: TransactionStatus,
  currency: Currency,
  amount: number;
}