import { createActions } from 'redux-actions';
import {
  BASICTEST_CHECK,
  BASICTEST_ELEMENT_CHANGE,
  BASICTEST_LON_OFFSET,
  BASICTEST_LON_NORMALIZE,
} from '../constants/basictest/ActionTypes';
import { BasicFunctionTest } from '../layers/LayerConfig';

const checkAction = checked => ({ checked, targetLayer: BasicFunctionTest.layerName });
const valueAction = value => ({ value, targetLayer: BasicFunctionTest.layerName });

export const {
  basictestCheck,
  basictestElementChange,
  basictestLonOffset,
  basictestLonNormalize,
} = createActions({
  [BASICTEST_CHECK]: checkAction,
  [BASICTEST_ELEMENT_CHANGE]: valueAction,
  [BASICTEST_LON_OFFSET]: valueAction,
  [BASICTEST_LON_NORMALIZE]: checkAction,
});
