import { configureStore } from "@reduxjs/toolkit";
import navProgressReducer from "./features/navProgressSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      navProgress: navProgressReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // Ignore these action types
          ignoredActions: ["navProgress/start", "navProgress/stop"],
        },
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
