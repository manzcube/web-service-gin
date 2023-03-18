import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { apiSlice } from './../features/api/apiSlice';
import userReducer from "../features/auth/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
       [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.REACT_APP_NODE_ENV === "development"
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;