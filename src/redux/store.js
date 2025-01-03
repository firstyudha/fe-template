import { configureStore, createStore } from "@reduxjs/toolkit";
import campaignsReducer from "./slices/campaignSlice";
import dashboardReducer from "./slices/dashboardSlice";

const initialState = {
    sidebarShow: true,
    theme: 'dark',
}

const changeState = (state = initialState, { type, ...rest }) => {
    switch (type) {
      case 'set':
        return { ...state, ...rest }
      default:
        return state
    }
}

export const store = configureStore({
    reducer: {
        sidebarShow: changeState,
        campaigns: campaignsReducer,
        dashboard: dashboardReducer
    },
})

// export const store = createStore(changeState)
