import * as actionTypes from "../constants/actionTypes";

const initialState = {
  authData: null,
  loading: false,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("Profile", JSON.stringify({ ...action.data }));
      return {
        ...state,
        authData: action.data,
        loading: false,
        errors: null,
      };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        authData: null,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
};

export default authReducer;
