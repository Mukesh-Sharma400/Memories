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

  const renderPaginationItems = () => {
    const active = Number(page) || 1;
    const items = [];
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
    return items;
  };

  const active = Number(page) || 1;
  const isFirstPage = active === 1;
  const isLastPage = active === numberOfPages || numberOfPages === 0;

  return (
    <div className="mt-3">
      <Pagination>
        <Pagination.Prev disabled={isFirstPage}>
          <Link
            className="text-decoration-none"
            to={`/posts?page=${active - 1}`}
          >
            &laquo;
          </Link>
        </Pagination.Prev>
        {renderPaginationItems()}
        <Pagination.Next disabled={isLastPage}>
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
