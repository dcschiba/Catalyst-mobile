import { handleActions } from 'redux-actions';
import {
  TROPICALSTORM_CLICK,
  TS_CHANGE,
  TS_HISTORY_CLICK,
  JMA_CLICK,
  WNI_CLICK,
  JTWC_CLICK,
  JMA_CHANGE,
  WNI_CHANGE,
  JTWC_CHANGE,
  JMA_TRACK_CLICK,
  JMA_LOW_CLICK,
  JMA_ESTIMATE_CLICK,
  JMA_F_TRACK_CLICK,
  JMA_F_CIRCLE_CLICK,
  JMA_WIND_CLICK,
  JMA_F_WIND_CLICK,
  JMA_HIST_CHANGE,
  WNI_TRACK_CLICK,
  WNI_F_TRACK_CLICK,
  WNI_WIND_CLICK,
  WNI_F_WIND_CLICK,
  JTWC_TRACK_CLICK,
  JTWC_F_TRACK_CLICK,
  JTWC_WIND_CLICK,
  JTWC_F_WIND_CLICK,
  JMA5_F_TRACK_CLICK,
  JMA5_F_CIRCLE_CLICK,
  TROPICALSTORM_LEGEND_TOGGLE,
  JMA_INFO_CHANGE,
  JMA3_WNI_CLICK,
  JMA3_JTWC_CLICK,
  WNI_RELATION_TYPH_CHANGE,
  JMA_TYPHOON_LIST,
  WNI_TROPICALSTORM_LIST,
  JTWC_TYPHOON_LIST,
  JMA_TYPHOON_5DAYS_LIST,
  TS_RELATION_WNI_LIST,
  TS_RELATION_JTWC_LIST,
  JMA_TYPH_HISTORY,
  JMA_TYPH_INFO,
  JMA_TYPH_5DAYS_INFO,
  ANALOGOUSTROPICALSTORM_0_LIST,
  ANALOGOUSTROPICALSTORM_1_LIST,
  ANALOGOUSTROPICALSTORM_2_LIST,
} from '../constants/tropicalstorm/ActionTypes';

const initialState = {
  data: {},
  tropChecked: false,
  tsContent: 'tsAll',
  tsHistoryChecked: false,
  jmaChecked: false,
  wniChecked: false,
  jtwcChecked: false,
  WX_JMA_Typhoon: [],
  jmatyphoonidx: 'ALL',
  jmaTrackChecked: true,
  jmaLowChecked: true,
  jmaEstChecked: false,
  jmaFTrackChecked: true,
  jmaFCircleChecked: true,
  jmaWindChecked: true,
  jmaFWindChecked: true,
  wniTrackChecked: true,
  wniFTrackChecked: true,
  wniWindChecked: true,
  wniFWindChecked: true,
  jtwcTrackChecked: true,
  jtwcFTrackChecked: true,
  jtwcWindChecked: true,
  jtwcFWindChecked: true,
  jma5FTrackChecked: true,
  jma5FCircleChecked: true,
  jma3WniChecked: true,
  jma3JtwcChecked: true,
  legendToggle: false,
  WX_WNI_TropicalStorm: [],
  wnityphoonidx: 'ALL',
  WX_JTWC_Typhoon: [],
  jtwctyphoonidx: 'ALL',
  jma_History: {},
  jmaHistoryidx: '',
  jmaInfo: {},
  jmaInfoHistory: {},
  jma5daysInfo: {},
  wniRelationidx: 'ALL',
  WX_WNI_Relation: [],
};

