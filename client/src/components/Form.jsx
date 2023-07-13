import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { createPost, updatePost } from "../actions/posts";
import useAutosave from "./useAutosave";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("Profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [autoSavedData, setAutoSavedData] = useAutosave(postData);

  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((message) => message._id === currentId)
      : null
  );

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(
          currentId,
          { ...autoSavedData, name: user?.result?.name },
          navigate
        )
      );
    } else {
      dispatch(
        createPost({ ...autoSavedData, name: user?.result?.name }, navigate)
      );
    }
    clear();
  };

  useEffect(() => {
    if (post) setAutoSavedData(post);
  }, [setAutoSavedData, post]);

  if (!user?.result?.name) {
    return (
      <div className="bg-light border border-danger p-3 rounded-3 lead text-center">
        <p className="text-danger mb-0">
          Please Log In to Create your Own Posts
        </p>
      </div>
    );
  }

  return (
    <form
      className="p-2 p-md-3 border rounded-3 bg-body-tertiary"
      onSubmit={handleSubmit}
    >
      <h4 className="text-center">
        {currentId ? `Editing "${post.title}"` : "Create Post"}
      </h4>
      <div className="row">
        <div className="col-12 mb-3">
          <input
            type="text"
            className="form-control"
            id="inputTitle"
            placeholder="Enter Title Here..."
            value={autoSavedData.title}
            onChange={(e) =>
              setAutoSavedData({ ...autoSavedData, title: e.target.value })
            }
          />
        </div>
        <div className="col-12 mb-3">
          <textarea
            rows={3}
            type="text"
            className="form-control"
            id="inputMessage"
            placeholder="Enter Message Here..."
            value={autoSavedData.message}
            onChange={(e) =>
              setAutoSavedData({ ...autoSavedData, message: e.target.value })
            }
          />
        </div>
        <div className="col-12 mb-3">
          <div className="form-floating">
            <input
              type="message"
              className="form-control"
              id="floatingTags"
              placeholder="Tags (comma separated)"
              value={autoSavedData.tags}
              onChange={(e) =>
                setAutoSavedData({
                  ...autoSavedData,
                  tags: e.target.value.split(","),
                })
              }
            />
            <label htmlFor="floatingTags">Tags (comma separated)</label>
          </div>
        </div>
        <div className="col-12 mb-3">
          <div className="input-group input-group-sm">
            <FileBase
              type="file"
              accept="image/*"
              className="form-control"
              id="fileInput"
              multiple={false}
              onDone={({ base64 }) =>
                setAutoSavedData({ ...autoSavedData, selectedFile: base64 })
              }
            />
          </div>
        </div>
        <div className="col-12 d-flex justify-content-between">
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
      </div>
    </form>
  );
};

export default Form;
