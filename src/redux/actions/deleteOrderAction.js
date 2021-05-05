import axios from "axios";
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from "../types/deleteOrderTypes";

export const deleteOrderAction = (id) => async (dispatch) => {
  try {
    dispatch(ordersRequest());
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
    const res = await axios.delete(`http://localhost:5000/order/${id}`, {
      headers: headers,
    });
    dispatch(ordersSuccess());
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(ordersFailure(errorMessage));
    } else {
      dispatch(ordersFailure("Network n Error"));
    }
  }
};

export const ordersRequest = () => {
  return {
    type: DELETE_REQUEST,
  };
};

export const ordersSuccess = (orders) => {
  return {
    type: DELETE_SUCCESS,
    payload: orders,
  };
};
export const ordersFailure = (error) => {
  return {
    type: DELETE_FAILURE,
    payload: error,
  };
};
