import { UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE } from '../types/updateProductTypes';

const initialState = {
    loading: false,
    products: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                error: '',
            };
        case UPDATE_PRODUCT_FAILURE:
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