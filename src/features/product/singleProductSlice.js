import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constans";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios(`${BASE_URL}/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    good: {},
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.good = payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export default singleProductSlice.reducer;
