import { CATEGORIES_REQUEST, CATEGORIES_SUCCESS, CATEGORIES_FAILURE } from '../types/categoriesTypes';

const initialState = {
    loading: false,
    categories: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
                error: '',
            };
        case CATEGORIES_FAILURE:
            return {
                loading: false,
                categories: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;