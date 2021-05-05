import { ADD_PRODUCT_REQUEST, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_FAILURE } from '../types/addProductTypes';

const initialState = {
    loading: false,
    products: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case ADD_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                error: '',
            };
        case ADD_PRODUCT_FAILURE:
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