import { handleActions } from 'redux-actions';
import { LOADING_START, LOADING_STOP } from '../constants/ActionTypes';

const initialState = {
  isLoading: true,
};

export default handleActions({
  [LOADING_START]: () => ({
    isLoading: true,
  }),
  [LOADING_STOP]: () => ({
    isLoading: false,
  }),
}, initialState);

