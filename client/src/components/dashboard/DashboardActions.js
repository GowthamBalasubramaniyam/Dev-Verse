// client/src/components/dashboard/DashboardActions.js

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DashboardActions = ({ auth: { user } }) => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>

      {/* --- AVATAR DISPLAY --- */}
      {user && (
        <img
          // Replaced inline style with a class
          className="round-img avatar-small"
          src={user.avatar ? user.avatar : "/default-avatar.png"}
          alt="User Avatar"
        />
      )}
    </div>
  );
};

DashboardActions.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DashboardActions);
