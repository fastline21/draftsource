import axios from 'axios';
import setAuthToken from './../../utils/setAuthToken';
import {
    ADD_USER,
    USERS_ERROR,
    CLEAR_ERROR,
    CLEAR_USER,
    VERIFY_USER,
    LOAD_USER,
    LOGIN_USER,
    GET_USER_INFO,
    LOGOUT_USER,
} from './types';

// Add user
export const addUser = (user) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/auth/signup', user, config);
        dispatch({
            type: ADD_USER,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: error.response.data,
        });
    }
};

// Clear user
export const clearUser = () => {
    return {
        type: CLEAR_USER,
    };
};

// Clear error
export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    };
};

// Verify user
export const verifyUser = (token) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.put('/api/auth/verify', token, config);
        dispatch({
            type: VERIFY_USER,
            payload: res.data,
        });
        loadUser()(dispatch);
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: error.response.data,
        });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    setAuthToken(localStorage.token);
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: LOAD_USER,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: error.response.data,
        });
    }
};

// Login user
export const loginUser = (user) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const res = await axios.post('/api/auth/login', user, config);
        dispatch({
            type: LOGIN_USER,
            payload: res.data,
        });
        loadUser()(dispatch);
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: error.response.data,
        });
    }
};

// Get user info
export const getUserInfo = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/auth/get-user-info');
        dispatch({
            type: GET_USER_INFO,
            payload: res.data,
        });
    } catch (error) {
        dispatch({
            type: USERS_ERROR,
            payload: error.response.data,
        });
    }
};

// Logout user
export const logoutUser = () => {
    return {
        type: LOGOUT_USER,
    };
};
