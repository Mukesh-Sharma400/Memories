import * as actionTypes from "../constants/actionTypes";

const initialState = {
  isLoading: true,
  posts: [],
  post: null,
  currentPage: 1,
  numberOfPages: 1,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case actionTypes.UPDATE:
    case actionTypes.LIKE:
    case actionTypes.COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case actionTypes.FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case actionTypes.FETCH_POST:
      return { ...state, post: action.payload.post };
    case actionTypes.FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case actionTypes.DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};

export default postReducer;
