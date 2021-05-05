import { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } from '../types/deleteProductTypes';

const initialState = {
    loading: false,
    products: [],
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
                products: action.payload,
                error: '',
            };
        case DELETE_FAILURE:
            return {
                loading: false,
                products: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;