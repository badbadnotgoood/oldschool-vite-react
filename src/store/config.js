import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootState from './reducers/root';
import persisted from './reducers/persist';

const persistState = persistReducer(
  {
    key: 'persistReducer',  
    version: 1,
    storage,
  },
  persisted
);

const store = configureStore({
  reducer: {
    rootReducer: rootState,
    persistReducer: persistState,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };
