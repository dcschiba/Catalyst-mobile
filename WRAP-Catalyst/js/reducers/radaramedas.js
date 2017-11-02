import { handleActions } from 'redux-actions';
import {
  RADARAMEDAS_CLICK,
  RADARAMEDAS_VALIDTIME_CHANGE,
  RADARAMEDAS_VALIDTIME,
} from '../constants/radaramedas/ActionTypes';

const initialState = {
  data: {},
  radaramedas: {
    radaramedasChecked: false,
    anlsisSelected: false,
    nowcasSelected: true,
    validtime: '',
    before: '',
    radaramedas_validtime_arr: [],
  },
};

export default handleActions({
  [RADARAMEDAS_CLICK]: (state, action) => ({
    ...state,
    radaramedas: {
      ...state.radaramedas,
      radaramedasChecked: action.payload.checked,
    },
  }),
  [RADARAMEDAS_VALIDTIME_CHANGE]: (state, action) => {
    let nowcas;
    let anlsis;
    const { radaramedas_validtime_arr } = state.radaramedas;
    const idx = radaramedas_validtime_arr.indexOf(action.payload.value);
    if (idx < 6) {
      nowcas = true;
      anlsis = false;
    } else {
      nowcas = false;
      anlsis = true;
    }
    const newState = {
      ...state,
      radaramedas: {
        ...state.radaramedas,
        validtime: action.payload.value,
        anlsisSelected: anlsis,
        nowcasSelected: nowcas,
      },
    };
    return newState;
  },

  [RADARAMEDAS_VALIDTIME]: (state, action) => ({
    ...state,
    radaramedas: {
      ...state.radaramedas,
      validtime: action.payload.data.validtime[0],
      radaramedas_validtime_arr: action.payload.data.validtime,
      anlsisSelected: false,
      nowcasSelected: true,
    },
  }),
}, initialState);
