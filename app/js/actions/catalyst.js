import { createAction } from 'redux-actions';
import { CHANGE_SHOW_CONTENTS } from '../constants/ActionTypes';

export const changeShowContents = createAction(
  CHANGE_SHOW_CONTENTS,
  showContents => ({ showContents }),
);
