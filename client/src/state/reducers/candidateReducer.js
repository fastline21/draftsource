import {
	GET_CANDIDATES,
	CANDIDATES_ERROR,
	VIEW_RESUME,
	CLEAR_RESUME,
	ADD_CANDIDATE,
	REMOVE_CANDIDATE,
	GET_SHORTLISTED,
	SET_SHORTLISTED,
	SET_LOADING,
} from './../actions/types';

const initialState = {
	candidates: null,
	next: null,
	previous: null,
	total: null,
	shortlist: [],
	shortlistedInfo: [],
	error: null,
	resume: null,
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_CANDIDATES:
			return {
				...state,
				candidates: action.payload.candidates,
				next: action.payload.next,
				previous: action.payload.previous,
				total: action.payload.total,
				loading: false,
			};
		case CANDIDATES_ERROR:
			return {
				...state,
				error: action.payload,
			};
		case VIEW_RESUME:
			return {
				...state,
				resume: action.payload,
			};
		case SET_SHORTLISTED:
			return {
				...state,
				shortlist: action.payload,
				loading: false,
			};
		case ADD_CANDIDATE:
			return {
				...state,
				shortlist: [...state.shortlist, action.payload],
			};
		case REMOVE_CANDIDATE:
			return {
				...state,
				shortlist: state.shortlist.filter(
					(id) => id !== action.payload
				),
			};
		case GET_SHORTLISTED:
			return {
				...state,
				shortlistedInfo: action.payload,
				loading: false,
			};
		case CLEAR_RESUME:
			return {
				...state,
				resume: null,
			};
		case SET_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
