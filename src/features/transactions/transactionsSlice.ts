import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { TRANSACTION_API_URL } from '../../constants/config'
import { TRANSACTIONS_PATH } from '../../constants/paths'
import { TransactionsState, TRANSACTIONS_SLICE_NAME } from '../../types/slices/TransactionsState'
import { TransactionListResponse } from '../../types/TransactionListResponse'

const initialState: TransactionsState = {
  transactions: [],
  loading: false,
  error: false,
}

export const transactionsSlice = createSlice({
  name: TRANSACTIONS_SLICE_NAME,
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<TransactionListResponse>) => {
      state.loading = false;
      state.error = false;
      state.transactions = action.payload.transactions;
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
})

const { actions: {fetchRequest, fetchSuccess, fetchError}, reducer: transactionsReducer } = transactionsSlice;

const fetchTransactions = () => async (dispatch: Dispatch) => {
  dispatch(fetchRequest());
  try {
    const response = await fetch(`${TRANSACTION_API_URL}${TRANSACTIONS_PATH}`);
    const responseBody: TransactionListResponse = await response.json();

    return dispatch(fetchSuccess(responseBody));
  } catch (err) {
    dispatch(fetchError());
  }
}

export {
  fetchTransactions,
  transactionsReducer,
}