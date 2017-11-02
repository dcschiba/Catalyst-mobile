import { createAction, createActions } from 'redux-actions';
import {
  ACOS_SHOW_CLICK,
  ACOS_INITIALIZE,
  ACOS_SHOW_LATEST,
  ACOS_SHOW_BEFORE,
  ACOS_SHOW_NEXT,
  ACOS_SHOW_NEWEST,
  ACOS_SHOW_ALL,
  ACOS_FL_CHANGE,
  ACOS_BASETIME_CHANGE,
} from '../constants/acos/ActionTypes';
import {
  LEGEND_SHOW,
} from '../constants/ActionTypes';

/* eslint-disable camelcase */
import {
  VolcanicRank,
  VolcanicAsh_GPV,
} from '../layers/LayerConfig';

const targetLayer = [VolcanicRank.layerName, VolcanicAsh_GPV.layerName];

const checkAction = checked => ({ checked, targetLayer });
const noinfoAction = () => ({ targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  acosShowClick,
  legendShow,
  acosShowLatest,
  acosShowBefore,
  acosShowNext,
  acosShowNewest,
  acosShowAll,
  acosFlChange,
  acosBasetimeChange,
} = createActions({
  [ACOS_SHOW_CLICK]: checkAction,
  [LEGEND_SHOW]: checkAction,
  [ACOS_SHOW_LATEST]: noinfoAction,
  [ACOS_SHOW_BEFORE]: noinfoAction,
  [ACOS_SHOW_NEXT]: noinfoAction,
  [ACOS_SHOW_NEWEST]: noinfoAction,
  [ACOS_SHOW_ALL]: noinfoAction,
  [ACOS_FL_CHANGE]: valueAction,
  [ACOS_BASETIME_CHANGE]: valueAction,
});

export const initialize = createAction(
  ACOS_INITIALIZE,
  () => ({}),
);

