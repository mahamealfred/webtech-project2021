import axios from "axios";
import {
  USERS_REQUEST,
  USERS_SUCCESS,
  USERS_FAILURE,
} from "../types/userTypes";

export  const getUsersAction = () => async (dispatch) => {
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
    const res = await axios.get(`http://localhost:5000/auth`, {
      headers: headers,
    });
    const users = await res.data;
 
    dispatch(usersSuccess(users.data ));
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
    type: USERS_REQUEST,
  };
};

export const usersSuccess = (users) => {
  return {
    type: USERS_SUCCESS,
    payload: users,
  };
};
export const usersFailure = (error) => {
  return {
    type: USERS_FAILURE,
    payload: error,
  };
};
