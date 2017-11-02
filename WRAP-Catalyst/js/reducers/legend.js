import { handleActions } from 'redux-actions';
import {
  LEGEND_ADD,
  LEGEND_DELETE,
  LEGEND_CHANGE_SIZE,
  LEGEND_CHANGE_LEFT,
} from '../constants/ActionTypes';

const initialState = {
  legends: [],
  legendwidth: '400px',
  legendheight: '110px',
  legendleft: '220px',
};

function addItem(array, item) {
  return Array.from(new Set([...array, item]));
}
function removeItem(array, item) {
  return array.filter(v => v !== item);
}

export default handleActions({
  [LEGEND_ADD]: (state, action) => ({
    ...state,
    legends: addItem(state.legends, action.payload.legendname),
  }),
  [LEGEND_DELETE]: (state, action) => ({
    ...state,
    legends: removeItem(state.legends, action.payload.legendname),
  }),
  [LEGEND_CHANGE_SIZE]: (state, action) => ({
    ...state,
    legendwidth: action.payload.legendwidth,
    legendheight: action.payload.legendheight,
  }),
  [LEGEND_CHANGE_LEFT]: (state, action) => ({
    ...state,
    legendleft: action.payload.legendleft,
  }),
}, initialState);
