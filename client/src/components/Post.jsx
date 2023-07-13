import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import { likePost, deletePost } from "../actions/posts";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);
  const userId = JSON.parse(localStorage.getItem("Profile"));
  const hasLikedPost = post?.likes?.find((like) => like === userId);

  const openPost = () => {
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

  const handleLike = () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    const likesLength = likes.length;
    if (likesLength > 0) {
      const hasUserLiked = likes.find((like) => like === userId);
      const othersCount = likesLength - 1;
      if (hasUserLiked) {
        return (
          <>
            <i className="bi bi-hand-thumbs-up-fill" />
            &nbsp;
            {othersCount > 0
              ? `You and ${othersCount} others`
              : "You like this"}
          </>
        );
      } else {
        return (
          <>
            <i className="bi bi-hand-thumbs-up" />
            &nbsp;
            {likesLength} {likesLength === 1 ? "Like" : "Likes"}
          </>
        );
      }
    }
    return (
      <>
        <i className="bi bi-hand-thumbs-up" />
        &nbsp;Like
      </>
    );
  };

  return (
    <div className="col-md text-start">
      <div className="card mycard" style={{ height: "440px" }}>
        <div className="postimage">
          <img
            src={
              post.selectedFile ||
              "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            }
            className="card-img"
            alt="..."
          />
        </div>
        <div className="card-img-overlay">
          <h5 className="card-title text-light">
            {post.name}{" "}
            {(userId?.result?.googleId === post?.creator ||
              userId?.result?._id === post?.creator) && (
              <span
                className="edit--btn"
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
              <span
                className="badge rounded-pill text-bg-info me-1 fw-light"
                key={tag}
              >
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
              style={{ maxWidth: "100%" }}
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
