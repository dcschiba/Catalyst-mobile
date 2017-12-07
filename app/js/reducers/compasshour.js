import { handleActions } from 'redux-actions';
import {
  COMPASS_HOUR_TIMELIST,
  COMPASS_HOUR_BASETIME_CHANGE,
  COMPASS_HOUR_VALIDTIME_CHANGE,
  COMPASS_HOUR_CLICK,
  COMPASS_HOUR_TMP_CLICK,
  COMPASS_HOUR_TMP_CONTOUR_CLICK,
  COMPASS_HOUR_TMP_CONTOUR_UNIT,
  COMPASS_HOUR_TMP_GRIDVALUE_CLICK,
  COMPASS_HOUR_TMP_GRIDVALUE_UNIT,
  COMPASS_HOUR_TMP_FILL_CHANGE,
  COMPASS_HOUR_PRES_CLICK,
  COMPASS_HOUR_PRES_CONTOUR_CLICK,
  COMPASS_HOUR_PRES_GRIDVALUE_CLICK,
  COMPASS_HOUR_PRES_FILL_CHANGE,
  COMPASS_HOUR_RH_CLICK,
  COMPASS_HOUR_RH_CONTOUR_CLICK,
  COMPASS_HOUR_RH_GRIDVALUE_CLICK,
  COMPASS_HOUR_RH_FILL_CHANGE,
  COMPASS_HOUR_ASNOW_CLICK,
  COMPASS_HOUR_ASNOW_CONTOUR_CLICK,
  COMPASS_HOUR_ASNOW_GRIDVALUE_CLICK,
  COMPASS_HOUR_ASNOW_FILL_CHANGE,
  COMPASS_HOUR_APCP_CLICK,
  COMPASS_HOUR_APCP_CONTOUR_CLICK,
  COMPASS_HOUR_APCP_GRIDVALUE_CLICK,
  COMPASS_HOUR_APCP_FILL_CHANGE,
  COMPASS_HOUR_POP_CLICK,
  COMPASS_HOUR_POP_CONTOUR_CLICK,
  COMPASS_HOUR_POP_GRIDVALUE_CLICK,
  COMPASS_HOUR_POP_FILL_CHANGE,
  COMPASS_HOUR_UGRDVGRD_CLICK,
  COMPASS_HOUR_UGRDVGRD_BARBS_CLICK,
  COMPASS_HOUR_WIND_FLOW_CLICK,
  COMPASS_HOUR_WIND_LINES_CHANGE,
  COMPASS_HOUR_VIS_CLICK,
  COMPASS_HOUR_VIS_CONTOUR_CLICK,
  COMPASS_HOUR_VIS_GRIDVALUE_CLICK,
  COMPASS_HOUR_VIS_FILL_CHANGE,
  COMPASS_HOUR_WIWW_CLICK,
  COMPASS_HOUR_WIWW_CONTOUR_CLICK,
  COMPASS_HOUR_WIWW_GRIDVALUE_CLICK,
  COMPASS_HOUR_WIWW_FILL_CHANGE,
} from '../constants/compasshour/ActionTypes';

const initialState = {
  compassHourChecked: true,
  data: {},
  basetimeidx: 0,
  validtimeidx: 0,
  basetime: [],
  tsobj: {},
  compassHourDisabled: { disabled: false },
  compassHourTmpGroupDisabled: { disabled: false },
  compassHourTmpChecked: true,
  compassHourTmpFillValue: 'none',
  compassHourTmpContourChecked: true,
  compassHourTmpContourUnit: 'C',
  compassHourTmpGridValueChecked: false,
  compassHourTmpGridValueUnit: 'C',
  compassHourPresGroupDisabled: { disabled: true },
  compassHourPresChecked: false,
  compassHourPresFillValue: 'gradiation',
  compassHourPresContourChecked: false,
  compassHourPresGridValueChecked: false,
  compassHourRhGroupDisabled: { disabled: true },
  compassHourRhChecked: false,
  compassHourRhFillValue: 'gradiation',
  compassHourRhContourChecked: false,
  compassHourRhGridValueChecked: false,
  compassHourAsnowGroupDisabled: { disabled: true },
  compassHourAsnowChecked: false,
  compassHourAsnowFillValue: 'gradiation',
  compassHourAsnowContourChecked: false,
  compassHourAsnowGridValueChecked: false,
  compassHourApcpGroupDisabled: { disabled: true },
  compassHourApcpChecked: false,
  compassHourApcpFillValue: 'gradiation',
  compassHourApcpContourChecked: false,
  compassHourApcpGridValueChecked: false,
  compassHourPopGroupDisabled: { disabled: true },
  compassHourPopChecked: false,
  compassHourPopFillValue: 'gradiation',
  compassHourPopContourChecked: false,
  compassHourPopGridValueChecked: false,
  compassHourUgrdvgrdGroupDisabled: { disabled: true },
  compassHourUgrdvgrdChecked: false,
  compassHourUgrdvgrdBarbsChecked: false,
  compassHourWindflowcheckd: false,
  compassHourWindflowlines: 1000,
  compassHourVisGroupDisabled: { disabled: true },
  compassHourVisChecked: false,
  compassHourVisFillValue: 'gradiation',
  compassHourVisContourChecked: false,
  compassHourVisGridValueChecked: false,
  compassHourWiwwGroupDisabled: { disabled: true },
  compassHourWiwwChecked: false,
  compassHourWiwwFillValue: 'gradiation',
  compassHourWiwwContourChecked: false,
  compassHourWiwwGridValueChecked: false,
};

