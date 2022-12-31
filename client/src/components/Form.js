import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const clear = () => {
    setCurrentId(0);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId === null) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
      clear();
    } else {
      dispatch(
        updatePost(
          currentId,
          { ...postData, name: user?.result?.name },
          navigate
        )
      );
      clear();
    }
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  if (!user?.result?.name) {
    return (
      <div className="bg-light p-3 rounded-3 mt-3 lead">
        <p>
          Please Sign In to Create your Own Memories and Like other's Memories.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-light p-3 rounded-3 mt-3">
      <form onSubmit={handleSubmit}>
        <h2 className="text-center">
          {currentId ? `Editing "${post.title}"` : "Create a Memory"}
        </h2>
        <div className="form-floating  mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingTitle"
            placeholder="Title"
            value={postData.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <label htmlFor="floatingTitle">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingMessage"
            placeholder="Message"
            value={postData.message}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          />
          <label htmlFor="floatingMessage">Message</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="message"
            className="form-control"
            id="floatingTags"
            placeholder="Tags (coma separated)"
            value={postData.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(",") })
            }
          />
          <label htmlFor="floatingTags">Tags (coma separated)</label>
        </div>
        <div className="input-group-sm mb-3">
          <FileBase
            type="file"
            accept="image/*"
            className="form-control"
            id="inputGroupFile02"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-success mx-1 w-100">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-outline-danger mx-1 w-100"
            onClick={clear}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
