import { createAction } from 'redux-actions';
import { WRAP_DISPATCH_ACTION } from '../constants/ActionTypes';

export const wrapDispatchAction = createAction(
  WRAP_DISPATCH_ACTION,
  (intype, data, targetLayer) => ({ intype, data, targetLayer }),
);
