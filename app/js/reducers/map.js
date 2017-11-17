import { handleActions } from 'redux-actions';
import {
  MAP_OPT_REQUEST,
  MAP_OPT_SUCCESS,
  MAP_OPT_FAILURE,
  MAP_SWITCH_GMAP,
  MAP_SWITCH_OLMAP,
  MAP_SWITCH_WEBGLMAP,
  MAP_CHANGE_MAP_SOURCE,
} from '../constants/ActionTypes';
import { OPEN_STREET_MAP } from '../constants/map/mapSource';

const initialState = {
  isFetching: false,
  data: {},
  isShowGoogleMap: true,
  isShowOlMap: true,
  isShowWebGLMap: true,
  mapSource: OPEN_STREET_MAP,
};

export default handleActions({
  [MAP_OPT_REQUEST]: state => ({
    ...state,
    isFetching: true,
  }),
  [MAP_OPT_SUCCESS]: (state, action) => ({
    ...state,
    isFetching: false,
    data: action.payload.data,
  }),
  [MAP_OPT_FAILURE]: state => ({
    ...state,
    isFetching: false,
  }),
  [MAP_SWITCH_GMAP]: (state, action) => ({
    ...state,
    isShowGoogleMap: action.payload.isShow,
  }),
  [MAP_SWITCH_OLMAP]: (state, action) => ({
    ...state,
    isShowOlMap: action.payload.isShow,
  }),
  [MAP_SWITCH_WEBGLMAP]: (state, action) => ({
    ...state,
    isShowWebGLMap: action.payload.isShow,
  }),
  [MAP_CHANGE_MAP_SOURCE]: (state, action) => ({
    ...state,
    mapSource: action.payload.mapSource,
  }),
}, initialState);
