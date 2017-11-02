import { handleActions } from 'redux-actions';
import { CHANGE_SHOW_CONTENTS } from '../constants/ActionTypes';

const initialState = {
  showContents: [],
};

export default handleActions({
  [CHANGE_SHOW_CONTENTS]: (state, action) => ({
    ...state,
    showContents: action.payload.showContents,
  }),
}, initialState);

