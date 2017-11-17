import { createAction } from 'redux-actions';
import { ADD_FUNCTION_LIST, REMOVE_FUNCTION_LIST } from '../constants/ActionTypes';

export const addFunction = createAction(
  ADD_FUNCTION_LIST,
  item => ({ item }),
);

export const removeFunction = createAction(
  REMOVE_FUNCTION_LIST,
  item => ({ item }),
);
