import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
    value: string | null;
}

const initialState: User = {
    value: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
        closeSession: (state) => {
            state.value = null;
        }
    }

})

export const { setUser, closeSession } = userSlice.actions;

export const selectUser = (state: RootState) => state?.user.value;

export default userSlice.reducer;