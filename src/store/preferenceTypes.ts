import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PreferenceTypeState {
  types: any[];
}

const initialState: PreferenceTypeState = {
  types: [],
};

export const preferenceTypeSlice = createSlice({
  name: 'preferenceType',
  initialState,
  reducers: {
    setPreferenceType: (state, action: PayloadAction<any>) => {
      state.types = [...state.types, action.payload];
    },
  },
});

export const { setPreferenceType } = preferenceTypeSlice.actions;
export default preferenceTypeSlice.reducer;
