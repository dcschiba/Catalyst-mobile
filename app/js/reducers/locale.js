import { handleActions } from 'redux-actions';
import { CHANGE_LOCALE } from '../constants/ActionTypes';

const initialState = {
  locale: window.localStorage.getItem('locale') || 'ja',
};

export default handleActions({
  [CHANGE_LOCALE]: (state, action) => ({
    ...state,
    locale: action.payload.locale,
  }),
}, initialState);

