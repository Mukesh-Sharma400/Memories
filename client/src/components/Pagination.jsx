import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  let active = Number(page) || 1;
  let items = [];

  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active}>
        <Link
          className="text-decoration-none bg-light rounded-circle px-2 m-0"
          to={`/posts?page=${number}`}
        >
          {number}
        </Link>
      </Pagination.Item>
    );
  }

  return (
    <div className="mt-3">
      <Pagination>
        <Pagination.Prev disabled={1 === active}>
          <Link
            className="text-decoration-none"
            to={`/posts?page=${active - 1}`}
          >
            &laquo;
          </Link>
        </Pagination.Prev>
        {items}
        <Pagination.Next disabled={numberOfPages === active}>
          <Link
            className="text-decoration-none"
            to={`/posts?page=${active + 1}`}
          >
            &raquo;
          </Link>
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default Paginate;
