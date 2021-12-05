import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TRANSACTION_API_URL } from "../../constants/config";
import { EUR_RATES_PATH } from "../../constants/paths";
import { RatesResponse } from "../../types/RatesResponse";
import { RatesState, RATES_SLICE_NAME } from "../../types/slices/RatesState";

const initialState: RatesState = {
  rates: {},
  status: "idle",
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
      state.status = 'loading'
    });
    builder.addCase(fetchRates.rejected, (state) => {
      state.status = 'failed'
    });
    builder.addCase(fetchRates.fulfilled, (state, { payload }) => {
      state.status = 'success'
      state.rates = { ...state.rates, ...payload };
    });
  },
});

const { reducer: ratesReducer } = ratesSlice;

export { fetchRates, ratesReducer };
