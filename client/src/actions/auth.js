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
  if (localStorage.token) {
    setAuthToken(localStorage.token); // set token in axios headers
  }

  try {
    const res = await API.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = { headers: { "Content-Type": "application/json" } };
    const body = JSON.stringify({ name, email, password });

    try {
      const res = await API.post("/api/users", body, config);
      localStorage.setItem("token", res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      setAuthToken(res.data.token); // ✅ set token before loading user
      dispatch(loadUser()); // ✅ load user after registration
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const body = JSON.stringify({ email, password });

  try {
    const res = await API.post("/api/auth", body, config);
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    setAuthToken(res.data.token); // ✅ set token before loading user
    dispatch(loadUser()); // ✅ load user after login
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  setAuthToken(null); // remove token from axios headers
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
