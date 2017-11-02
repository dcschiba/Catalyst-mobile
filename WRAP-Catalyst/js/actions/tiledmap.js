import { createAction, createActions } from 'redux-actions';
import {
  WORLD_BORDER_CLICK,
  WORLD_COASTLINE_CLICK,
  JAPAN_BORDER_CLICK,
  BLUE_MARBLE_CLICK,
  TILEDMAP_INITIALIZE,
} from '../constants/tiledmap/ActionTypes';
import { WorldBorder, WorldCoastLine, JapanBorder, BlueMarble } from '../layers/LayerConfig';

const checkActionWorldBorder = checked => ({ checked, targetLayer: WorldBorder.layerName });
const checkActionWorldCoastline = checked => ({ checked, targetLayer: WorldCoastLine.layerName });
const checkActionJapanBorder = checked => ({ checked, targetLayer: JapanBorder.layerName });
const checkActionBlueMarble = checked => ({ checked, targetLayer: BlueMarble.layerName });

export const {
  worldBorderClick,
  worldCoastlineClick,
  japanBorderClick,
  blueMarbleClick,
} = createActions({
  [WORLD_BORDER_CLICK]: checkActionWorldBorder,
  [WORLD_COASTLINE_CLICK]: checkActionWorldCoastline,
  [JAPAN_BORDER_CLICK]: checkActionJapanBorder,
  [BLUE_MARBLE_CLICK]: checkActionBlueMarble,
});

export const initialize = createAction(
  TILEDMAP_INITIALIZE,
  () => ({}),
);

