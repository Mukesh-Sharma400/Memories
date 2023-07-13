import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth";

const initialState = {
  email: "",
  password: "",
};

const LogIn = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signin(form, navigate));
  };

  return (
    <div className="container-xxl col-xl-10 col-xxl-8 px-4 py-5 mtt">
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1 mb-3 text-white">Memories</h1>
          <p className="col-lg-10 fs-4 text-white">
            Memory is the treasure house of the mind wherein the monuments
            thereof are kept and preserved.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
            onSubmit={handleSubmit}
          >
            <div className="form-floating mb-3">
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                id="floatingEmail"
                placeholder="Email Address"
                onChange={handleChange}
              />
              <label htmlFor="floatingEmail">Email Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                id="floatingPassword"
                placeholder="Password"
                onChange={handleChange}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="row">
              <div className="col">
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Log In
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
