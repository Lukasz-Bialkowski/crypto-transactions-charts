import { CurrencyBalance } from "../../../../types/CurrencyBalance";
import { RatesByCurrency } from "../../../../types/slices/RatesState";

export type CurrencyBalanceRowProps = {
  balance: CurrencyBalance;
  rates: RatesByCurrency;
};
