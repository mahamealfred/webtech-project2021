import axios from "axios";
import {
  ADD_CATEGORIES_REQUEST,
  ADD_CATEGORIES_SUCCESS,
  ADD_CATEGORIES_FAILURE,
} from "../types/addCategoryTypes";

export const addCategoryAction = (data,navigate) => async (dispatch) => {
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
    const res = await axios.post(`http://localhost:5000/category/save`,
    data,
     {
      headers: headers,
    });

    const category = await res.data;
    localStorage.setItem('my-token', user.data.token);
    localStorage.setItem('category-data', JSON.stringify(category.data));
    dispatch(loginUserSuccess({ data: category.data }));
    navigate('/app/dashboard', { replace: true })
   
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
    type: ADD_CATEGORIES_REQUEST,
  };
};

export const categoriesSuccess = (categories) => {
  return {
    type: ADD_CATEGORIES_SUCCESS,
    payload: categories,
  };
};
export const categoriesFailure = (error) => {
  return {
    type: ADD_CATEGORIES_FAILURE,
    payload: error,
  };
};
