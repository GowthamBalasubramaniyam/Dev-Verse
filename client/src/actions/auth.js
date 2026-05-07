import API from "../api"; // adjust path based on your folder structure
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    setAuthToken(token);
  } else {
    return dispatch({ type: AUTH_ERROR });
  }

  try {
    // FORCE the header here to ensure it's not null on the very first request
    const res = await API.get('/api/auth', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

//register
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await API.post("/api/users", body, config);

    // 1. Save to localStorage immediately
    localStorage.setItem("token", res.data.token);

    // 2. Update Axios headers BEFORE dispatching success
    setAuthToken(res.data.token);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data, // This contains the token and user info
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response?.data?.errors;
    const message = err.response?.data?.message;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else if (message) {
      dispatch(setAlert(message, "danger"));
    }

    dispatch({ type: REGISTER_FAIL });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ email, password });

  try {
    const res = await API.post("/api/auth/login", body, config);

    // 1. Save to localStorage immediately
    localStorage.setItem("token", res.data.token);

    // 2. Update Axios headers
    setAuthToken(res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const message = err.response?.data?.message;
    const errors = err.response?.data?.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    } else if (message) {
      dispatch(setAlert(message, "danger"));
    }

    dispatch({ type: LOGIN_FAIL });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  setAuthToken(null); // remove token from axios headers
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
