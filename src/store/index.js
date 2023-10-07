import { configureStore } from "@reduxjs/toolkit";
import { authState } from "./auth/slice";
import { articlesState } from "./articles/slice";

export const store = configureStore({
  reducer: {
    articlesState,
    authState,
  },
});
