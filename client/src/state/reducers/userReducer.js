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
	GET_USERS,
	USER_LOADING,
} from './../actions/types';

const initialState = {
	users: null,
	user: null,
	error: null,
	info: null,
	loading: false,
	success: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER:
			return {
				...state,
				success: true,
				loading: false,
			};
		case LOAD_USER:
			return {
				...state,
				user: action.payload,
				loading: false,
			};
		case CLEAR_USER:
			return {
				...state,
				user: null,
				success: false,
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
				loading: false,
			};
		case GET_USER_INFO:
			return {
				...state,
				info: action.payload,
				loading: false,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case USER_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
