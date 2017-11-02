import { handleActions } from 'redux-actions';
import { CHANGE_SAMPLE_LOCALE } from '../constants/multiLanguage/ActionTypes';

const initialState = {
  sampleLocale: 'ja',
};

export default handleActions({
  [CHANGE_SAMPLE_LOCALE]: (state, action) => ({
    ...state,
    sampleLocale: action.payload.sampleLocale,
  }),
}, initialState);

