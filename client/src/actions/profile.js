import axios from "axios";
import { setAlert } from "./alert";
import {
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  GET_REPOS,
  AVATAR_UPDATE_SUCCESS,
  UPDATE_USER_AVATAR_IN_POSTS,
  UPDATE_AUTH_AVATAR,
} from "./types";

// Get current user's profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Error fetching profile", "danger"));
  }
};

// Get all profile
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE }); // Clear current profile before fetching all profiles
  try {
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Error fetching profile", "danger"));
  }
};

// Get profile by user ID
export const getProfileById = userId => async (dispatch) => {
  
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    console.log(
      `Action: getProfileById(${userId}) - API Response Data (before dispatch):`,
      res.data
    ); // Keep this one
    console.log(
      `Action: getProfileById(${userId}) - Preparing to dispatch GET_PROFILE with payload:`,
      res.data
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert("Error fetching profile", "danger"));
  }
};

// Get GitHub repos of a user
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      console.log('No valid GitHub username provided, dispatching empty repos.');
      dispatch({
        type: GET_REPOS,
        payload: [], 
      });
      return; 
    }

    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
   
    dispatch({
      type: GET_REPOS,
      payload: [], 
    });
    console.error('Error fetching GitHub repos:', err);
  }
};

// Create or update profile
export const createProfile =
  (formData, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formData, config);

      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );

      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  };

// add experience to profile
export const addExperience = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};

// add education to profile
export const addEducation = (formData, navigate) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  } catch (err) {
    const errors = err.response?.data?.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: err.response?.statusText,
        status: err.response?.status,
      },
    });
  }
};

// Delete experience from profile
export const deleteExperience = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This action cannot be undone.")) {
    try {
      const res = await axios.delete(`/api/profile/experience/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  }
};

// Delete education from profile
export const deleteEducation = (id) => async (dispatch) => {
  if (window.confirm("Are you sure? This action cannot be undone.")) {
    try {
      const res = await axios.delete(`/api/profile/education/${id}`);

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education Removed", "success"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  }
};

// Delete account and profile

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This action cannot be undone.")) {
    try {
      await axios.delete("/api/profile");

      dispatch({type: CLEAR_PROFILE,});
      dispatch({type: ACCOUNT_DELETED,});
      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: err.response?.statusText,
          status: err.response?.status,
        },
      });
    }
  }
};

// Upload or Update Avatar
export const uploadAvatar = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };

    const res = await axios.post('/api/profile/avatar', formData, config);
    
    console.log('🚀 Avatar upload response:', res.data); // Debug log

    // Update profile/user avatar
    dispatch({
      type: AVATAR_UPDATE_SUCCESS, // Make sure this exists in your types.js
      payload: res.data.avatar // Just the avatar URL
    });

    // Update avatar in all posts by this user
    // Make sure your backend returns userId or use auth.user._id
    const userId = res.data.userId || res.data.user || res.data._id;
    if (userId && res.data.avatar) {
      dispatch(updateUserAvatarInPosts(userId, res.data.avatar));
    }

    // Update in auth state
    if (res.data.avatar) {
      dispatch(updateAuthAvatar(res.data.avatar));
    }

    dispatch(setAlert('Avatar Updated Successfully', 'success'));
    
  } catch (err) {
    console.error('❌ Avatar upload error:', err.response?.data); // Debug log
    
    const errors = err.response?.data?.errors;
    const errorMsg = err.response?.data?.msg;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    } else if (errorMsg) {
      dispatch(setAlert(errorMsg, 'danger'));
    } else {
      dispatch(setAlert('Avatar upload failed', 'danger'));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { 
        msg: err.response?.statusText || 'Upload failed', 
        status: err.response?.status || 500
      }
    });
  }
};


export const updateUserAvatarInPosts = (userId, newAvatar) => (dispatch) => {
  dispatch({
    type: UPDATE_USER_AVATAR_IN_POSTS,
    payload: { userId, newAvatar },
  });
};

// Update avatar in auth state
export const updateAuthAvatar = (newAvatar) => (dispatch) => {
  dispatch({
    type: UPDATE_AUTH_AVATAR,
    payload: newAvatar,
  });
};