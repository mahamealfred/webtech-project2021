import { ADD_CATEGORIES_REQUEST, ADD_CATEGORIES_SUCCESS, ADD_CATEGORIES_FAILURE } from '../types/addCategoryTypes';

const initialState = {
    loading: false,
    categories: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CATEGORIES_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case ADD_CATEGORIES_SUCCESS:
            return {
                loading: false,
                categories: action.payload,
                error: '',
            };
        case ADD_CATEGORIES_FAILURE:
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