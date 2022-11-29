import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice from "../features/userSlice";
import unitsSlice from "../features/unitSlice";

const rootReducer = combineReducers({
  users: usersSlice,
  units: unitsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {},
    }),
});