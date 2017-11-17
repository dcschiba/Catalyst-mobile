import { createAction } from 'redux-actions';
import {
  LEGEND_ADD,
  LEGEND_DELETE,
  LEGEND_CHANGE_SIZE,
  LEGEND_CHANGE_LEFT,
} from '../constants/ActionTypes';

export const legendChangeSize = createAction(
  LEGEND_CHANGE_SIZE,
  (w, h) => ({ legendwidth: `${w}px`, legendheight: `${h}px` }),
);

export const addLegend = createAction(
  LEGEND_ADD,
  name => ({ legendname: name }),
);

export const deleteLegend = createAction(
  LEGEND_DELETE,
  name => ({ legendname: name }),
);

export const legendChangeLeft = createAction(
  LEGEND_CHANGE_LEFT,
  value => ({ legendleft: `${value}px` }),
);
