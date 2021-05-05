import { LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } from '../types/loginTypes';

const initialState = {
    loading: false,
    user: [],
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case LOGIN_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: '',
            };
        case LOGIN_USER_FAILURE:
            return {
                loading: false,
                user: [],
                error: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;