import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../actions/posts";
import Form from "./Form";
import Posts from "./Posts";
import Paginate from "./Pagination";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const [tags, setTags] = useState([]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim()) {
      dispatch(getPostsBySearch({ search }));
      navigate(`/posts/search?searchQuery=${search || "none"}`);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch(getPosts(page));
  }, [currentId, dispatch]);

  return (
    <div className="mycontainer text-center">
      <div className="row">
        <div className="col-sm-8">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="col-sm-4">
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-search"></i>
            </span>
            <input
              type="text"
              onKeyDown={handleKeyPress}
              name="search"
              className="form-control"
              placeholder="Search Memories"
              aria-label="Search Memories"
              aria-describedby="button-addon2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="btn btn-warning"
              type="button"
              id="button-addon2"
              onClick={searchPost}
            >
              Search
            </button>
          </div>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {!searchQuery && !tags.length && (
            <Paginate page={page} className="m-auto" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
