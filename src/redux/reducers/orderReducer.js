import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILURE,
} from "../types/orderTypes";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST:
      return {
        ...state, //spredding
        loading: true,
      };
    case ADD_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
        error: "",
      };
    case ADD_ORDER_FAILURE:
      return {
        loading: false,
        orders: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
