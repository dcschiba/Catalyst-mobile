import { handleActions } from 'redux-actions';
import {
  GRAPH_REQUEST,
  GRAPH_SUCCESS,
  GRAPH_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  data: {},
};

export default handleActions({
  [GRAPH_REQUEST]: state => ({
    ...state,
    isFetching: true,
  }),
  [GRAPH_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    data: action.payload.data,
  }),
  [GRAPH_FAILURE]: state => ({
    ...state,
    isFetching: false,
  }),
}, initialState);
