import { combineReducers, configureStore } from "@reduxjs/toolkit/react";
import userSlice from "./userSlice";



const store = configureStore({
    reducer: { userSlice },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false
        });
    },
});

const rootReducer = combineReducers({ userSlice });
export type TRootState = ReturnType<typeof rootReducer>;
export default store;
