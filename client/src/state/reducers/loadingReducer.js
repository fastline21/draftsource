import { SET_PERCENTAGE } from './../actions/types';

const initialState = {
	percentage: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_PERCENTAGE:
			return {
				...state,
				percentage: action.payload,
			};
		default:
			return state;
	}
};
