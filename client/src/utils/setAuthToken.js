import API from "../api";

const setAuthToken = (token) => {
  // Ensure the token is a real string and not a "ghost" value from a failed request
  if (token && token !== "undefined" && token !== "null" && typeof token === 'string') {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // If invalid, clear everything to stop malformed requests
    delete API.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;