import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import logger from "redux-logger";
import unitSlice from "../features/unitSlice";
import userSlice from "../features/userSlice";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import {
  persistReducer,
  persistStore,

} from "redux-persist";

import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
  unit: unitSlice,
  user: userSlice,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer
});
export const persistor = persistStore(store);
