import { handleActions } from 'redux-actions';
import { PREPARE } from '../constants/ActionTypes';

const initialState = {
  prepared: window.localStorage.getItem('initedOffline') || false,
};

export default handleActions({
  [PREPARE]: () => ({
    prepared: true,
  }),
}, initialState);
