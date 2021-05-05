import axios from "axios";
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from "../types/deleteUserTypes";

export const deleteUsersAction = (id) => async (dispatch) => {
  try {
    dispatch(usersRequest());
    const token = await localStorage.getItem("my-token");
    let headers;
    if (token) {
      headers = {
        "Content-Type": "application/json",
        "my-token": `${token}`,
      };
    } else {
      headers = {
        "Content-Type": "application/json",
      };
    }
    const res = await axios.delete(`http://localhost:5000/auth/${id}`, {
      headers: headers,
    });
    dispatch(usersSuccess());
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(usersFailure(errorMessage));
    } else {
      dispatch(usersFailure("Network n Error"));
    }
  }
};

export const usersRequest = () => {
  return {
    type: DELETE_REQUEST,
  };
};

export const usersSuccess = (users) => {
  return {
    type: DELETE_SUCCESS,
    payload: users,
  };
};
export const usersFailure = (error) => {
  return {
    type: DELETE_FAILURE,
    payload: error,
  };
};
