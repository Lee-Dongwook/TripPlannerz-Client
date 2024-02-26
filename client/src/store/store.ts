import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import tokenReducer from '@/store/token';
import preferenceTypeReducer from '@/store/preferenceTypes';
import notificationReducer from '@/store/notification';

const persistConfig = {
    key: "root",
    storage,
    whiteList: ['token']
}

const rootReducer = combineReducers({
    token: tokenReducer,
    types: preferenceTypeReducer,
    notification: notificationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;