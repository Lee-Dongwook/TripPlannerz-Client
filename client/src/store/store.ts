import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from '@/store/token';
import preferenceTypeReducer from '@/store/preferenceTypes';
import notificationReducer from '@/store/notification';

const store = configureStore({
    reducer: {
        token: tokenReducer,
        types: preferenceTypeReducer,
        notification: notificationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;