import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../actions/posts";
import Form from "../components/Form";
import Posts from "../components/Posts";
import Paginate from "../components/Pagination";

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
  const [tags] = useState([]);

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
  }, [currentId, dispatch, page]);

  return (
    <div className="container-xxl mtt">
      <div className="row pt-3">
        <div className="col-lg-8">
          <Posts setCurrentId={setCurrentId} />
        </div>
        <div className="col-lg-4">
          <div className="sticky-top">
            <div className="input-group mb-3">
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="btn btn-warning"
                type="button"
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
    </div>
  );
};

export default Home;
