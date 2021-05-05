import axios from "axios";
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from "../types/deleteProductTypes";

export const deleteProductAction = (id) => async (dispatch) => {
  try {
    dispatch(productsRequest());
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
    const res = await axios.delete(`http://localhost:5000/products/${id}`, {
      headers: headers,
    });
    dispatch(productsSuccess());
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(productsFailure(errorMessage));
    } else {
      dispatch(productsFailure("Network n Error"));
    }
  }
};

export const productsRequest = () => {
  return {
    type: DELETE_REQUEST,
  };
};

export const productsSuccess = (categories) => {
  return {
    type: DELETE_SUCCESS,
    payload: products,
  };
};
export const productsFailure = (error) => {
  return {
    type: DELETE_FAILURE,
    payload: error,
  };
};
