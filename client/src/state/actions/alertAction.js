import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (redirect, msg) => (dispatch) => {
    dispatch({
        type: SET_ALERT,
        payload: { redirect, msg },
    });
};

export const removeAlert = () => {
    return { type: REMOVE_ALERT };
};
