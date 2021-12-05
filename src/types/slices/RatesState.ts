import { Currency } from "../enums/Currency";

export const RATES_SLICE_NAME = "rates";

export type RatesByCurrency = {
  [key in Currency]?: number | null;
};

export type RatesState = {
  rates: RatesByCurrency;
  loading: boolean;
  error: boolean;
};
