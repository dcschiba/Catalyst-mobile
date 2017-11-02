import { createAction } from 'redux-actions';
import { WRAP_API } from '../middleware/api/wrap';
import {
  GRAPH_REQUEST,
  GRAPH_SUCCESS,
  GRAPH_FAILURE,
} from '../constants/ActionTypes';

export const loadGraphData = createAction(
  WRAP_API,
  endpoint => ({
    types: [GRAPH_REQUEST, GRAPH_SUCCESS, GRAPH_FAILURE],
    endpoint,
  }),
);
