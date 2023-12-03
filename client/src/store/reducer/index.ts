import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tokenReducer } from '@/store/reducer/tokenReducer';
import { tripPreferenceReducer } from '@/store/reducer/tripPreferenceReducer';
import { notificationReducer } from '@/store/reducer/notificationReducer';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
}

export const rootReducer = combineReducers({
  token: tokenReducer,
  types: tripPreferenceReducer,
  notification: notificationReducer
});

export default persistReducer(persistConfig, rootReducer);

