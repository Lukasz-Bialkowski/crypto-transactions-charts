import { Currency } from "../enums/Currency";
import { AsyncStatus } from "../AsyncStatus";

export const RATES_SLICE_NAME = "rates";

export type RatesByCurrency = {
  [key in Currency]?: number | null;
};

export type RatesState = {
  rates: RatesByCurrency;
  status: AsyncStatus;
};
