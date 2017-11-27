import { createAction } from 'redux-actions';
import { LOADING_START, LOADING_STOP } from '../constants/ActionTypes';

export const startLoading = createAction(
    LOADING_START,
);

export const stopLoading = createAction(
    LOADING_STOP,
);
