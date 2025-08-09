import React, {Fragment, useEffect} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, useParams} from "react-router-dom";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/post";
import PostComment from "./CommentForm";   
import CommentItem from "./CommentItem"; 

const Post = ({getPost, post:{post , loading}, match}) => {
    const { id } = useParams();
    useEffect(() => {
        getPost(id);
    }, [getPost, id]);
    if (loading || post === null) {
        return <Spinner />;
    }
    return (
        <Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <div className="post-item">
                <PostItem post={post} showActions={false} />
                <PostComment postId={post._id} />
            </div>
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
        </Fragment>
    );
};

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, {getPost})(Post);
