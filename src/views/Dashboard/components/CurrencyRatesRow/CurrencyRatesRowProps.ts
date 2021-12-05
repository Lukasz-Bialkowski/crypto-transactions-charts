import { Currency } from "../../../../types/enums/Currency";

export type CurrencyRatesRowProps = {
  currency: Currency;
  rate: number | null;
};
