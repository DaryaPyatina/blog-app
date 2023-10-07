import { createAsyncThunk } from "@reduxjs/toolkit";
import { postUser, login, putUser } from "../../services";

export const createUser = createAsyncThunk("auth/createUser", async (body) => {
  const data = await postUser(body);
  return data;
});

export const userLogin = createAsyncThunk("auth/userLogin", async (body) => {
  const data = await login(body);
  return data;
});

export const updateUser = createAsyncThunk("auth/updateUser", async (body) => {
  const data = await putUser(body);
  return data;
});
