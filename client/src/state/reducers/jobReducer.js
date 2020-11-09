import {
	ADD_JOB,
	CLEAR_JOB,
	JOBS_ERROR,
	CLEAR_ERROR,
	JOB_STEP,
	JOB_SUCCESS,
	GET_JOBS,
	CLEAR_DETAILS,
	JOB_LOADING,
	VIEW_JOB,
	STATUS_JOB,
} from './../actions/types';

const initialState = {
	jobs: null,
	job: null,
	error: null,
	step: 0,
	success: false,
	loading: false,
	details: null,
	next: null,
	previous: null,
	total: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_JOB:
			return {
				...state,
				job: { ...state.job, ...action.payload },
				success: true,
			};
		case CLEAR_JOB:
			return {
				...state,
				job: null,
				success: true,
				loading: false,
			};
		case CLEAR_ERROR:
			return {
				...state,
				error: null,
			};
		case JOB_STEP:
			return {
				...state,
				step: action.payload,
			};
		case JOB_SUCCESS:
			return {
				...state,
				success: false,
			};
		case JOBS_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case STATUS_JOB:
			return {
				...state,
				jobs: state.jobs.filter((job) => job._id !== action.payload),
				total: state.jobs.filter((job) => job._id !== action.payload).length,
			};
		case VIEW_JOB:
			return {
				...state,
				details: action.payload,
			};
		case GET_JOBS:
			return {
				...state,
				jobs: action.payload.jobs,
				next: action.payload.next,
				previous: action.payload.previous,
				total: action.payload.total,
				loading: false,
			};
		case CLEAR_DETAILS:
			return {
				...state,
				details: null,
			};
		case JOB_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
