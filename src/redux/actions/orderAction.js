import axios from "axios";
import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
} from "../types/orderTypes";

export const orderAction = (data, navigate) => async (dispatch) => {
  try {
    dispatch(orderUserRequest());
    console.log(data);
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
    const res = await axios.post(`http://localhost:5000/order/`,
    data,
     {
      headers: headers,
    });

    const order = await res.data;
    dispatch(orderUserSuccess ({ data: order.data }));
    navigate();

    
    alert("Your order have been registered");
  } catch (err) {
    console.log(err);
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(orderUserFailure(errorMessage));
    } else {
      dispatch(orderUserFailure("Network n Error"));
    }
  }
};

export const orderUserRequest = () => {
  return {
    type: ADD_ORDER_REQUEST,
  };
};

export const orderUserSuccess = (user) => {
  return {
    type: ADD_ORDER_SUCCESS,
    payload: user,
  };
};
export const orderUserFailure = (error) => {
  return {
    type: ADD_ORDER_FAILURE,
    payload: error,
  };
};
