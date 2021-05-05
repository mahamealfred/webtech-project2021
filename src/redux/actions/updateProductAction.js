import axios from "axios";
import {
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAILURE,
} from "../types/updateProductTypes";

export const updateProductAction = (data) => async (dispatch) => {
  try {
    dispatch(updateProductRequest());
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
  
    const res = await axios.patch(`http://localhost:5000/products/${data.id}`,
    {
        name: data.name,
        categoryId: data.categoryId,
        price: data.price,
        imageUrl: data.imageUrl,
        quantity: data.quantity,
        description: data.description
       
        
    },
     {
      headers: headers,
    });

    const product = await res.data;
   
    dispatch(updateProductSuccess({ data: product.data }));
    
   
  } catch (err) {
    if (err.response) {
      const errorMessage = await err.response.data.message;
      dispatch(updateProductFailure(errorMessage));
    } else {
      dispatch(updateProductFailure("Network  Error"));
    }
  }
};

export const updateProductRequest = () => {
  return {
    type: UPDATE_PRODUCT_REQUEST,
  };
};

export const updateProductSuccess = (updateProduct) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: updateProduct,
  };
};
export const updateProductFailure = (error) => {
  return {
    type: UPDATE_PRODUCT_FAILURE,
    payload: error,
  };
};
