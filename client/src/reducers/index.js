import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post"; 

export default combineReducers({
    alert,
    auth,
    profile,
    post
}); 

// This file combines all the reducers in the Redux store
// It imports the alert reducer and combines it using combineReducers from Redux