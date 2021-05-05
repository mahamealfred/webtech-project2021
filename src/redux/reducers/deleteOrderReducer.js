import { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } from '../types/deleteOrderTypes';

const initialState = {
    loading: false,
    orders: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case DELETE_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case DELETE_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: '',
            };
        case DELETE_FAILURE:
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