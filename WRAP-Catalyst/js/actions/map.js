import { createAction } from 'redux-actions';
import { WRAP_API } from '../middleware/api/wrap';
import {
  MAP_OPT_REQUEST,
  MAP_OPT_SUCCESS,
  MAP_OPT_FAILURE,
  MAP_SWITCH_GMAP,
  MAP_SWITCH_OLMAP,
  MAP_SWITCH_WEBGLMAP,
  MAP_CHANGE_MAP_SOURCE,
} from '../constants/ActionTypes';

const dataPath = './pri/conf/';

export const loadMapSetting = createAction(
  WRAP_API,
  () => ({
    types: [MAP_OPT_REQUEST, MAP_OPT_SUCCESS, MAP_OPT_FAILURE],
    endpoint: `${dataPath}mapsetting-newest.json?t=${new Date().getTime()}`,
  }),
);

export const switchGMap = createAction(
  MAP_SWITCH_GMAP,
  isShow => ({ isShow }),
);

export const switchOlMap = createAction(
  MAP_SWITCH_OLMAP,
  isShow => ({ isShow }),
);

export const switchWebGLMap = createAction(
  MAP_SWITCH_WEBGLMAP,
  isShow => ({ isShow }),
);

export const changeMapSource = createAction(
  MAP_CHANGE_MAP_SOURCE,
  mapSource => ({ mapSource }),
);
