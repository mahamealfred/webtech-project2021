import { UPDATE_CATEGORIES_REQUEST, UPDATE_CATEGORIES_SUCCESS, UPDATE_CATEGORIES_FAILURE } from '../types/updateCategoryTypes';

const initialState = {
    loading: false,
    categories: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CATEGORIES_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case UPDATE_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
                error: '',
            };
        case UPDATE_CATEGORIES_FAILURE:
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