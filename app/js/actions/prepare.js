import { createAction } from 'redux-actions';
import { PREPARE } from '../constants/ActionTypes';

export const finishPrepare = createAction(
    PREPARE,
);
