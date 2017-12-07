import { createAction } from 'redux-actions';
import { LAYER_INITIALIZE, STORE_INITIALIZE } from '../constants/ActionTypes';

export const layerInit = createAction(
    LAYER_INITIALIZE,
    init => (init),
);

export const layerInitClear = createAction(
    STORE_INITIALIZE,
);
