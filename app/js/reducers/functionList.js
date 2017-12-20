import { handleActions } from 'redux-actions';
import {
    ADD_FUNCTION_LIST,
    REMOVE_FUNCTION_LIST,
} from '../constants/ActionTypes';

const initialState = {
  list: [],
};

export default handleActions({
  [ADD_FUNCTION_LIST]: (state, action) => ({
    list: [...state.list, action.payload.item],
  }),

  [REMOVE_FUNCTION_LIST]: (state, action) => ({
    list: state.list.filter(listItem => listItem.path !== action.payload.path),
  }),

}, initialState);