export default handleActions({
  [COMPASS_HOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourChecked: action.payload.checked,
    compassHourDisabled: { disabled: !action.payload.checked },
  }),
  [COMPASS_HOUR_BASETIME_CHANGE]: (state, action) => ({
    ...state,
    basetimeidx: action.payload.value,
    validtimeidx: 0,
  }),
  [COMPASS_HOUR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    validtimeidx: action.payload.value,
  }),
  [COMPASS_HOUR_TIMELIST]: (state, action) => ({
    ...state,
    ...action.payload.data,
  }),
  // TMP
  [COMPASS_HOUR_TMP_CLICK]: (state, action) => ({
    ...state,
    compassHourTmpChecked: action.payload.checked,
    compassHourTmpGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_TMP_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourTmpFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_TMP_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourTmpContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_TMP_CONTOUR_UNIT]: (state, action) => ({
    ...state,
    compassHourTmpContourUnit: action.payload.value,
  }),
  [COMPASS_HOUR_TMP_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourTmpGridValueChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_TMP_GRIDVALUE_UNIT]: (state, action) => ({
    ...state,
    compassHourTmpGridValueUnit: action.payload.value,
  }),
  // PRES
  [COMPASS_HOUR_PRES_CLICK]: (state, action) => ({
    ...state,
    compassHourPresChecked: action.payload.checked,
    compassHourPresGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_PRES_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourPresFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_PRES_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourPresContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_PRES_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourPresGridValueChecked: action.payload.checked,
  }),
  // RH
  [COMPASS_HOUR_RH_CLICK]: (state, action) => ({
    ...state,
    compassHourRhChecked: action.payload.checked,
    compassHourRhGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_RH_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourRhFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_RH_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourRhContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_RH_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourRhGridValueChecked: action.payload.checked,
  }),
  // ASNOW
  [COMPASS_HOUR_ASNOW_CLICK]: (state, action) => ({
    ...state,
    compassHourAsnowChecked: action.payload.checked,
    compassHourAsnowGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_ASNOW_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourAsnowFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_ASNOW_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourAsnowContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_ASNOW_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourAsnowGridValueChecked: action.payload.checked,
  }),
  // APCP
  [COMPASS_HOUR_APCP_CLICK]: (state, action) => ({
    ...state,
    compassHourApcpChecked: action.payload.checked,
    compassHourApcpGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_APCP_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourApcpFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_APCP_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourApcpContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_APCP_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourApcpGridValueChecked: action.payload.checked,
  }),
  // POP
  [COMPASS_HOUR_POP_CLICK]: (state, action) => ({
    ...state,
    compassHourPopChecked: action.payload.checked,
    compassHourPopGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_POP_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourPopFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_POP_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourPopContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_POP_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourPopGridValueChecked: action.payload.checked,
  }),
  // UGRD, VGRD
  [COMPASS_HOUR_UGRDVGRD_CLICK]: (state, action) => ({
    ...state,
    compassHourUgrdvgrdChecked: action.payload.checked,
    compassHourUgrdvgrdGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_UGRDVGRD_BARBS_CLICK]: (state, action) => ({
    ...state,
    compassHourUgrdvgrdBarbsChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_WIND_FLOW_CLICK]: (state, action) => ({
    ...state,
    compassHourWindflowcheckd: action.payload.checked,
  }),
  [COMPASS_HOUR_WIND_LINES_CHANGE]: (state, action) => ({
    ...state,
    compassHourWindflowlines: action.payload.checked,
  }),
  // VIS
  [COMPASS_HOUR_VIS_CLICK]: (state, action) => ({
    ...state,
    compassHourVisChecked: action.payload.checked,
    compassHourVisGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_VIS_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourVisFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_VIS_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourVisContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_VIS_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourVisGridValueChecked: action.payload.checked,
  }),
  // WIWW
  [COMPASS_HOUR_WIWW_CLICK]: (state, action) => ({
    ...state,
    compassHourWiwwChecked: action.payload.checked,
    compassHourWiwwGroupDisabled: {
      disabled: (!action.payload.checked) || (state.compassHourDisabled.disabled),
    },
  }),
  [COMPASS_HOUR_WIWW_FILL_CHANGE]: (state, action) => ({
    ...state,
    compassHourWiwwFillValue: action.payload.value,
  }),
  [COMPASS_HOUR_WIWW_CONTOUR_CLICK]: (state, action) => ({
    ...state,
    compassHourWiwwContourChecked: action.payload.checked,
  }),
  [COMPASS_HOUR_WIWW_GRIDVALUE_CLICK]: (state, action) => ({
    ...state,
    compassHourWiwwGridValueChecked: action.payload.checked,
  }),
}, initialState);
