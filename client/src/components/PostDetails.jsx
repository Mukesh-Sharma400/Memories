import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../actions/posts";
import CommentSection from "./CommentSection";

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(
        getPostsBySearch({ search: "none", tags: post?.tags.join(",") })
      );
    }
  }, [post]);

  if (!post) return null;

  const openPost = (_id) => navigate(`/posts/${_id}`);

  if (isLoading) {
    return (
      <div className="text-center">
        <button className="btn btn-primary btn-lg" type="button" disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Loading...
        </button>
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div className="mt-2 mb-5">
      <div className="mycontainer col-xxl-8 px-4 py-2 bg-light rounded-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-4">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src={
                post.selectedFile ||
                "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
              }
              alt={post.title}
              className="d-block mx-lg-auto img-fluid rounded shadow-lg"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h3 className="fw-bold lh-1 mb-3">{post.title} </h3>
            <p className="badge rounded-pill text-bg-info fs-6 fw-light me-2">
              {post.tags.map((tag) => `#${tag} `)}
            </p>
            <p className="badge rounded-pill text-bg-warning fs-6 fw-light">
              Likes: {post.likes.length}
            </p>
            <p>
              <span className="fw-bold">Posted by: </span> {post.name},{" "}
              <span className="fw-bold">Created at:</span>{" "}
              {moment(post.createdAt).fromNow()}
            </p>
            <p className="postmessage">{post.message}</p>
          </div>
          <hr className="my-4" />
          <CommentSection post={post} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className="mycontainer">
          <h3 className="bg-light bg-gradient rounded-pill px-5 my-3 myheading">
            You Might Also Like:
          </h3>
          {recommendedPosts.map(
            ({ title, name, message, likes, selectedFile, _id }) => (
              <div onClick={() => openPost(_id)} key={_id}>
                <div className="card mb-3 recommendedcards">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={selectedFile}
                        className="img-fluid rounded-start"
                        alt=""
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text mymessage">{message}</p>
                        <p className="card-text">
                          <small className="text-muted">
                            Likes: {likes.length}
                          </small>
                        </p>
                        <p className="card-text">
                          <small className="text-muted">
                            Posted by: {name}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PostDetails;
