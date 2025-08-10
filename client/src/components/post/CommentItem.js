import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/post";

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user._id || user}`}>
        <img
          className="round-img"
          src={
            user.avatar ||
            avatar ||
            "//www.gravatar.com/avatar/9b473e5e0c6e0ae1e2a8708511284c66?s=200&r=pg&d=mm"
          }
          alt=""
        />
        <h4>{user.name || name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on {format(new Date(date), "MMMM dd, yyyy")}
      </p>
      {!auth.loading && (user._id || user) === auth.user._id && (
        <button
          onClick={(e) => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired, // Changed from number to string (MongoDB ObjectId)
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
