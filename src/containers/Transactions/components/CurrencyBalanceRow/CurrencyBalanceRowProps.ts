import { CurrencyBalance } from "../../../../types/CurrencyBalance";
import { Currency } from "../../../../types/enums/Currency";

export type CurrencyBalanceRowProps = {
  balance: CurrencyBalance;
  rates: Record<Currency, number | null>,
}