export default handleActions({
  [TROPICALSTORM_CLICK]: (state, action) => ({
    ...state,
    tropChecked: action.payload.checked,
  }),
  [TS_CHANGE]: (state, action) => ({
    ...state,
    tsContent: action.payload.value,
  }),
  [TS_HISTORY_CLICK]: (state, action) => ({
    ...state,
    tsHistoryChecked: action.payload.checked,
    tsallChecked: !action.payload.checked,
  }),
  [JMA_CLICK]: (state, action) => ({
    ...state,
    jmaChecked: action.payload.checked,
  }),
  [WNI_CLICK]: (state, action) => ({
    ...state,
    wniChecked: action.payload.checked,
  }),
  [JTWC_CLICK]: (state, action) => ({
    ...state,
    jtwcChecked: action.payload.checked,
  }),
  [JMA_CHANGE]: (state, action) => ({
    ...state,
    jmatyphoonidx: action.payload.value,
  }),
  [WNI_CHANGE]: (state, action) => ({
    ...state,
    wnityphoonidx: action.payload.value,
  }),
  [JTWC_CHANGE]: (state, action) => ({
    ...state,
    jtwctyphoonidx: action.payload.value,
  }),
  [JMA_TRACK_CLICK]: (state, action) => ({
    ...state,
    jmaTrackChecked: action.payload.checked,
  }),
  [JMA_LOW_CLICK]: (state, action) => ({
    ...state,
    jmaLowChecked: action.payload.checked,
  }),
  [JMA_ESTIMATE_CLICK]: (state, action) => ({
    ...state,
    jmaEstChecked: action.payload.checked,
  }),
  [JMA_F_TRACK_CLICK]: (state, action) => ({
    ...state,
    jmaFTrackChecked: action.payload.checked,
  }),
  [JMA_F_CIRCLE_CLICK]: (state, action) => ({
    ...state,
    jmaFCircleChecked: action.payload.checked,
  }),
  [JMA_WIND_CLICK]: (state, action) => ({
    ...state,
    jmaWindChecked: action.payload.checked,
  }),
  [JMA_F_WIND_CLICK]: (state, action) => ({
    ...state,
    jmaFWindChecked: action.payload.checked,
  }),
  [WNI_TRACK_CLICK]: (state, action) => ({
    ...state,
    wniTrackChecked: action.payload.checked,
  }),
  [WNI_F_TRACK_CLICK]: (state, action) => ({
    ...state,
    wniFTrackChecked: action.payload.checked,
  }),
  [WNI_WIND_CLICK]: (state, action) => ({
    ...state,
    wniWindChecked: action.payload.checked,
  }),
  [WNI_F_WIND_CLICK]: (state, action) => ({
    ...state,
    wniFWindChecked: action.payload.checked,
  }),
  [JTWC_TRACK_CLICK]: (state, action) => ({
    ...state,
    jtwcTrackChecked: action.payload.checked,
  }),
  [JTWC_F_TRACK_CLICK]: (state, action) => ({
    ...state,
    jtwcFTrackChecked: action.payload.checked,
  }),
  [JTWC_WIND_CLICK]: (state, action) => ({
    ...state,
    jtwcWindChecked: action.payload.checked,
  }),
  [JTWC_F_WIND_CLICK]: (state, action) => ({
    ...state,
    jtwcFWindChecked: action.payload.checked,
  }),
  [JMA5_F_TRACK_CLICK]: (state, action) => ({
    ...state,
    jma5FTrackChecked: action.payload.checked,
  }),
  [JMA5_F_CIRCLE_CLICK]: (state, action) => ({
    ...state,
    jma5FCircleChecked: action.payload.checked,
  }),
  [TROPICALSTORM_LEGEND_TOGGLE]: (state, action) => ({
    ...state,
    legendToggle: action.payload.toggled,
  }),
  [JMA_HIST_CHANGE]: (state, action) => ({
    ...state,
    jmaHistoryidx: action.payload.value,
  }),
  [JMA_INFO_CHANGE]: (state, action) => ({
    ...state,
    jmaInfoHistory: action.payload.value,
  }),
  [JMA3_WNI_CLICK]: (state, action) => ({
    ...state,
    jma3WniChecked: action.payload.checked,
  }),
  [JMA3_JTWC_CLICK]: (state, action) => ({
    ...state,
    jma3JtwcChecked: action.payload.checked,
  }),
  [WNI_RELATION_TYPH_CHANGE]: (state, action) => ({
    ...state,
    wniRelationidx: action.payload.value,
  }),
  [JMA_TYPHOON_LIST]: (state, action) => {
    const { jmatyphoonidx } = state;
    let idxx = action.payload.data.tsarr.findIndex(e => (e.typhid === jmatyphoonidx));
    if (idxx < 0) {
      idxx = 0;
    }
    return {
      ...state,
      WX_JMA_Typhoon: action.payload.data.tsarr,
      jmatyphoonidx: action.payload.data.tsarr[idxx].typhid,
    };
  },
  [WNI_TROPICALSTORM_LIST]: (state, action) => {
    const { wnityphoonidx } = state;
    let idxw = action.payload.data.tsarr.findIndex(e => (e.typhid === wnityphoonidx));
    if (idxw < 0) {
      idxw = 0;
    }
    return {
      ...state,
      WX_WNI_TropicalStorm: action.payload.data.tsarr,
      wnityphoonidx: action.payload.data.tsarr[idxw].typhid,
    };
  },
  [JTWC_TYPHOON_LIST]: (state, action) => {
    const { jtwctyphoonidx } = state;
    let idxj = action.payload.data.tsarr.findIndex(e => (e.typhid === jtwctyphoonidx));
    if (idxj < 0) {
      idxj = 0;
    }
    return {
      ...state,
      WX_JTWC_Typhoon: action.payload.data.tsarr,
      jtwctyphoonidx: action.payload.data.tsarr[idxj].typhid,
    };
  },
  [JMA_TYPHOON_5DAYS_LIST]: state => ({
    ...state,
  }),
  [TS_RELATION_WNI_LIST]: (state, action) => ({
    ...state,
    WX_WNI_Relation: action.payload.data.tsarr,
  }),
  [TS_RELATION_JTWC_LIST]: (state, action) => ({
    ...state,
    WX_WNI_Relation: action.payload.data.tsarr,
  }),
  [JMA_TYPH_HISTORY]: (state, action) => {
    const { jmatyphoonidx, jmaHistoryidx } = state;
    let idxx = 0;
    let dtt = '';
    const histlist = action.payload.data.histarr[jmatyphoonidx];
    if (histlist) {
      idxx = histlist.findIndex(e => (e.dt === jmaHistoryidx));
      if (idxx < 0) {
        idxx = 0;
      }
      dtt = histlist[idxx].dt;
    }
    return {
      ...state,
      jma_History: action.payload.data.histarr,
      jmaHistoryidx: dtt,
    };
  },
  [JMA_TYPH_INFO]: (state, action) => ({
    ...state,
    jmaInfo: action.payload.data.info,
  }),
  [JMA_TYPH_5DAYS_INFO]: (state, action) => ({
    ...state,
    jma5daysInfo: action.payload.data.info5,
  }),
  [ANALOGOUSTROPICALSTORM_0_LIST]: state => ({
    ...state,
  }),
  [ANALOGOUSTROPICALSTORM_1_LIST]: state => ({
    ...state,
  }),
  [ANALOGOUSTROPICALSTORM_2_LIST]: state => ({
    ...state,
  }),
}, initialState);
