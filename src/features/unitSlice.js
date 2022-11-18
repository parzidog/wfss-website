import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUnits = createAsyncThunk("api/fetchAllUnits",
    async () => {
        const { data } = await axios.get("/api/units");
        return data;
    });

export const updateUnit = createAsyncThunk("api/updateUnit",
    async (unit) => {
        const { data } = await axios.put(`/api/units/${unit.id}`, unit);
        return data;
    });

const initialState = {
    allUnits: [],
};

const unitSlice = createSlice({
    name: "units",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchAllUnits.pending, (state) => {
                state.status = "pending";
            })
            .addCase(fetchAllUnits.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allUnits = action.payload.rows;
            })
            .addCase(fetchAllUnits.rejected, (state) => {
                state.status = "failed";
            })
            .addCase(updateUnit.pending, (state) => {
                state.status = "pending";
            })
            .addCase(updateUnit.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allUnits = state.allUnits.map((unit) => {
                    if (unit.id === action.payload.id) {
                        return action.payload;
                    } else {
                        return unit;
                    }
                });
            })
            .addCase(updateUnit.rejected, (state) => {
                state.status = "failed";
            })
    },
})

export default unitSlice.reducer;