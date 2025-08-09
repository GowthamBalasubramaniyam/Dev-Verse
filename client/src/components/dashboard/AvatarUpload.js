// client/src/components/dashboard/AvatarUpload.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { uploadAvatar } from "../../actions/profile";
import { setAlert } from "../../actions/alert";

const AvatarUpload = ({ uploadAvatar, setAlert }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("Choose a new avatar...");

  const onFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const onUploadClick = () => {
    if (!file) {
      setAlert("Please select an image file to upload.", "danger");
      return;
    }
    const formData = new FormData();
    formData.append("avatar", file);
    uploadAvatar(formData);
    setFile(null);
    setFileName("Choose a new avatar...");
  };

  return (
    <div className="my-2">
      <h3 className="my-1">Update Your Avatar</h3>

      {/* No <form> tag here */}
      <div className="avatar-upload-group">
        <i className="fas fa-upload" />

        <label htmlFor="avatar-upload-input" className="file-label">
          {fileName}
        </label>

        <input
          type="file"
          id="avatar-upload-input"
          className="file-input-hidden"
          onChange={onFileChange}
          accept="image/png, image/jpeg, image/gif"
        />

        {/* 
          --- THIS IS THE CRITICAL FIX ---
          We are using a <button> element with type="button".
          This prevents it from acting as a submit button for the parent form.
        */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={onUploadClick}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

AvatarUpload.propTypes = {
  uploadAvatar: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { uploadAvatar, setAlert })(AvatarUpload);
