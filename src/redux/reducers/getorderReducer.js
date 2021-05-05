import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILURE } from '../types/getorderTypes';

const initialState = {
    loading: false,
    orders: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: '',
            };
        case GET_ORDER_FAILURE:
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