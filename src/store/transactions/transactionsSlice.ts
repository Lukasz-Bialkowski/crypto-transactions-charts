import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { TRANSACTION_API_URL } from "../../constants/config";
import { TRANSACTIONS_PATH } from "../../constants/paths";
import {
  TransactionsState,
  TRANSACTIONS_SLICE_NAME,
} from "../../types/slices/TransactionsState";
import { TransactionListResponse } from "../../types/TransactionListResponse";

const initialState: TransactionsState = {
  transactions: [],
  status: "idle",
};

const fetchTransactions = createAsyncThunk("fetchTransactions", async () => {
  const response = await fetch(`${TRANSACTION_API_URL}${TRANSACTIONS_PATH}`);
  const responseBody: TransactionListResponse = await response.json();
  return responseBody;
});

export const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchTransactions.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.transactions = payload.transactions;
    });
  },
});

const { reducer: transactionsReducer } = transactionsSlice;

export { fetchTransactions, transactionsReducer };
