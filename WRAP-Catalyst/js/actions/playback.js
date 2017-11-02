import { createAction } from 'redux-actions';
import { CHANGE_DATE, CHANGE_TIME, CHANGE_SCALE, CHANGE_PLAYMODE } from '../constants/playback/ActionTypes';

export const changeDate = createAction(
  CHANGE_DATE,
  value => ({ value }),
);

export const changeTime = createAction(
  CHANGE_TIME,
  value => ({ value }),
);

export const changeScale = createAction(
  CHANGE_SCALE,
  value => ({ value }),
);

export const changePlayMode = createAction(
  CHANGE_PLAYMODE,
  mode => ({ mode }),
);
