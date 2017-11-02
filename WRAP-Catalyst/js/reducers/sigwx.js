import { handleActions } from 'redux-actions';
import {
  SIGWX_CLICK,
  SIGWX_CHANGE,
  SIGWX_INITIALIZE,
  UK_HIGH_CLICK,
  UK_HIGH_BASETIME_CHANGE,
  UK_HIGH_VALIDTIME_CHANGE,
  UK_MIDDLE_CLICK,
  UK_MIDDLE_BASETIME_CHANGE,
  UK_MIDDLE_VALIDTIME_CHANGE,
  US_HIGH_CLICK,
  US_HIGH_BASETIME_CHANGE,
  US_HIGH_VALIDTIME_CHANGE,
  US_MIDDLE_CLICK,
  US_MIDDLE_BASETIME_CHANGE,
  US_MIDDLE_VALIDTIME_CHANGE,
  SIGWX_UK_HIGHT_PAST_TIMELIST,
  SIGWX_UK_MIDDLE_PAST_TIMELIST,
  SIGWX_US_HIGHT_PAST_TIMELIST,
  SIGWX_US_MIDDLE_PAST_TIMELIST,
} from '../constants/sigwx/ActionTypes';

const initialState = {
  data: {},
  sigwx: {
    sigwxChecked: false,
    beforeSigwxSelectValue: '',
    sigwxSelectValue: 'SIGWX_UK_High',
  },
  ukhighpast: {
    ukhighchecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    ukhighDisabled: { disabled: true },
    basetime: [],
    tsobj: {},
  },
  ukmiddlepast: {
    ukmiddlechecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    ukmiddleDisabled: { disabled: true },
    basetime: [],
    tsobj: {},
  },
  ushighpast: {
    ushighchecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    ushighDisabled: { disabled: true },
    basetime: [],
    tsobj: {},
  },
  usmiddlepast: {
    usmiddlechecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    usmiddleDisabled: { disabled: true },
    basetime: [],
    tsobj: {},
  },
};

export default handleActions({
  [SIGWX_CLICK]: (state, action) => ({
    ...state,
    sigwx: {
      ...state.sigwx,
      sigwxChecked: action.payload.checked,
    },
  }),
  [SIGWX_CHANGE]: (state, action) => {
    const beforeSigwxSelectValue = state.sigwx.sigwxSelectValue;
    return {
      ...state,
      sigwx: {
        ...state.sigwx,
        beforeSigwxSelectValue,
        sigwxSelectValue: action.payload.value,
      },
    };
  },
  [UK_HIGH_CLICK]: (state, action) => ({
    ...state,
    ukhighpast: {
      ...state.ukhighpast,
      ukhighchecked: action.payload.checked,
      ukhighDisabled: { disabled: !action.payload.checked },
    },
  }),
  [UK_HIGH_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    ukhighpast: {
      ...state.ukhighpast,
      basetimeidx: action.payload.value,
      validtimeidx: 0,
    },
  }),
  [UK_HIGH_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    ukhighpast: {
      ...state.ukhighpast,
      validtimeidx: action.payload.value,
    },
  }),
  [UK_MIDDLE_CLICK]: (state, action) => ({
    ...state,
    ukmiddlepast: {
      ...state.ukmiddlepast,
      ukmiddlechecked: action.payload.checked,
      ukmiddleDisabled: { disabled: !action.payload.checked },
    },
  }),
  [UK_MIDDLE_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    ukmiddlepast: {
      ...state.ukmiddlepast,
      basetimeidx: action.payload.value,
      validtimeidx: 0,
    },
  }),
  [UK_MIDDLE_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    ukmiddlepast: {
      ...state.ukmiddlepast,
      validtimeidx: action.payload.value,
    },
  }),
  [US_HIGH_CLICK]: (state, action) => ({
    ...state,
    ushighpast: {
      ...state.ushighpast,
      ushighchecked: action.payload.checked,
      ushighDisabled: { disabled: !action.payload.checked },
    },
  }),
  [US_HIGH_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    ushighpast: {
      ...state.ushighpast,
      basetimeidx: action.payload.value,
      validtimeidx: 0,
    },
  }),
  [US_HIGH_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    ushighpast: {
      ...state.ushighpast,
      validtimeidx: action.payload.value,
    },
  }),
  [US_MIDDLE_CLICK]: (state, action) => ({
    ...state,
    usmiddlepast: {
      ...state.usmiddlepast,
      usmiddlechecked: action.payload.checked,
      usmiddleDisabled: { disabled: !action.payload.checked },
    },
  }),
  [US_MIDDLE_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    usmiddlepast: {
      ...state.usmiddlepast,
      basetimeidx: action.payload.value,
      validtimeidx: 0,
    },
  }),
  [US_MIDDLE_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    usmiddlepast: {
      ...state.usmiddlepast,
      validtimeidx: action.payload.value,
    },
  }),
  [SIGWX_UK_HIGHT_PAST_TIMELIST]: (state, action) => ({
    ...state,
    ukhighpast: {
      ...state.ukhighpast,
      ...action.payload.data,
    },
  }),
  [SIGWX_UK_MIDDLE_PAST_TIMELIST]: (state, action) => ({
    ...state,
    ukmiddlepast: {
      ...state.ukmiddlepast,
      ...action.payload.data,
    },
  }),
  [SIGWX_US_HIGHT_PAST_TIMELIST]: (state, action) => ({
    ...state,
    ushighpast: {
      ...state.ushighpast,
      ...action.payload.data,
    },
  }),
  [SIGWX_US_MIDDLE_PAST_TIMELIST]: (state, action) => ({
    ...state,
    usmiddlepast: {
      ...state.usmiddlepast,
      ...action.payload.data,
    },
  }),
  [SIGWX_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
