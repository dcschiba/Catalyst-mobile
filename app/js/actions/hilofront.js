import { createAction, createActions } from 'redux-actions';
import {
  HILOFRONT_SHOW_CLICK,
  HILOFRONT_BASETIME_CHANGE,
  HILOFRONT_VALIDTIME_CHANGE,
  HILOFRONT_CONTOUR_CLICK,
  HILOFRONT_HILO_CLICK,
  HILOFRONT_FRONT_CLICK,
  HILOFRONT_WRAP_DISPATCH_ACTION,
  HILOFRONT_INITIALIZE,
} from '../constants/hilofront/ActionTypes';

import {
  SurfaceAnalysisFront,
  SurfacePressureContour,
  SurfacePressureHiro,
} from '../layers/LayerConfig';

const targetLayer = [
  SurfaceAnalysisFront.layerName,
  SurfacePressureContour.layerName,
  SurfacePressureHiro.layerName,
];

const checkAction = checked => ({ checked, targetLayer });
const valueAction = value => ({ value, targetLayer });

export const {
  hilofrontShowClick,
  hilofrontBasetimeChange,
  hilofrontValidtimeChange,
  hilofrontContourClick,
  hilofrontHiloClick,
  hilofrontFrontClick,
} = createActions({
  [HILOFRONT_SHOW_CLICK]: checkAction,
  [HILOFRONT_BASETIME_CHANGE]: valueAction,
  [HILOFRONT_VALIDTIME_CHANGE]: valueAction,
  [HILOFRONT_CONTOUR_CLICK]: checkAction,
  [HILOFRONT_HILO_CLICK]: checkAction,
  [HILOFRONT_FRONT_CLICK]: checkAction,
});

export const hilofrontWrapLayerDispatchAction = createAction(
  HILOFRONT_WRAP_DISPATCH_ACTION,
  (intype, data) => ({ intype, data }),
);

export const hilofrontInitialize = createAction(
  HILOFRONT_INITIALIZE,
  () => ({}),
);
