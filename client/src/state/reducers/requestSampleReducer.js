import {
	REQUEST_SAMPLE_SUCCESS,
	REQUEST_SAMPLE_ERROR,
	REQUEST_SAMPLE_DEFAULT,
	REQUEST_SAMPLE_LOADING,
} from '../actions/types';

const initialState = {
	success: false,
	loading: false,
	error: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case REQUEST_SAMPLE_SUCCESS:
			return {
				...state,
				success: true,
				loading: false,
			};
		case REQUEST_SAMPLE_ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case REQUEST_SAMPLE_LOADING:
			return {
				...state,
				loading: true,
			};
		case REQUEST_SAMPLE_DEFAULT:
			return {
				success: false,
				loading: false,
				error: null,
			};
		default:
			return state;
	}
};
