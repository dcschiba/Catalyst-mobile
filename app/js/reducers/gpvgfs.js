import { handleActions } from 'redux-actions';
import {
  GPV_GFS_CLICK,
  GPV_GFS_TEMP_CLICK,
  GPV_GFS_WIND_CLICK,
  GPV_GFS_ISOTACH_CLICK,
  GPV_GFS_TMP_CONTOUR_CLICK,
  GPV_GFS_TMP_FLAT_CLICK,
  GPV_GFS_TMP_GRADATION_CLICK,
  GPV_GFS_TMP_GRIDVALUE_CLICK,
  GPV_GFS_VALIDTIME_CHANGE,
  GPV_GFS_LEVEL_CHANGE,
  GPV_GFS_TIMELIST,
  GPV_GFS_HGT_CLICK,
  GPV_GFS_HGT_CONTOUR_CLICK,
  GPV_GFS_HGT_FLAT_CLICK,
  GPV_GFS_HGT_GRADATION_CLICK,
  GPV_GFS_HGT_GRIDVALUE_CLICK,
  GPV_GFS_RH_CLICK,
  GPV_GFS_RH_CONTOUR_CLICK,
  GPV_GFS_RH_FLAT_CLICK,
  GPV_GFS_RH_GRADATION_CLICK,
  GPV_GFS_RH_GRIDVALUE_CLICK,
  GPV_GFS_ICING_PROB_CLICK,
  GPV_GFS_PRECIPITATION_CLICK,
  GPV_GFS_PRECIPITATION_FLAT_CLICK,
  GPV_GFS_PRECIPITATION_GRADATION_CLICK,
  GPV_GFS_SNOWDEPTH_CLICK,
  GPV_GFS_SNOWDEPTH_CONTOUR_CLICK,
  GPV_GFS_SNOWDEPTH_GRADATION_CLICK,
  GPV_GFS_SNOWDEPTH_GRIDVALUE_CLICK,
  GPV_GFS_PRESSUREMSL_CLICK,
  GPV_GFS_PRESSUREMSL_CONTOUR_CLICK,
  GPV_GFS_PRESSUREMSL_GRADATION_CLICK,
  GPV_GFS_PRESSUREMSL_GRIDVALUE_CLICK,
} from '../constants/gpv/ActionTypes';

const initialState = {
  gpv: {
    gpvchecked: false,
    basetimeidx: 0,
    validtimeidx: 0,
    level: 500,
    gpvDisabled: { disabled: true },
    tempchecked: false,
    windchecked: false,
    isotachchecked: false,
    tmpcontourchecked: false,
    tmpflatchecked: false,
    tmpgradationchecked: false,
    tmpgridvaluechecked: false,
    gpvtmpgroupDisabled: { disabled: true },
    gpvhgtgroupDisabled: { disabled: true },
    gpvrhgroupDisabled: { disabled: true },
    gpvsnowdepthgroupDisabled: { disabled: true },
    gpvpressuremslgroupDisabled: { disabled: true },
    basetime: [],
    tsarr: [],
    hgtchecked: false,
    hgtcontourchecked: false,
    hgtflatchecked: false,
    hgtgradationchecked: false,
    hgtgridvaluechecked: false,
    rhchecked: false,
    rhcontourchecked: false,
    rhflatchecked: false,
    rhgradationchecked: false,
    rhgridvaluechecked: false,
    icingprobchecked: false,
    precipitationchecked: false,
    gpvprecgroupDisabled: { disabled: true },
    precflatchecked: false,
    precgradationchecked: false,
    snowdepthchecked: false,
    snowdepthcontourchecked: false,
    snowdepthgradationchecked: false,
    snowdepthgridvaluechecked: false,
    pressuremslchecked: false,
    pressuremslcontourchecked: false,
    pressuremslgradationchecked: false,
    pressuremslgridvaluechecked: false,
  },
};

export default handleActions({
  [GPV_GFS_CLICK]: (state, action) => ({
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
  [GPV_GFS_TEMP_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      tempchecked: action.payload.checked,
      gpvtmpgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GFS_WIND_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      windchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_ISOTACH_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      isotachchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_TMP_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      tmpcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_TMP_FLAT_CLICK]: (state, action) => {
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
  [GPV_GFS_TMP_GRADATION_CLICK]: (state, action) => {
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
  [GPV_GFS_TMP_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      tmpgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GFS_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      validtimeidx: action.payload.value,
    },
  }),
  [GPV_GFS_LEVEL_CHANGE]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      level: action.payload.value,
    },
  }),
  [GPV_GFS_TIMELIST]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      ...action.payload.data,
    },
  }),
  [GPV_GFS_HGT_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      hgtchecked: action.payload.checked,
      gpvhgtgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GFS_HGT_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      hgtcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_HGT_FLAT_CLICK]: (state, action) => {
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
  [GPV_GFS_HGT_GRADATION_CLICK]: (state, action) => {
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
  [GPV_GFS_HGT_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      hgtgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GFS_RH_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      rhchecked: action.payload.checked,
      gpvrhgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GFS_RH_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      rhcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_RH_FLAT_CLICK]: (state, action) => {
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
  [GPV_GFS_RH_GRADATION_CLICK]: (state, action) => {
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
  [GPV_GFS_RH_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      rhgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GFS_ICING_PROB_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      icingprobchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_PRECIPITATION_CLICK]: (state, action) => ({
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
  [GPV_GFS_PRECIPITATION_FLAT_CLICK]: (state, action) => {
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
  [GPV_GFS_PRECIPITATION_GRADATION_CLICK]: (state, action) => {
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
  [GPV_GFS_SNOWDEPTH_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      snowdepthchecked: action.payload.checked,
      gpvsnowdepthgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GFS_SNOWDEPTH_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      snowdepthcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_SNOWDEPTH_GRADATION_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      snowdepthgradationchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_SNOWDEPTH_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      snowdepthgridvaluechecked: action.payload.checked,
    },
  }),
  [GPV_GFS_PRESSUREMSL_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      pressuremslchecked: action.payload.checked,
      gpvpressuremslgroupDisabled: {
        disabled: (!action.payload.checked) || (state.gpv.gpvDisabled.disabled),
      },
    },
  }),
  [GPV_GFS_PRESSUREMSL_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      pressuremslcontourchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_PRESSUREMSL_GRADATION_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      pressuremslgradationchecked: action.payload.checked,
    },
  }),
  [GPV_GFS_PRESSUREMSL_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    gpv: {
      ...state.gpv,
      pressuremslgridvaluechecked: action.payload.checked,
    },
  }),
}, initialState);
