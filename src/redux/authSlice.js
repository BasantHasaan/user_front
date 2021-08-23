import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";


export const loginUser = createAsyncThunk("users/login", async (values , thunkAPI) => {
  try {
    const response = await api.post("/login", values);
    let { data } = response;
    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log("Error", e);
    thunkAPI.rejectWithValue(e.response.data);
  }
});

const authSlice = createSlice({
  name: "users",
  initialState: {
    username: "",
    email: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log("payload", payload);
      if (payload) {
          state.email = payload.email;
          state.fullName = payload.fullName;
          state.isFetching = false;
          state.isSuccess = true;
          state.isAdmin = payload.isAdmin;
          return state;
      }
      return state
    
    },
    [loginUser.rejected]: (state, { payload }) => {
      console.log("payload", payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
  },
});

export const { clearState } = authSlice.actions;

export default authSlice.reducer;
