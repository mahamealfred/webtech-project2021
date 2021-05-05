import { PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE } from '../types/productsTypes';

const initialState = {
    loading: false,
    products: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload,
                error: '',
            };
        case PRODUCT_FAILURE:
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