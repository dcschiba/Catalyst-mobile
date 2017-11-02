import { createActions } from 'redux-actions';
import {
  LIDEN_CLICK,
} from '../constants/liden/ActionTypes';

const checkAction = checked => ({ checked });

export const {
  lidenClick,
} = createActions({
  [LIDEN_CLICK]: checkAction,
});
