import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import * as actionType from "../constants/actionTypes";
import memories from "../images/memories.png";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/auth");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <div>
      <header className="mycontainer d-flex justify-content-between align-items-center p-3 bg-white my-3 rounded-3">
        <div className="d-flex">
          <Link to="/" className="d-flex text-decoration-none text-dark">
            <h2 className="m-auto">Memories</h2>
            <img className="header--img" src={memories} alt="memories" />
          </Link>
        </div>
        <div>
          {user?.result ? (
            <div className="d-flex">
              {user?.result.image ? (
                <div className="text-center fs-3 text-white">
                  <img
                    className="avatar"
                    src={user.result.image}
                    // alt={user?.result.name.charAt(0)}
                    alt=""
                  />
                </div>
              ) : (
                <div className="text-center fs-3 text-white">
                  <p className="avatar mb-0">{user?.result.name.charAt(0)}</p>
                </div>
              )}
              <p className="m-auto mx-3">{user?.result.name}</p>
              <button type="button" className="btn btn-danger" onClick={logout}>
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <Link to="/auth">
                <button type="button" className="btn btn-primary">
                  Sign In
                </button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;
