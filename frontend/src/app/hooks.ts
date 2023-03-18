import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type {RootState, AppDispatch } from "./store";

// USe thoughout your app instad of plain hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
