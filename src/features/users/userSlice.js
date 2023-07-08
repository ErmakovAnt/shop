import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constant";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/registration`, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/login`, payload);
      const login = await axios(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
      return login.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.put(`${BASE_URL}/users/${payload._id}`, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

export const postCart = createAsyncThunk(
  "users/postCart",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${BASE_URL}/carts`, payload);
      return res.data;
    } catch (err) {
      console.error(err);
      return thunkAPI.rejectWithValue(err);
    }
  }
);

function helper(state, { payload }) {
  state.currentUser = payload;
  localStorage.setItem("userName", payload.email);
  localStorage.setItem("password", payload.password);
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {},
    cart: [],
    favorites: [],
    isLoading: false,
    formType: "signup",
    showForm: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);
      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    addItemToFavorites: (state, { payload }) => {
      let newFavorites = [...state.favorites];
      const found = newFavorites.find(({ id }) => id === payload.id);
      if (found) {
        return;
      } else {
        newFavorites.push(payload);
      }
      state.favorites = newFavorites;
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload.id);
    },
    removeItemFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter(({ id }) => id !== payload.id);
    },
    removeAllItemsFromCart: (state) => {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, helper);
    builder.addCase(loginUser.fulfilled, helper);
    builder.addCase(updateUser.fulfilled, helper);
  },
});
export const {
  addItemToCart,
  toggleForm,
  toggleFormType,
  removeItemFromCart,
  addItemToFavorites,
  removeItemFromFavorites,
  removeAllItemsFromCart,
} = userSlice.actions;

export default userSlice.reducer;
