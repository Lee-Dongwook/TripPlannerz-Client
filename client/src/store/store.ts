import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import rootReducer from '@/store/reducer';

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
export type RootReducerType = ReturnType<typeof rootReducer>;