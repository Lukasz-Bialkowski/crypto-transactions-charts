import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TRANSACTION_API_URL } from "../../constants/config";
import { EUR_RATES_PATH } from "../../constants/paths";
import { RatesResponse } from "../../types/RatesResponse";
import { RatesState, RATES_SLICE_NAME } from "../../types/slices/RatesState";

const initialState: RatesState = {
  rates: {},
  loading: false,
  error: false,
};

const fetchRates = createAsyncThunk("fetchRates", async () => {
  const response = await fetch(`${TRANSACTION_API_URL}${EUR_RATES_PATH}`);
  const rates: RatesResponse = await response.json();
  return rates;
});

export const ratesSlice = createSlice({
  name: RATES_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRates.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRates.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(fetchRates.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = false;
      state.rates = { ...state.rates, ...payload };
    });
  },
});

const { reducer: ratesReducer } = ratesSlice;

export { fetchRates, ratesReducer };
