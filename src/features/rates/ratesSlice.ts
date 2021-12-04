import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'
import { TRANSACTION_API_URL } from '../../constants/config'
import { EUR_RATES_PATH } from '../../constants/paths'
import { RatesResponse } from '../../types/RatesResponse'
import { RatesState, RATES_SLICE_NAME } from '../../types/slices/RatesState'

const initialState: RatesState = {
  rates: {},
  loading: false,
  error: false,
}

export const ratesSlice = createSlice({
  name: RATES_SLICE_NAME,
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action: PayloadAction<RatesResponse>) => {
      state.loading = false;
      state.error = false;
      state.rates = { ...state.rates, ...action.payload }
    },
    fetchError: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
})

const { actions: {fetchRequest, fetchSuccess, fetchError}, reducer: ratesReducer } = ratesSlice;

const fetchRates = () => async (dispatch: Dispatch) => {
  dispatch(fetchRequest());
  try {
    const response = await fetch(`${TRANSACTION_API_URL}${EUR_RATES_PATH}`);
    const rates: RatesResponse = await response.json();

    return dispatch(fetchSuccess(rates));
  } catch (err) {
    dispatch(fetchError());
  }
}

export {
  fetchRates,
  ratesReducer,
}