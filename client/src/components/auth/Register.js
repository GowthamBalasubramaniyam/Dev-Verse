import React, { Fragment, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  // Redirect if registered
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      <form className="register-form" onSubmit={onSubmit}>
        <h1 className="register-title">Create Your Account</h1>
        <p className="register-message">
          Join our developer community and showcase your skills
        </p>

        <div className="form-group">
          <input
            type="text"
            className="form-input"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
          <span className="form-label">Name</span>
        </div>

        <div className="form-group">
          <input
            type="email"
            className="form-input"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <span className="form-label">Email Address</span>
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-input"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
          <span className="form-label">Password</span>
        </div>

        <div className="form-group">
          <input
            type="password"
            className="form-input"
            name="password2"
            value={password2}
            onChange={onChange}
            minLength="6"
            required
          />
          <span className="form-label">Confirm Password</span>
        </div>

        <button type="submit" className="register-submit">
          Create Account
        </button>

        <p className="register-signin">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
