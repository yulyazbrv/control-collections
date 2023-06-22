import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import collectionReducer from "./slices/collectionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    collection: collectionReducer
  },
});
