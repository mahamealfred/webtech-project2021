import axios from "axios";
import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../types/loginTypes";

export const loginAction = (data, navigate) => async (dispatch) => {
  try {
    dispatch(loginUserRequest());
    const res = await axios.post(`http://localhost:5000/auth/signin`, data);
    const user = await res.data;
    localStorage.setItem("my-token", user.data.token);
    localStorage.setItem("user-data", JSON.stringify(user.data));
    dispatch(loginUserSuccess({ data: user.data }));
    if (user.data.user.role == "user") {
      return navigate("/", { replace: true });
    }
    
    navigate("/app/dashboard", { replace: true });
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(loginUserFailure(errorMessage));
    } else {
      console.log(err);
      dispatch(loginUserFailure("Network Error"));
    }
  }
};

export const loginUserRequest = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

export const loginUserSuccess = (user) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};
export const loginUserFailure = (error) => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
};
