import React from "react";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container">
      {/* Professional System Note */}
      <div 
        style={{ 
          backgroundColor: '#f8f9fa', 
          border: '1px solid #e9ecef', 
          borderRadius: '8px', 
          padding: '12px', 
          marginBottom: '20px', 
          textAlign: 'center',
          fontSize: '0.85rem',
          color: '#6c757d',
          maxWidth: '400px',
          margin: '0 auto 20px auto'
        }}
      >
        <i className="fas fa-server" style={{ marginRight: '8px', color: '#17a2b8' }}></i>
        <strong>System Note:</strong> Our cloud instance initializes on demand. Please allow up to 60 seconds for the first request to process.
      </div>

      <form className="register-form" onSubmit={onSubmit}>
        <h1 className="register-title">Welcome Back</h1>
        <p className="register-message">
          Sign in to access your developer dashboard
        </p>

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

        <button type="submit" className="register-submit">
          Sign In
        </button>

        <p className="register-signin">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);