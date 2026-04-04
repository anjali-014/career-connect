const { createSlice } = require("@reduxjs/toolkit");
import { loginUser, registerUser } from "../../action/authAction";



const initialState = {
    user : [],
    isError : false,
    isSuccess : false,
    isLoading : false,
    loggedIn : false,
    message : "",
    profileFetched : false,
    connections : [],
    connetionRequests : [],
}


const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        reset : () => initialState,
        handleLoginUser : (state) => {
            state.message = "hello";
        }
    },
    extraReducers : (builder) => { 

        builder

        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.message = " Knocking the door...";
        })

        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.isError = false;
            state.message = "Welcome to LinkedIn!";

        })

        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.loggedIn = false;
            state.message = action.payload.message || "Login failed. Please try again.";
        })

        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.message = "Registering You...";
        })

        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.loggedIn = true;
            state.isError = false;
            state.message = "Registration successful! Welcome to LinkedIn!";
        })

        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.loggedIn = false;
            state.message = action.payload.message || "Registration failed. Please try again.";
        })

    }

});

export default authSlice.reducer;
