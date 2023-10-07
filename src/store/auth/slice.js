import { createSlice } from "@reduxjs/toolkit";
import { createUser, userLogin, updateUser } from "./thunks";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    status: "init", // "loading", "success", "error"
    userProfile: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.userProfile = null;
      localStorage.removeItem("user");
    },
    setAuth: (state) => {
      state.isAuth = true;
      state.userProfile = JSON.parse(localStorage.getItem("user"));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(userLogin.fulfilled, (state, action) => {
        state.userProfile = action.payload.user;
        state.status = "success";
        state.isAuth = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userProfile = action.payload.user;
        state.isAuth = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const authState = authSlice.reducer;
export const authActions = {
  ...authSlice.actions,
  createUser,
  userLogin,
  updateUser,
};
