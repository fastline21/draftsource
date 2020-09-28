import { ADD_FILTER, UPDATE_FILTER, REMOVE_FILTER } from './types';

// Add filter
export const addFilter = (filter) => (dispatch) => {
    dispatch({
        type: ADD_FILTER,
        payload: filter,
    });
};

// Update filter
export const updateFilter = (filter) => (dispatch) => {
    dispatch({
        type: UPDATE_FILTER,
        payload: filter,
    });
};

// Remove filter
export const removeFilter = (filter) => (dispatch) => {
    dispatch({
        type: REMOVE_FILTER,
        payload: filter,
    });
};
