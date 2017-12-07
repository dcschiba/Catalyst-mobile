import { handleActions } from 'redux-actions';
import { ONLINE, OFFLINE } from '../constants/ActionTypes';

const initialState = {
  isOnline: false,
  targetHost: 'http://localhost:50000',
};

export default handleActions({
  [ONLINE]: () => ({
    isOnline: true,
    targetHost: 'https://pt-wrap01.wni.co.jp',
  }),
  [OFFLINE]: () => ({
    isOnline: false,
    targetHost: 'http://localhost:50000',
  }),
}, initialState);
