import { createActions } from 'redux-actions';
import {
  JPTEN_CLICK,
  JPTEN_TYPE_CHECK,
  JPTEN_PAST_CHANGE,
  JPTEN_VALIDTIME_CHANGE,
} from '../constants/jp10ten/ActionTypes';
/* import {
  LEGEND_SHOW,
} from '../constants/ActionTypes';*/
/* eslint-disable camelcase */
import {
  WX_WNI_JP_10Ten_Report,
} from '../layers/LayerConfig';

const targetLayer = WX_WNI_JP_10Ten_Report.layerName;

const checkAction = checked => ({ checked, targetLayer });
const typeCheckAction = (code, checked) => ({ code, checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  jptenClick,
  jptenTypeCheck,
  jptenPastChange,
  jptenValidtimeChange,
} = createActions({
  [JPTEN_CLICK]: checkAction,
  [JPTEN_TYPE_CHECK]: typeCheckAction,
  [JPTEN_PAST_CHANGE]: valueAction,
  [JPTEN_VALIDTIME_CHANGE]: valueAction,
});

