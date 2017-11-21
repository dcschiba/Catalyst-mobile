import { createAction, createActions } from 'redux-actions';
import {
  JMASEAWARN_CLICK,
  JMASEAWARN_INITIALIZE,
  JMASEAWARN_ANNOUNCED_DATE,
  JMASEAWARNFORECAST_ANNOUNCED_DATE,
  JMASEAWARN_SHOWTYPE_CHANGE,
} from '../constants/jmaseawarn/ActionTypes';
import {
  LEGEND_SHOW,
} from '../constants/ActionTypes';
/* eslint-disable camelcase */
import {
  WX_JMA_SeaWarn,
  WX_JMA_SeaForecast,
} from '../layers/LayerConfig';

const targetLayer = [
  WX_JMA_SeaWarn.layerName,
  WX_JMA_SeaForecast.layerName,
];
const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  jmaseawarnClick,
  legendShow,
  jmaseawarnShowtypeChange,
} = createActions({
  [JMASEAWARN_CLICK]: checkAction,
  [LEGEND_SHOW]: checkAction,
  [JMASEAWARN_SHOWTYPE_CHANGE]: valueAction,
});

export const initialize = createAction(
  JMASEAWARN_INITIALIZE,
  () => ({}),
);

export const setJmaseawarnAnnouncedDate = createAction(
  JMASEAWARN_ANNOUNCED_DATE,
  ann => ({ ann }),
);

export const setJmaseaforecastAnnouncedDate = createAction(
  JMASEAWARNFORECAST_ANNOUNCED_DATE,
  ann => ({ ann }),
);
