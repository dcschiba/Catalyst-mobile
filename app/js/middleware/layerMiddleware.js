import WrapController from 'WRAP/UI/WrapController';
import { WRAP_DISPATCH_ACTION } from '../constants/ActionTypes';

/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  let actiontype = action.type;
  if (actiontype === WRAP_DISPATCH_ACTION) {
    actiontype = action.payload.intype;
    next({ ...action, type: action.payload.intype });
  } else {
    next(action);
  }
  if (action.payload && action.payload.targetLayer) {
    WrapController.ctrlLayer(actiontype, action.payload.targetLayer, store.getState());
  }
};
