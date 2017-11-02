import { createActions } from 'redux-actions';
import { CAR_GPS_CLICK } from '../constants/cargps/ActionTypes';
import { CarGPS } from '../layers/LayerConfig';

const checkAction = checked => ({ checked, targetLayer: CarGPS.layerName });

export const {
  carGpsClick,
} = createActions({
  [CAR_GPS_CLICK]: checkAction,
});
