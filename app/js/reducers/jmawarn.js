import { handleActions } from 'redux-actions';
import {
  JMAWARN_CLICK,
  JMAWARN_INITIALIZE,
  JMAWARN_ANNOUNCED_DATE,
} from '../constants/jmawarn/ActionTypes';

const initialState = {
  data: {},
  jmawarnChecked: true,
  announceddate: '',
};

export default handleActions({
  [JMAWARN_CLICK]: (state, action) => ({
    ...state,
    jmawarnChecked: action.payload.checked,
  }),
  [JMAWARN_ANNOUNCED_DATE]: (state, action) => (
    {
      ...state,
      announceddate: action.payload.data.ann,
    }),
  [JMAWARN_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
