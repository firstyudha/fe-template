import { configureStore } from "@reduxjs/toolkit";
import campaignsReducer from "./slices/campaignSlice";

export const store = configureStore({
    reducer: {
        campaigns: campaignsReducer
    },
})