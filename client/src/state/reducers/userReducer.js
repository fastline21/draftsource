import {
    ADD_USER,
    CLEAR_ERROR,
    USERS_ERROR,
    CLEAR_USER,
    VERIFY_USER,
    LOAD_USER,
    LOGIN_USER,
    GET_USER_INFO,
    LOGOUT_USER,
} from './../actions/types';

const initialState = {
    user: null,
    error: null,
    info: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
            };
        case CLEAR_USER:
            return {
                ...state,
                user: null,
            };
        case VERIFY_USER:
        case LOGIN_USER:
            localStorage.setItem('token', action.payload.token);
            return state;
        case LOGOUT_USER:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                info: null,
            };
        case USERS_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case GET_USER_INFO:
            return {
                ...state,
                info: action.payload,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
