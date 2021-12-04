export const RATES_SLICE_NAME = 'rates';

export type RatesState = {
  rates: Record<string, number | null>,
  loading: boolean,
  error: boolean,
}