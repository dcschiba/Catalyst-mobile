import { handleActions } from 'redux-actions';
import {
  BASICTEST_CHECK,
  BASICTEST_ELEMENT_CHANGE,
  BASICTEST_LON_OFFSET,
  BASICTEST_LON_NORMALIZE,
} from '../constants/basictest/ActionTypes';

const initialState = {
  checked: false,
  element: 'line',
  offset: 0.0,
  normalizeLon: true,
};

export default handleActions({
  [BASICTEST_CHECK]: (state, action) => ({
    ...state,
    checked: action.payload.checked,
  }),
  [BASICTEST_ELEMENT_CHANGE]: (state, action) => ({
    ...state,
    element: action.payload.value,
  }),
  [BASICTEST_LON_OFFSET]: (state, action) => ({
    ...state,
    offset: action.payload.value,
  }),
  [BASICTEST_LON_NORMALIZE]: (state, action) => ({
    ...state,
    normalizeLon: action.payload.checked,
  }),
}, initialState);
