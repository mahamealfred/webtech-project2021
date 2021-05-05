import { SIGNUP_USER_REQUEST, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE } from '../types/signupTypes';

const initialState = {
    loading: false,
    user: [],
    error: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP_USER_REQUEST:
            return {
                ...state, //spredding
                loading: true,
            };
        case SIGNUP_USER_SUCCESS:
            return {
                loading: false,
                user: action.payload,
                error: '',
            };
        case SIGNUP_USER_FAILURE:
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