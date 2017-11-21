import { createAction, createActions } from 'redux-actions';
import {
  JMAWARN_CLICK,
  JMAWARN_INITIALIZE,
  JMAWARN_ANNOUNCED_DATE,
} from '../constants/jmawarn/ActionTypes';
import {
  LEGEND_SHOW,
} from '../constants/ActionTypes';
/* eslint-disable camelcase */
import {
  WX_JMA_Warn_Border,
  WX_JMA_Warn,
} from '../layers/LayerConfig';

const targetLayer = [
  WX_JMA_Warn_Border.layerName,
  WX_JMA_Warn.layerName,
];

const checkAction = checked => ({ checked, targetLayer });

export const {
  jmawarnClick,
  legendShow,
} = createActions({
  [JMAWARN_CLICK]: checkAction,
  [LEGEND_SHOW]: checkAction,
});

export const initialize = createAction(
  JMAWARN_INITIALIZE,
  () => ({}),
);

export const setJmawarnAnnouncedDate = createAction(
  JMAWARN_ANNOUNCED_DATE,
  ann => ({ ann }),
);

