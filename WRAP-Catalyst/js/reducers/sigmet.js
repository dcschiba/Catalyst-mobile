import { handleActions } from 'redux-actions';
import {
  SIGMET_CLICK,
  SIGMET_INITIALIZE,
  SIGMET_NOTREAD,
} from '../constants/sigmet/ActionTypes';

const initialState = {
  data: {},
  sigmetChecked: false,
  sigmetNotreadVisible: false,
  sigmetNotreadArr: [],
};

export default handleActions({
  [SIGMET_CLICK]: (state, action) => ({
    ...state,
    sigmetChecked: action.payload.checked,
  }),
  [SIGMET_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
  [SIGMET_NOTREAD]: (state, action) => {
    const sigmetNotreadArr = action.payload.data.sigmetNotreadArr;
    const sigmentNotreadLen = sigmetNotreadArr.length;
    return {
      ...state,
      sigmetNotreadVisible: sigmentNotreadLen >= 0,
      sigmetNotreadArr,
    };
  },
}, initialState);
