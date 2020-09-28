import { ADD_FILTER, UPDATE_FILTER, REMOVE_FILTER } from './../actions/types';

const initialState = {
    filter: {},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTER:
            return {
                ...state,
                filter: { ...state.filter, ...action.payload },
            };
        case UPDATE_FILTER:
            return {
                filter: { ...state.filter, ...action.payload },
            };
        case REMOVE_FILTER:
            return {
                filter: action.payload,
            };
        default:
            return state;
    }
};
