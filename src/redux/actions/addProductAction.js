import axios from "axios";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
} from "../types/addProductTypes";

export const addProductAction = (data,navigate) => async (dispatch) => {
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
    const res = await axios.post(`http://localhost:5000/products/`,
    data,
     {
      headers: headers,
    });

    const product = await res.data;
    localStorage.setItem('my-token', user.data.token);
    localStorage.setItem('product-data', JSON.stringify(product.data));
    dispatch(productsSuccess ({ data: product.data }));
    navigate('/app/dashboard', { replace: true })
   
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
    type: ADD_PRODUCT_REQUEST,
  };
};

export const productsSuccess = (products) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    payload: products,
  };
};
export const productsFailure = (error) => {
  return {
    type: ADD_PRODUCT_FAILURE,
    payload: error,
  };
};
