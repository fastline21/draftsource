import {
	ADD_RESUME,
	RESUMES_ERROR,
	CLEAR_RESUME,
	CLEAR_ERROR,
	RESUME_STEP,
	RESET_STEP,
} from '../actions/types';

const initialState = {
	resume: null,
	error: null,
	step: 0,
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
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
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
		default:
			return state;
	}
};
