import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getGithubRepos } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    // Only fetch if a valid username (non-null, non-empty string) is provided.
    if (username && typeof username === "string" && username.trim() !== "") {
      getGithubRepos(username);
    } else {
      // If username is not valid or not provided,
      // the getGithubRepos action (as we updated it previously)
      // will dispatch GET_REPOS with an empty array.
      // So, no explicit action needed here for the `repos` state,
      // it will correctly become an empty array and trigger the `return null` below.
    }
  }, [getGithubRepos, username]);

  if (repos === null) {
    return (
      <div className="profile-github">
        {" "}
        <Spinner />
      </div>
    );
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">GitHub Repos</h2>
      {repos.map((repo) => (
        <div key={repo.id} className="repo bg-white p-1 my-1">
          <div>
            <h4>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <ul>
            <li className="badge badge-primary">
              Stars: {repo.stargazers_count}
            </li>
            <li className="badge badge-dark">
              Watchers: {repo.watchers_count}
            </li>
            <li className="badge badge-light">Forks: {repo.forks_count}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array,
  username: PropTypes.string,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
