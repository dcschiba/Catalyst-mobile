import { handleActions } from 'redux-actions';
import {
  JPTEN_CLICK,
  JPTEN_VALIDTIME_CHANGE,
  JPTEN_TYPE_CHECK,
  JPTEN_PAST_CHANGE,
  JPTEN_TIMELIST,
} from '../constants/jp10ten/ActionTypes';


const initialState = {
  showchecked: true,
  subDisabled: { disabled: false },
  validtimeidx: 2,
  showpast: '0',
  validtimelist: [],
  visiblecodes: [100, 101, 200, 300, 301, 302, 303, 304, 400, 410, 411, 412, 420, 421, 422],
};

export default handleActions({
  [JPTEN_CLICK]: (state, action) => ({
    ...state,
    showchecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [JPTEN_TYPE_CHECK]: (state, action) => {
    const code = action.payload.code;
    const checked = action.payload.checked;
    const visiblecodes = state.visiblecodes;
    if (checked) {
      visiblecodes.push(code);
    } else {
      visiblecodes.splice(visiblecodes.indexOf(code), 1);
    }
    return {
      ...state,
      visiblecodes,
    };
  },
  [JPTEN_PAST_CHANGE]: (state, action) => ({
    ...state,
    showpast: action.payload.value,
  }),
  [JPTEN_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [JPTEN_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
}, initialState);
