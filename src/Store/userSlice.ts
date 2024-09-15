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
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, log me out"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Logged out",
                        icon: "success"
                    });
                }
            });
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