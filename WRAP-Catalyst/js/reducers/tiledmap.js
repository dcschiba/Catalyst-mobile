import { handleActions } from 'redux-actions';
import {
  WORLD_BORDER_CLICK,
  WORLD_COASTLINE_CLICK,
  JAPAN_BORDER_CLICK,
  BLUE_MARBLE_CLICK,
  TILEDMAP_INITIALIZE,
} from '../constants/tiledmap/ActionTypes';

const initialState = {
  data: {},
  worldborderChecked: false,
  worldcoastlineChecked: false,
  japanborderChecked: false,
  bluemarbleChecked: false,
};

export default handleActions({
  [WORLD_BORDER_CLICK]: (state, action) => ({
    ...state,
    worldborderChecked: action.payload.checked,
  }),
  [WORLD_COASTLINE_CLICK]: (state, action) => ({
    ...state,
    worldcoastlineChecked: action.payload.checked,
  }),
  [JAPAN_BORDER_CLICK]: (state, action) => ({
    ...state,
    japanborderChecked: action.payload.checked,
  }),
  [BLUE_MARBLE_CLICK]: (state, action) => ({
    ...state,
    bluemarbleChecked: action.payload.checked,
  }),
  [TILEDMAP_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
