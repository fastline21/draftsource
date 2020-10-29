import {
	ADD_RESUME,
	RESUMES_ERROR,
	CLEAR_RESUME,
	CLEAR_ERROR,
	RESUME_STEP,
	RESET_STEP,
	SET_SUCCESS,
	RESUME_LOADING,
	SET_PERCENTAGE,
} from '../actions/types';

const initialState = {
	resume: null,
	error: null,
	step: 0,
	success: false,
	loading: false,
	percent: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_RESUME:
			return {
				...state,
				resume: { ...state.resume, ...action.payload },
			};
		case CLEAR_RESUME:
			return {
				...state,
				resume: null,
				success: true,
				loading: false,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case SET_SUCCESS:
			return {
				...state,
				success: false,
			};
		case RESUME_LOADING:
			return {
				...state,
				loading: true,
			};
		case RESUME_STEP:
			return {
				...state,
				step: action.payload,
			};
		case RESET_STEP:
			return {
				...state,
				step: 0,
			};
		case RESUMES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case SET_PERCENTAGE:
			return {
				...state,
				percent: action.payload,
			};
		default:
			return state;
	}
};
