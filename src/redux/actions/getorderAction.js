import axios from "axios";
import {
    GET_ORDER_REQUEST,
     GET_ORDER_SUCCESS, 
     GET_ORDER_FAILURE
} from "../types/getorderTypes";

export const getOrdersAction = () => async (dispatch) => {
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
    const res = await axios.get(`http://localhost:5000/order`, {
      headers: headers,
    });
    const orders = await res.data;
 
    dispatch(ordersSuccess(orders.data ));
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
    type: GET_ORDER_REQUEST,
  };
};

export const ordersSuccess = (orders) => {
  return {
    type: GET_ORDER_SUCCESS,
    payload:orders,
  };
};
export const ordersFailure = (error) => {
  return {
    type:GET_ORDER_FAILURE,
    payload: error,
  };
};
