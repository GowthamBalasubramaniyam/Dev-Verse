// client/src/components/dashboard/DashboardActions.js

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DashboardActions = ({ auth: { user } }) => {
  const defaultAvatar = "/uploads/avatars/default1.png";

  const getAvatarSource = (avatar) => {
    // Check if avatar is null, undefined, or just empty spaces
    if (!avatar || (typeof avatar === 'string' && avatar.trim() === "")) {
       return defaultAvatar;
    }
    
    // 1. Handle Base64 (your console showed these strings earlier)
    if (avatar.startsWith("data:image")) return avatar;

    // 2. Format file paths: fix backslashes and ensure a leading slash
    const formattedPath = avatar.replace(/\\/g, "/");
    return formattedPath.startsWith("/") ? formattedPath : `/${formattedPath}`;
  };
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
          className="round-img avatar-small"
          src={getAvatarSource(user.avatar)}
          alt="User Avatar"
          // Safety fallback if the path in DB is old/broken
          onError={(e) => { e.target.src = defaultAvatar; }}
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
