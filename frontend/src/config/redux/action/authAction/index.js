import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

//async thunk for user login

export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/user/login", {
        email: user.email,
        password: user.password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      } else {
        return thunkAPI.rejectWithValue({
          message: "Login failed. No token received.",
        });
      }

      return thunkAPI.fulfillWithValue(response.data.token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed. Please try again." }
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const request = await clientServer.post("/user/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        username: user.username,
      });

      return request.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || {
          message: "Registration failed. Please try again.",
        }
      );
    }
  }
);