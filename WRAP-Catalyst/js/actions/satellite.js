import { createAction, createActions } from 'redux-actions';
import {
  SATELLITE_CLICK,
  SATELLITE_TOOLTIP_CLICK,
  SAT_TYPE_CHANGE,
  SAT_VALIDTIME_CHANGE,
  SATELLITE_INITIALIZE,
} from '../constants/satellite/ActionTypes';

import {
  SAT_WORLD_WV,
  SAT_WORLD_IR,
  SAT_WORLD_CLDTOP,
  HIMA8_JP_WV,
  HIMA8_JP_VIS,
  HIMA8_JP_IR,
  HIMA8_JP_CLDTOP,
  MSG_FD_VIS,
  MSG_FD_IR,
  MSG_FD_WV,
  MSG_FD_CLDTOP,
  MSG_IODC_FD_VIS,
  MSG_IODC_FD_IR,
  MSG_IODC_FD_WV,
  MSG_IODC_FD_CLDTOP,
} from '../layers/LayerConfig';

const targetLayer = [
  SAT_WORLD_WV.layerName,
  SAT_WORLD_IR.layerName,
  SAT_WORLD_CLDTOP.layerName,
  HIMA8_JP_WV.layerName,
  HIMA8_JP_VIS.layerName,
  HIMA8_JP_IR.layerName,
  HIMA8_JP_CLDTOP.layerName,
  MSG_FD_VIS.layerName,
  MSG_FD_IR.layerName,
  MSG_FD_WV.layerName,
  MSG_FD_CLDTOP.layerName,
  MSG_IODC_FD_VIS.layerName,
  MSG_IODC_FD_IR.layerName,
  MSG_IODC_FD_WV.layerName,
  MSG_IODC_FD_CLDTOP.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  satelliteClick,
  satelliteTooltipClick,
  satTypeChange,
  satValidtimeChange,
} = createActions({
  [SATELLITE_CLICK]: checkAction,
  [SATELLITE_TOOLTIP_CLICK]: checkAction,
  [SAT_TYPE_CHANGE]: valueAction,
  [SAT_VALIDTIME_CHANGE]: valueAction,
});

export const initialize = createAction(
  SATELLITE_INITIALIZE,
  () => ({}),
);
