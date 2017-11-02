import { handleActions } from 'redux-actions';
import {
  AIRPORT_CLICK,
  AIRPORT_ALL_CLICK,
  AIRPORT_CUM_CLICK,
  AIRPORT_INITIALIZE,
} from '../constants/airport/ActionTypes';

const initialState = {
  data: {},
  airport: {
    airportChecked: false,
    airportAllChecked: true,
    airportCumChecked: false,
  },
};

export default handleActions({
  [AIRPORT_CLICK]: (state, action) => ({
    ...state,
    airport: {
      ...state.airport,
      airportChecked: action.payload.checked,
    },
  }),
  [AIRPORT_ALL_CLICK]: (state, action) => {
    const airportCumChecked = state.airport.airportCumChecked;
    return {
      ...state,
      airport: {
        ...state.airport,
        airportAllChecked: action.payload.checked,
        airportCumChecked:
          (action.payload.checked && airportCumChecked) ? false : airportCumChecked,
      },
    };
  },
  [AIRPORT_CUM_CLICK]: (state, action) => {
    const airportAllChecked = state.airport.airportAllChecked;
    return {
      ...state,
      airport: {
        ...state.airport,
        airportCumChecked: action.payload.checked,
        airportAllChecked:
          (action.payload.checked && airportAllChecked) ? false : airportAllChecked,
      },
    };
  },
  [AIRPORT_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
