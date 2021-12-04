import { configureStore } from '@reduxjs/toolkit'
import { ratesReducer } from './features/rates/ratesSlice';
import { transactionsReducer } from './features/transactions/transactionsSlice';

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    rates: ratesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;