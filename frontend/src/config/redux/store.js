 import { configureStore } from "@reduxjs/toolkit";
//  STEPS FOR STATE MANAGEMENT...

//  * Submit an action
//  * Handle the action in a reducer
//  * Register here -> reducer


export const store = configureStore({
    reducer : {
        auth : authReducer
    }
})

export default store;