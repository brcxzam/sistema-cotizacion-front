import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

interface AppState {
  loading: boolean;
}

const initialState: AppState = {
  loading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    isLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    },
  },
});

export const { isLoading } = appSlice.actions;

export const selectLoading = (state: RootState) => state.app.loading;

export default appSlice.reducer;
