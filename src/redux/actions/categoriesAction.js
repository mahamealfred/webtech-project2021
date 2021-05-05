import axios from "axios";
import {
  CATEGORIES_REQUEST,
  CATEGORIES_SUCCESS,
  CATEGORIES_FAILURE,
} from "../types/categoriesTypes";

export  const getCategoriesAction = () => async (dispatch) => {
  try {
    dispatch(categoriesRequest());
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
    const res = await axios.get(`http://localhost:5000/category`, {
      headers: headers,
    });
    const categories = await res.data;
    console.log(categories.data)
    dispatch(categoriesSuccess(categories.data ));
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(categoriesFailure(errorMessage));
    } else {
      dispatch(categoriesFailure("Network n Error"));
    }
  }
};

export const categoriesRequest = () => {
  return {
    type: CATEGORIES_REQUEST,
  };
};

export const categoriesSuccess = (categories) => {
  return {
    type: CATEGORIES_SUCCESS,
    payload: categories,
  };
};
export const categoriesFailure = (error) => {
  return {
    type: CATEGORIES_FAILURE,
    payload: error,
  };
};
