import axios from "axios";
import {
  DELETE_REQUEST,
  DELETE_SUCCESS,
  DELETE_FAILURE,
} from "../types/deleteCategoryTypes";

export const deleteCategoriesAction = (id) => async (dispatch) => {
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
    const res = await axios.delete(`http://localhost:5000/category/${id}`, {
      headers: headers,
    });
    dispatch(categoriesSuccess());
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
    type: DELETE_REQUEST,
  };
};

export const categoriesSuccess = (categories) => {
  return {
    type: DELETE_SUCCESS,
    payload: categories,
  };
};
export const categoriesFailure = (error) => {
  return {
    type: DELETE_FAILURE,
    payload: error,
  };
};
