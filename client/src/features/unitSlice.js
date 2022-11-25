import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUnits = createAsyncThunk(
  "units/fetchUnits",
  async () => {
    const { data } = await axios.get("/api/units");
    return data;
  }
);

export const fetchSingleUnit = createAsyncThunk(
  "units/fetchSingleUnit",
  async (id) => {
    const { data } = await axios.get(`/api/units/${id}`);
    return data;
  }
);

//admin only functionality
export const attemptUpdateUnit = createAsyncThunk(
  "units/attemptUpdateUnit",
  async (params) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const { unit } = params;
      const { data } = await axios.put(
        `/api/units/${unit.id}`, {
        length: unit.length,
        width: unit.width,
        price: unit.price,
        climate: unit.climate,
      },
        {
          headers: { authorization: token },
        }
      );
      return data;
    }
  }
);

const initialState = {
  units: [],
  status: "idle",
  error: null,
};
const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUnits.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUnits.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.units = action.payload.rows;
      })
      .addCase(fetchUnits.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(attemptUpdateUnit.pending, (state) => {
        state.status = "pending";
      })
      .addCase(attemptUpdateUnit.fulfilled, (state, action) => {
        state.singleUnit = action.payload;
        state.status = "succeeded";
      })
      .addCase(attemptUpdateUnit.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const getUnitStatus = (state) => state.units.status;

export default unitsSlice.reducer;