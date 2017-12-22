import { createAction } from 'redux-actions';
import { ADD_CHECKED_FUNCTION, REMOVE_FUNCTION_LIST } from '../constants/ActionTypes';

export const addFunction = createAction(
  ADD_CHECKED_FUNCTION,
  path => ({ path }),
);

export const removeFunction = createAction(
  REMOVE_FUNCTION_LIST,
  path => ({ path }),
);
