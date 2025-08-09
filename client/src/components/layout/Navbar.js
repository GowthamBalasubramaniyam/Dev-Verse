import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { Fragment } from "react/jsx-runtime";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const handleImageError = (e) => {
    console.log("Favicon failed to load, using fallback");
    e.target.src = "/favicon.ico"; // Fallback to favicon.ico
  };

  const authLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{" "}
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">
          <i className="fas fa-laptop-code" />{" "}
          <span className="hide-sm">Developers</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-comments" />{" "}
          <span className="hide-sm">Posts</span>
        </Link>
      </li>

      <li>
        <a
          href="#!"
          onClick={(e) => {
            e.preventDefault();
            logout();
          }}
        >
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-light">
      <h1>
        <Link to="/">
          <img
            src="/favicon-96x96.png"
            className="favicon-icon"
            alt="Dev-Verse Icon"
            onError={handleImageError}
          />{" "}
          <strong>Dev-Verse</strong>
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
