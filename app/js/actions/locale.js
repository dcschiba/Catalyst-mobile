import { createAction } from 'redux-actions';
import { CHANGE_LOCALE } from '../constants/ActionTypes';

export const changeLocale = createAction(
  CHANGE_LOCALE,
  locale => ({ locale }),
);
