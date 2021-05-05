import axios from "axios";
import {
  PRODUCT_REQUEST,
  PRODUCT_SUCCESS,
  PRODUCT_FAILURE,
} from "../types/productsTypes";

export const getProductsAction = () => async (dispatch) => {
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
    const res = await axios.get(`http://localhost:5000/products`, {
      headers: headers,
    });
    const products = await res.data;
    console.log(products.data)
    dispatch(productsSuccess(products.data ));
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
    type: PRODUCT_REQUEST,
  };
};

export const productsSuccess = (products) => {
  return {
    type: PRODUCT_SUCCESS,
    payload: products,
  };
};
export const productsFailure = (error) => {
  return {
    type: PRODUCT_FAILURE,
    payload: error,
  };
};
