import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../../utils/constans";

export const createUser = createAsyncThunk(
  "users/createUser",
  async (payload, thunkAPI) => {
    try {
      const res = await axios.post(`${USER_URL}/users`, payload);
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
      const res = await axios.post(`${USER_URL}/auth/login`, payload);
      const login = await axios(`${USER_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${res.data.access_token}` },
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
      const res = await axios.put(`${USER_URL}/users/${payload.id}`, payload);
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
      const res = await axios.post("https://fakestoreapi.com/carts", payload);
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
} = userSlice.actions;

export default userSlice.reducer;
