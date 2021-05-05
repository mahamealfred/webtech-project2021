import axios from "axios";
import {
  UPDATE_CATEGORIES_REQUEST,
  UPDATE_CATEGORIES_SUCCESS,
  UPDATE_CATEGORIES_FAILURE,
} from "../types/updateCategoryTypes";

export const updateCategoryAction = (data) => async (dispatch) => {
  try {
    dispatch(updateCategoryRequest());
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
    const res = await axios.patch(`http://localhost:5000/category/${data.id}`,
    {
        name: data.name
    },
     {
      headers: headers,
    });

    const category = await res.data;
   
    dispatch(updateCategorySuccess({ data: category.data }));
    
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(updateCategoryFailure(errorMessage));
    } else {
      dispatch(updateCategoryFailure("Network n Error"));
    }
  }
};

export const updateCategoryRequest = () => {
  return {
    type: UPDATE_CATEGORIES_REQUEST,
  };
};

export const updateCategorySuccess = (updateCategory) => {
  return {
    type: UPDATE_CATEGORIES_SUCCESS,
    payload: updateCategory,
  };
};
export const updateCategoryFailure = (error) => {
  return {
    type: UPDATE_CATEGORIES_FAILURE,
    payload: error,
  };
};
