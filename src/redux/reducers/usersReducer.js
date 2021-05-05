import { USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE } from '../types/userTypes';

const initialState = {
    loading: false,
    users: [],
     error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: '',
            };
        case USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;