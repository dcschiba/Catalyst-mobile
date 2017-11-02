import { handleActions } from 'redux-actions';
import { CAR_GPS_CLICK } from '../constants/cargps/ActionTypes';

const initialState = {
  carGpsChecked: false,
};

export default handleActions({
  [CAR_GPS_CLICK]: (state, action) => ({
    ...state,
    carGpsChecked: action.payload.checked,
  }),
}, initialState);
