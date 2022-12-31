import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!posts.length && !isLoading)
    return (
      <div className="bg-light py-5 rounded text-center">
        <h1 className="display-5 fw-bold">No Memories to Show</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead">
            " One of the best ways to make yourself happy in the present is to
            recall happy times from the past. Photos are a great memory-prompt,
            and because we tend to take photos of happy occasions, they weight
            our memories to the good. "
          </p>
        </div>
      </div>
    );

  return isLoading ? (
    <button className="btn btn-primary btn-lg" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  ) : (
    <div className="row row-cols-1 row-cols-md-2 g-3 mb-5">
      {posts.map((post) => (
        <div key={post._id}>
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
