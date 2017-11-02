import { createActions } from 'redux-actions';
import {
  SURFACE_PRESSURE_CLICK,
  SURFACE_PRESSURE_BASETIME_CHANGE,
  SURFACE_PRESSURE_VALIDTIME_CHANGE,
} from '../constants/surfacepressure/ActionTypes';
import { SurfacePressure } from '../layers/LayerConfig';

const targetLayer = SurfacePressure.layerName;

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  surfacePressureClick,
  surfacePressureBasetimeChange,
  surfacePressureValidtimeChange,
} = createActions({
  [SURFACE_PRESSURE_CLICK]: checkAction,
  [SURFACE_PRESSURE_BASETIME_CHANGE]: valueAction,
  [SURFACE_PRESSURE_VALIDTIME_CHANGE]: valueAction,
});
