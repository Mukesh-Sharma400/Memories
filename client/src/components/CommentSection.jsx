import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { commentPost } from "../actions/posts";

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const handleComment = async () => {
    const newComments = await dispatch(
      commentPost(`${user?.result?.name}: ${comment}`, post._id)
    );
    setComment("");
    setComments(newComments);
  };

  return (
    <div className="row mt-3">
      <div className="col-6">
        <p className="fw-bold fs-4">Comments:</p>
        <div className="mycomments">
          {comments?.map((c, i) => (
            <p key={i}>
              <strong>{c.split(": ")[0]}</strong>:{c.split(":")[1]}
            </p>
          ))}
        </div>
      </div>
      <div className="col-6">
        {user?.result?.name ? (
          <div>
            <p className="fw-bold fs-4">Write a Comment:</p>
            <div style={{ width: "95%" }}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="4"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a Comment here..."
              ></textarea>
            </div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              disabled={!comment.length}
              onClick={handleComment}
            >
              Comment
            </button>
          </div>
        ) : (
          <div>
            <p className="fw-bold fs-4">Write a Comment:</p>
            <p className="lead text-muted">
              Please Sign In to Write a Comment!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
