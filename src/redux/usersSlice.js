import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/api";

export const getUsersAsync = createAsyncThunk("users/getUsers", async () => {
  const { data } = await api.get("/users");
  return data;
});

export const getUserAsync = createAsyncThunk("users/getUser", async (id) => {
  try {
      const { data } = await api.get(`/user/${id}`);
      return data.users;
    
  } catch (err) {
    return err
    
  }

});
export const addUserAsync = createAsyncThunk(
  "users/addUserAsync",
  async (payload) => {
    const resp = await api.post("/users", payload);
    console.log(resp,"ADD")
    if (resp.status === 200) {
      const user = resp.data;
      return user;
    }
  }
);

export const toggleStatusAsync = createAsyncThunk(
  "users/statusUserAsync",
  async (payload) => {
    const resp = await fetch(`http://localhost:8080/users/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: payload.status }),
    });

    if (resp.ok) {
      const user = await resp.json();
      return { user };
    }
  }
);

export const deleteUserAsync = createAsyncThunk(
  "users/deleteUserAsync",
  async (payload) => {
    const resp = await api.delete(`/users/${payload}`)
    if (resp.status === 200) {
      return { id: payload };
    }
  }
);
export const editUserAsync = createAsyncThunk(
  "users/editUserAsync",
  async (payload) => {
    const resp = await api.delete(`/users/${payload}`);
    if (resp.status === 200) {
      return { id: payload };
    }
  }
);
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
  },
  reducers: {
  },
  extraReducers: {
    [getUsersAsync.fulfilled]: (state, action) => {
      state.users = action.payload
    },
    [getUserAsync.fulfilled]: (state, action) => {
      return action.payload.user;
    },
    [addUserAsync.fulfilled]: (state, action) => {
       state.users = [...state.users, action.payload];
    },
    [toggleStatusAsync.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (user) => user.id === action.payload.user.id
      );
      state[index].status = action.payload.user.status;
    },
    [deleteUserAsync.fulfilled]: (state, action) => {
    state.users=  state.users.filter((user) => user._id !== action.payload.id);
    },
  },
});


export default usersSlice.reducer;
