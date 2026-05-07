import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {

  const defaultAvatar = '/uploads/avatars/default1.png';

  const getAvatarSrc = (avatarData) => {
    if (!avatarData || avatarData.trim() === '') return defaultAvatar;
    if (avatarData.startsWith('data:image')) return avatarData;
    
    // If it's a stored path, ensure it has a leading slash
    return avatarData.startsWith('/') ? avatarData : `/${avatarData}`;
  };
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user.id || user}`}>
          <img src={getAvatarSrc(user.avatar || avatar)} alt="" className="round-img" onError={(e) => { 
            console.log("Avatar failed to load, falling back to default.");
            e.target.src = defaultAvatar;}}/>
          <h4>{user.name || name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Posted on {format(new Date(date), "MMMM dd, yyyy")}
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={(e) => addLike(id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up"></i>{" "}
              <span>{likes.length > 0 && <span> {likes.length} </span>}</span>
            </button>
            
            <Link to={`/posts/${id}`} className="btn btn-primary">
              Discussion {comments.length > 0 && <span>{comments.length}</span>}
            </Link>
            {!auth.loading && (user.id || user) === auth.user.id && (
              <button
                onClick={(e) => deletePost(id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
