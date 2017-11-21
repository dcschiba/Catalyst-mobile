import { createActions } from 'redux-actions';
import { LIVE_CAMERA_CLICK } from '../constants/livecamera/ActionTypes';
import { LiveCamera } from '../layers/LayerConfig';


const checkAction = checked => ({ checked, targetLayer: LiveCamera.layerName });

export const {
  liveCameraClick,
} = createActions({
  [LIVE_CAMERA_CLICK]: checkAction,
});
