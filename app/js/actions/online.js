import { createAction } from 'redux-actions';
import { ONLINE, OFFLINE } from '../constants/ActionTypes';

export const turnOnline = createAction(
    ONLINE,
);

export const turnOffline = createAction(
    OFFLINE,
);
