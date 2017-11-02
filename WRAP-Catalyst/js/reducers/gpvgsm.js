import { handleActions } from 'redux-actions';
import {
  GPV_GSM_CLICK,
  GPV_GSM_TEMP_CLICK,
  GPV_GSM_WIND_CLICK,
  GPV_GSM_ISOTACH_CLICK,
  GPV_GSM_TMP_CONTOUR_CLICK,
  GPV_GSM_TMP_FLAT_CLICK,
  GPV_GSM_TMP_GRADATION_CLICK,
  GPV_GSM_TMP_GRIDVALUE_CLICK,
  GPV_GSM_VALIDTIME_CHANGE,
  GPV_GSM_LEVEL_CHANGE,
  GPV_GSM_TIMELIST,
  GPV_GSM_HGT_CLICK,
  GPV_GSM_HGT_CONTOUR_CLICK,
  GPV_GSM_HGT_FLAT_CLICK,
  GPV_GSM_HGT_GRADATION_CLICK,
  GPV_GSM_HGT_GRIDVALUE_CLICK,
  GPV_GSM_RH_CLICK,
  GPV_GSM_RH_CONTOUR_CLICK,
  GPV_GSM_RH_FLAT_CLICK,
  GPV_GSM_RH_GRADATION_CLICK,
  GPV_GSM_RH_GRIDVALUE_CLICK,
  GPV_GSM_ICING_PROB_CLICK,
  GPV_GSM_PRECIPITATION_CLICK,
  GPV_GSM_PRECIPITATION_FLAT_CLICK,
  GPV_GSM_PRECIPITATION_GRADATION_CLICK,
} from '../constants/gpv/ActionTypes';

const initialState = {
  gpv: {
    gpvchecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    level: 500,
    gpvDisabled: { disabled: true },
    tempchecked: true,
    windchecked: true,
    isotachchecked: true,
    tmpcontourchecked: false,
    tmpflatchecked: false,
    tmpgradationchecked: false,
    tmpgridvaluechecked: false,
    gpvtmpgroupDisabled: { disabled: true },
    gpvhgtgroupDisabled: { disabled: true },
    gpvrhgroupDisabled: { disabled: true },
    basetime: [],
    tsarr: [],
    hgtchecked: true,
    hgtcontourchecked: false,
    hgtflatchecked: false,
    hgtgradationchecked: false,
    hgtgridvaluechecked: false,
    rhchecked: true,
    rhcontourchecked: false,
    rhflatchecked: false,
    rhgradationchecked: false,
    rhgridvaluechecked: false,
    icingprobchecked: false,
    precipitationchecked: false,
    gpvprecgroupDisabled: { disabled: true },
    precflatchecked: false,
    precgradationchecked: false,
  },
};

export default handleActions({
  [GPV_GSM_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      gpvchecked: action.payload.checked,
      gpvDisabled: { disabled: !action.payload.checked },
      gpvtmpgroupDisabled: {
        disabled: (!action.payload.checked) || (!state.gpv.tempchecked),
      },
      gpvhgtgroupDisabled: {
        disabled: (!action.payload.checked) || (!state.gpv.rhchecked),
      },
      gpvrhgroupDisabled: {
        disabled: (!action.payload.checked) || (!state.gpv.rhchecked),
      },
    },
  }),
  [GPV_GSM_TEMP_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      tempchecked: action.payload.checked,
      gpvtmpgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GSM_WIND_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      windchecked: action.payload.checked,
    },
  }),
  [GPV_GSM_ISOTACH_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      isotachchecked: action.payload.checked,
    },
  }),
  [GPV_GSM_TMP_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      tmpcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GSM_TMP_FLAT_CLICK]: (state, action) => {
    const tmpgradationchecked = state.gpv.tmpgradationchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        tmpflatchecked: action.payload.checked,
        tmpgradationchecked:
        (action.payload.checked && tmpgradationchecked) ? false : tmpgradationchecked,
      },

    };
  },
  [GPV_GSM_TMP_GRADATION_CLICK]: (state, action) => {
    const tmpflatchecked = state.gpv.tmpflatchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        tmpgradationchecked: action.payload.checked,
        tmpflatchecked:
        (action.payload.checked && tmpflatchecked) ? false : tmpflatchecked,
      },

    };
  },
  [GPV_GSM_TMP_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      tmpgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GSM_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      validtimeidx: action.payload.value,
    },
  }),
  [GPV_GSM_LEVEL_CHANGE]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      level: action.payload.value,
    },
  }),
  [GPV_GSM_TIMELIST]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      ...action.payload.data,
    },
  }),
  [GPV_GSM_HGT_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      hgtchecked: action.payload.checked,
      gpvhgtgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GSM_HGT_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      hgtcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GSM_HGT_FLAT_CLICK]: (state, action) => {
    const hgtgradationchecked = state.gpv.tmpgradationchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        hgtflatchecked: action.payload.checked,
        hgtgradationchecked:
        (action.payload.checked && hgtgradationchecked) ? false : hgtgradationchecked,
      },

    };
  },
  [GPV_GSM_HGT_GRADATION_CLICK]: (state, action) => {
    const hgtflatchecked = state.gpv.hgtflatchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        hgtgradationchecked: action.payload.checked,
        hgtflatchecked:
        (action.payload.checked && hgtflatchecked) ? false : hgtflatchecked,
      },

    };
  },
  [GPV_GSM_HGT_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      hgtgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GSM_RH_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      rhchecked: action.payload.checked,
      gpvrhgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GSM_RH_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      rhcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GSM_RH_FLAT_CLICK]: (state, action) => {
    const rhgradationchecked = state.gpv.tmpgradationchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        rhflatchecked: action.payload.checked,
        rhgradationchecked:
        (action.payload.checked && rhgradationchecked) ? false : rhgradationchecked,
      },

    };
  },
  [GPV_GSM_RH_GRADATION_CLICK]: (state, action) => {
    const rhflatchecked = state.gpv.rhflatchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        rhgradationchecked: action.payload.checked,
        rhflatchecked:
        (action.payload.checked && rhflatchecked) ? false : rhflatchecked,
      },

    };
  },
  [GPV_GSM_RH_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      rhgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GSM_ICING_PROB_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      icingprobchecked: action.payload.checked,
    },
  }),
  [GPV_GSM_PRECIPITATION_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      gpvprecgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
      precipitationchecked: action.payload.checked,
    },
    actiontype: action.type,
  }),
  [GPV_GSM_PRECIPITATION_FLAT_CLICK]: (state, action) => {
    const precgradationchecked = state.gpv.precgradationchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        precflatchecked: action.payload.checked,
        precgradationchecked:
          (action.payload.checked && precgradationchecked) ? false : precgradationchecked,
      },
      actiontype: action.type,
    };
  },
  [GPV_GSM_PRECIPITATION_GRADATION_CLICK]: (state, action) => {
    const precflatchecked = state.gpv.precflatchecked;
    return {
      ...state,
      gpv: {
        ...state.gpv,
        precgradationchecked: action.payload.checked,
        precflatchecked:
          (action.payload.checked && precflatchecked) ? false : precflatchecked,
      },
      actiontype: action.type,
    };
  },
}, initialState);
