import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signup } from "../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const Register = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form, navigate));
  };

  return (
    <div className="container-xxl col-xl-10 col-xxl-8 px-4 py-5 mtt">
      <div className="col-md-10 mx-auto col-lg-7">
        <h1 className="text-center text-white">Create New Account</h1>
        <form
          className="p-4 p-md-5 border rounded-3 bg-body-tertiary"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                name="firstName"
                className="form-control form-control-lg mb-3"
                placeholder="First Name"
                aria-label="First Name"
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="lastName"
                className="form-control form-control-lg mb-3"
                placeholder="Last Name"
                aria-label="Last Name"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="email"
                name="email"
                className="form-control form-control-lg"
                placeholder="Email Address"
                aria-label="Email Address"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                name="password"
                className="form-control form-control-lg"
                placeholder="Password"
                aria-label="Password"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <button className="w-100 btn btn-lg btn-success" type="submit">
                Register
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
