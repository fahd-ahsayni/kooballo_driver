import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./app-slice";

export const store = configureStore({
  reducer: {
    appSlice : appSlice,
  },
});
