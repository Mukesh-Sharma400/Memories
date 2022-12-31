import React, { useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likePost, deletePost } from "../actions/posts";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const userId = JSON.parse(localStorage.getItem("profile"));
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));
    navigate(`/posts/${post._id}`);
  };

  const EditTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Edit this Memory
    </Tooltip>
  );

  const NameTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click to see more
    </Tooltip>
  );

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <i className="bi bi-hand-thumbs-up-fill" />
          &nbsp;
          {post.likes.length > 2
            ? `You and ${post.likes.length - 1} others`
            : `${post.likes.length} like${post.likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <i className="bi bi-hand-thumbs-up" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <i className="bi bi-hand-thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div className="col text-start">
      <div className="card mycard" style={{ height: "440px" }}>
        <div className="postimage">
          <img
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="card-img "
            // style={{ height: "300px" }}
            alt="..."
          />
        </div>
        <div className="card-img-overlay ">
          <h5 className="card-title text-light">
            {post.name}{" "}
            {(userId?.result?.googleId === post?.creator ||
              userId?.result?._id === post?.creator) && (
              <span
                className="three--dots"
                onClick={() => setCurrentId(post._id)}
              >
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 400 }}
                  overlay={EditTooltip}
                >
                  <i className="bi bi-pencil-square"></i>
                </OverlayTrigger>
              </span>
            )}
          </h5>
          <p className="card-text">
            <small className="text-light">
              {moment(post.createdAt).fromNow()}
            </small>
          </p>
        </div>
        <div className="card-body">
          <small>
            {post.tags.map((tag) => (
              <span className="badge rounded-pill text-bg-info me-1 fw-light">
                #{tag}
              </span>
            ))}
          </small>
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={NameTooltip}
          >
            <h5
              className="card-title mt-2 mycard-title text-truncate"
              onClick={openPost}
              style={{ maxwidth: "150px" }}
            >
              {post.title}
            </h5>
          </OverlayTrigger>
          <p className="card-text mymessage text-muted">{post.message}</p>
        </div>
        <div className="d-flex justify-content-between card-footer">
          <button
            type="button"
            className="btn btn-sm btn-primary"
            disabled={!userId?.result}
            onClick={handleLike}
          >
            <Likes />
          </button>
          {(userId?.result?.googleId === post?.creator ||
            userId?.result?._id === post?.creator) && (
            <button
              type="button"
              className="btn btn-sm btn-outline-danger"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <i className="bi bi-trash-fill"></i> Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
