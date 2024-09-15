import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TUser } from "../Types/TUser";
import Swal from "sweetalert2";

const initialUser = {
    isLoggedIn: false,
    userName: "",
    user: null as TUser | null
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUser,
    reducers: { // actions
        login: (state: TUserState, data: PayloadAction<TUser>) => {
            state.isLoggedIn = true;
            state.user = data.payload;
        },
        logout: (state: TUserState) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },

});

export const userActions = userSlice.actions;
export default userSlice.reducer;
export type TUserState = typeof initialUser;