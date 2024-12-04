import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAnalytics } from "../../services/dashboardService";

export const fetchDashboardThunk = createAsyncThunk('dashboard/fetchDashboard', async () => {
    return await getAnalytics();
})

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        items: {},
        loading: false,
        error: null    
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchDashboardThunk.pending, (state) => {
            state.loading = true;       
        })
        .addCase(fetchDashboardThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchDashboardThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = "Failed to fetch data";
        })
    }    
})

export default dashboardSlice.reducer