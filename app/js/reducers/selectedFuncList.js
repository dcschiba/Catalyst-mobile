import { handleActions } from 'redux-actions';
import {
    ADD_CHECKED_FUNCTION,
    REMOVE_FUNCTION_LIST,
} from '../constants/ActionTypes';

const initialState = {
  list: [],
};

export default handleActions({
  [ADD_CHECKED_FUNCTION]: (state, action) => ({
    ...state,
    list: [...state.list, action.payload.path],
  }),

  [REMOVE_FUNCTION_LIST]: (state, action) => ({
    ...state,
    list: state.list.filter(path => path !== action.payload.path),
  }),

}, initialState);
