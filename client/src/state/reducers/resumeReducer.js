import {
	ADD_RESUME,
	RESUMES_ERROR,
	CLEAR_RESUME,
	CLEAR_ERROR,
	RESUME_STEP,
	RESET_STEP,
	RESUME_SUCCESS,
	RESUME_LOADING,
	RESUME_PERCENT,
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
				success: true,
			};
		case CLEAR_RESUME:
			return {
				...state,
				resume: null,
				success: true,
				loading: false,
				percent: 0,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case RESUME_SUCCESS:
			return {
				...state,
				success: action.payload,
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
		case RESUME_PERCENT:
			return {
				...state,
				percent: action.payload,
			};
		default:
			return state;
	}
};
