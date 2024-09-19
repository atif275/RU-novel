// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import sliceReducer from './index'; // Update with the actual path

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, sliceReducer);

// Create the Redux store with persisted reducer
const store = configureStore({
  reducer: {
    userData: persistedReducer,
  },
});

// Create persistor for the store
const persistor = persistStore(store);

export { store, persistor };
