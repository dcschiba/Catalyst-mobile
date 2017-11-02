/* eslint-disable camelcase */
import { createAction, createActions } from 'redux-actions';
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
} from '../constants/sigwx/ActionTypes';

import {
  SIGWX_UK_High,
  SIGWX_UK_Medium,
  SIGWX_US_High,
  SIGWX_US_Medium,
  SIGWX_UK_High_past,
  SIGWX_UK_Middle_past,
  SIGWX_US_High_past,
  SIGWX_US_Middle_past,
} from '../layers/LayerConfig';

const targetLayer = [
  SIGWX_UK_High.layerName,
  SIGWX_UK_Medium.layerName,
  SIGWX_US_High.layerName,
  SIGWX_US_Medium.layerName,
  SIGWX_UK_High_past.layerName,
  SIGWX_UK_Middle_past.layerName,
  SIGWX_US_High_past.layerName,
  SIGWX_US_Middle_past.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  sigwxClick,
  sigwxChange,
  ukHighClick,
  ukHighBasetimeChange,
  ukHighValidtimeChange,
  ukMiddleClick,
  ukMiddleBasetimeChange,
  ukMiddleValidtimeChange,
  usHighClick,
  usHighBasetimeChange,
  usHighValidtimeChange,
  usMiddleClick,
  usMiddleBasetimeChange,
  usMiddleValidtimeChange,
} = createActions({
  [SIGWX_CLICK]: checkAction,
  [SIGWX_CHANGE]: valueAction,
  [UK_HIGH_CLICK]: checkAction,
  [UK_HIGH_BASETIME_CHANGE]: valueAction,
  [UK_HIGH_VALIDTIME_CHANGE]: valueAction,
  [UK_MIDDLE_CLICK]: checkAction,
  [UK_MIDDLE_BASETIME_CHANGE]: valueAction,
  [UK_MIDDLE_VALIDTIME_CHANGE]: valueAction,
  [US_HIGH_CLICK]: checkAction,
  [US_HIGH_BASETIME_CHANGE]: valueAction,
  [US_HIGH_VALIDTIME_CHANGE]: valueAction,
  [US_MIDDLE_CLICK]: checkAction,
  [US_MIDDLE_BASETIME_CHANGE]: valueAction,
  [US_MIDDLE_VALIDTIME_CHANGE]: valueAction,
});

export const initialize = createAction(
  SIGWX_INITIALIZE,
  () => ({}),
);

