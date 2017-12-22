import { CHANGE_LOCALE } from '../constants/ActionTypes';
/* eslint-disable no-unused-vars */
export default store => next => (action) => {
  if (action.type === CHANGE_LOCALE) {
    window.localStorage.setItem('locale', action.payload.locale);
  }
  next(action);
};
