import { configureStore } from "@reduxjs/toolkit";

import { ratesReducer } from "./store/rates/rates.slice";
import { transactionsReducer } from "./store/transactions/transactions.slice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    rates: ratesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
