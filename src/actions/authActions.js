import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_DIAMOND_AND_HEART,
  GET_ALL_USERS_SCORE,
} from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/api/users/register", userData)
    .then((res) => history.push("/login"))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
  axios
    .post("/api/users/login", userData)
    .then((res) => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Diamond and Heart Data to display
export const getDiamondAndHeart = (userData) => (dispatch) => {
  axios
    .post("/api/users/diamondAndHeartGet", userData)
    .then((res) => {
      // Save to localStorage
      // Set current user
      dispatch({
        type: GET_DIAMOND_AND_HEART,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get Diamond and Heart Data to display
export const updateDiamondsAndHearts = (userData) => (dispatch) => {
  // const myJSON = JSON.stringify(userData);
  console.log("newData", userData);
  axios
    .post("/api/users/diamondAndHeartUpdate", userData)
    .then((res) => {
      // Save to localStorage
      // Set current user
      dispatch({
        type: GET_DIAMOND_AND_HEART,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Get all users score
export const getAllUsersSCore = () => (dispatch) => {
  // const myJSON = JSON.stringify(userData);

  axios
    .post("/api/users/getallscores")
    .then((res) => {
      // Save to localStorage
      // Set current user
      dispatch({
        type: GET_ALL_USERS_SCORE,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
