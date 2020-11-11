import { GET_COUNTRY, COUNTRY_LOADING } from './../actions/types';

const initialState = {
	country: null,
	loading: false,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_COUNTRY:
			return {
				...state,
				country: action.payload.country_name,
				loading: false,
			};
		case COUNTRY_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
};
