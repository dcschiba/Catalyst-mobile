import { createAction } from 'redux-actions';
import { CHANGE_SAMPLE_LOCALE } from '../constants/multiLanguage/ActionTypes';

export const changeSampleLocale = createAction(
    CHANGE_SAMPLE_LOCALE,
    sampleLocale => ({ sampleLocale }),
);
