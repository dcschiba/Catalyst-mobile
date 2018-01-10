import { CHANGE_LOCALE, PREPARE } from '../constants/ActionTypes';
/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  if (action.type === CHANGE_LOCALE) {
    window.localStorage.setItem('locale', action.payload.locale);
  }
  if (action.type === PREPARE) {
    window.localStorage.setItem('initedOffline', true);
  }
  next(action);
};
