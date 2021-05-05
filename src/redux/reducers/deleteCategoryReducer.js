import { DELETE_REQUEST, DELETE_SUCCESS, DELETE_FAILURE } from '../types/deleteCategoryTypes';

const initialState = {
    loading: false,
    categories: [],
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
                categories: action.payload,
                error: '',
            };
        case DELETE_FAILURE:
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