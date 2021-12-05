import { CurrencyBalance } from "../../../../types/CurrencyBalance";
import { Currency } from "../../../../types/enums/Currency";
import { RatesByCurrency } from "../../../../types/slices/RatesState";

export type CurrencyBalanceTableProps = {
  currenciesBalance: Record<Currency, CurrencyBalance>;
  rates: RatesByCurrency;
};
