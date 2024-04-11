import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface NotificationState {
  notifications: any[];
}

const initialState: NotificationState = {
  notifications: [],
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<any>) => {
      state.notifications = [...state.notifications, action.payload];
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
