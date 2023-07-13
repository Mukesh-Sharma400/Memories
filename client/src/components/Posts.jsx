import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";
import nopost from "../images/no_posts.svg";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if (!isLoading && posts.length === 0) {
    return (
      <div className="bg-light py-5 rounded text-center">
        <h1 className="display-5 fw-bold">No Posts to Show</h1>
        <div className="col-lg-6 mx-auto">
          <img className="img-fluid" src={nopost} alt="No Post to Show" />
        </div>
      </div>
    );
  }

  return isLoading ? (
    <button className="btn btn-primary btn-lg" type="button" disabled>
      <span
        className="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>{" "}
      Loading...
    </button>
  ) : (
    <div className="row row-cols-1 row-cols-md-2 g-3 mb-5">
      {posts.map((post) => (
        <div key={post._id} className="col">
          <Post post={post} setCurrentId={setCurrentId} />
        </div>
      ))}
    </div>
  );
};

export default Posts;
