import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "../features/auth/authSlice";

// Redux Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // only persist the auth slice
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions that trigger serializability warnings
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor instance
export const persistor = persistStore(store);

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
