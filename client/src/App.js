import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/Editprofile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import NotFound from "./components/layout/NotFound";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />{" "}
            <Route
              path="/*"
              element={
                <section className="container">

                  <Alert />{" "}
                  <Routes>
                    {" "}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profiles" element={<Profiles />} />
                    <Route path="/profile/:id" element={<Profile />} />
                    {/* Private Routes - Nested Routes */}
                    <Route element={<PrivateRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route
                        path="/create-profile"
                        element={<CreateProfile />}
                      />
                      <Route path="/edit-profile" element={<EditProfile />} />
                      <Route
                        path="/add-experience"
                        element={<AddExperience />}
                      />
                      <Route path="/add-education" element={<AddEducation />} />
                      <Route path="/posts" element={<Posts />} />
                      <Route path="/posts/:id" element={<Post />} />
                      {/* Add more private routes here later if needed */}
                    </Route>
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </section>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
