import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Proflieitem = ({
  profile: {
    // These are coming directly from your Java DTO JSON now
    id, // Note: This is the Profile ID. Ensure your DTO also sends 'userId'
    name,
    avatar,
    status,
    company,
    location,
    skills,
    userId // You should add this to your DTO to link the button correctly
  },
}) => {
  const defaultAvatar = '/uploads/avatars/default1.png';

  if (!name) return null;

  // 2. Updated logic to handle the plural path and empty strings
  const getAvatarSrc = () => {
    if (!avatar || (typeof avatar === 'string' && avatar.trim() === "")) {
      return defaultAvatar;
    }
    if (avatar.startsWith('data:image')) return avatar; 
    
    // Normalize path and ensure leading slash
    const formattedPath = avatar.replace(/\\/g, '/');
    return formattedPath.startsWith('/') ? formattedPath : `/${formattedPath}`;
  };

  return (
    <div className="profile bg-light">
      <img src={getAvatarSrc()} alt={name} className="round-img"
      onError={(e) => { e.target.src = defaultAvatar;}} />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        {/* Link to the user's ID, not the profile ID */}
        <Link to={`/profile/${userId || id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {skills && skills.slice(0, 5).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check" /> {skill}
          </li>
        ))}
      </ul> 
    </div>
  );
};

Proflieitem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default Proflieitem;
