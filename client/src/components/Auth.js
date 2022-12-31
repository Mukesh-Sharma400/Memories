import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signin, signup } from "../actions/auth";
import { AUTH } from "../constants/actionTypes";
import { useDispatch } from "react-redux";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const switchMode = (e) => {
    e.preventDefault();
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    if (isSignup) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };

  const googleSuccess = (response) => {
    const dedcoded = jwtDecode(response.credential);
    console.log(dedcoded);
    var base64Url = response.credential.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const { name, picture, sub } = JSON.parse(jsonPayload);
    const result = {
      _id: sub,
      name: name,
      image: picture,
    };
    // const result = res?.profileObj;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11a2VzaEBnbWFpbC5jb20iLCJpZCI6IjYzYTE1NWMxNzE5MTQ0ZDgzYWZiMzgyOCIsImlhdCI6MTY3MjM5OTQwNCwiZXhwIjoxNjcyNDAzMDA0fQ.4CzA26cBV5lTir2-vZ_7l3bfkqDmw1xNJSGGLTqpYus";
    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => {
    alert("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <div>
      <div className="container p-4 border rounded-3 bg-light shadow w-50 mt-3 mb-2">
        <form onSubmit={handleSubmit}>
          <h2 className="text-center mb-4">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          {isSignup && (
            <>
              <div className="input-group mb-3">
                <span className="input-group-text">
                  <i className="bi bi-person-circle text-primary"></i>
                </span>
                <div className="form-floating">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control"
                    id="floatingFirstName"
                    placeholder="First Name"
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingText">First Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control"
                    id="floatingLastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                  />
                  <label htmlFor="floatingText">Last Name</label>
                </div>
              </div>
            </>
          )}
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-envelope-fill text-danger"></i>
            </span>
            <div className="form-floating">
              <input
                type="email"
                name="email"
                className="form-control"
                id="floatingEmail"
                placeholder="Email"
                onChange={handleChange}
              />
              <label htmlFor="floatingEmail">Email</label>
            </div>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="bi bi-pass-fill text-warning"></i>
            </span>
            <div className="form-floating">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <span className="input-group-text">
              <button
                type="button"
                className="btn btn-light"
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <i className="bi bi-eye-slash-fill"></i>
                ) : (
                  <i className="bi bi-eye-fill"></i>
                )}
              </button>
            </span>
          </div>
          {isSignup && (
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-check-circle-fill text-success"></i>
              </span>
              <div className="form-floating">
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                />
                <label htmlFor="floatingConfirmPassword">
                  Confirm Password
                </label>
              </div>
            </div>
          )}
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            {isSignup ? "SIGN UP" : "SIGN IN"}
          </button>
          {isSignup ? (
            <div></div>
          ) : (
            <div className="d-flex justify-content-center mt-3">
              <GoogleLogin
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy="single_host_origin"
                render={(renderProps) => (
                  <button
                    type="button"
                    className="btn"
                    onClick={renderProps.onClick}
                  ></button>
                )}
              />
            </div>
          )}
          <hr className="my-4" />
          <div className="d-flex justify-content-center">
            <button
              className="w-80 btn btn-lg btn-success"
              onClick={switchMode}
            >
              {isSignup
                ? "Already have an account? Sign In"
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
