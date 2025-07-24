import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import { Link, useParams } from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout"; 
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    console.log(`Frontend: Profile component attempting to fetch ID: '${id}'`);
    getProfileById(id);
  }, [getProfileById, id]);


  if (profile === null || loading) {
    return <Spinner />;
  }

  
  if (!profile[0]) {
    return (
      <Fragment>
        <Link to="/profiles" className="btn btn-light">
          Back to Profiles
        </Link>
        <h4>Profile not found.</h4>
      </Fragment>
    );
  }

  const currentProfile = profile[0];

  return (
    <Fragment>
      <Link to="/profiles" className="btn btn-light">
        Back to Profiles
      </Link>
      {auth.isAuthenticated &&
        !auth.loading &&
        auth.user &&
        currentProfile.user && 
        auth.user._id === currentProfile.user._id && ( 
          <Link to="/edit-profile" className="btn btn-dark">
            Edit Profile
          </Link>
        )}
      <div className="profile-grid my-1">
        {" "}
        <ProfileTop profile={currentProfile} />
        <ProfileAbout profile={currentProfile} /> 
        <div className="profile-exp bg-white p-2">
          {" "}
          <h2 className="text-primary">Experience</h2>
          {currentProfile.experience && currentProfile.experience.length > 0 ? (
            <Fragment>
              {currentProfile.experience.map((experience) => (
                <ProfileExperience
                  key={experience._id}
                  experience={experience}
                />
              ))}
            </Fragment>
          ) : (
            <h4>No experience credentials</h4>
          )}
        </div>
        <div className="profile-edu bg-white p-2">
          {" "}
          <h2 className="text-primary">Education</h2>
          {currentProfile.education && currentProfile.education.length > 0 ? (
            <Fragment>
              {currentProfile.education.map((education) => (
                <ProfileEducation key={education._id} education={education} />
              ))}
            </Fragment>
          ) : (
            <h4>No education credentials</h4>
          )}
        </div>
        {currentProfile.githubusername && (
          <ProfileGithub username={currentProfile.githubusername} />
        )}
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired, 
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
