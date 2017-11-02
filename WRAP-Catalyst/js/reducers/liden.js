import { handleActions } from 'redux-actions';
import {
  LIDEN_CLICK,
} from '../constants/liden/ActionTypes';

const initialState = {
  data: {},
  lidenChecked: false,
};

export default handleActions({
  [LIDEN_CLICK]: (state, action) => ({
    ...state,
    lidenChecked: action.payload.checked,
  }),
}, initialState);
