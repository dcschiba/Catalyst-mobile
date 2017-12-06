import { handleActions } from 'redux-actions';
import {
  RADAR_CLICK,
  RADAR_COVERAGE_CLICK,
  JP_RADAR_CLICK,
  JP_RADAR_VALIDTIME_CHANGE,
  US_AK_RADAR_CLICK,
  US_AK_RADAR_VALIDTIME_CHANGE,
  US_GU_RADAR_CLICK,
  US_GU_RADAR_VALIDTIME_CHANGE,
  US_HI_RADAR_CLICK,
  US_HI_RADAR_VALIDTIME_CHANGE,
  US_NA_RADAR_CLICK,
  US_NA_RADAR_VALIDTIME_CHANGE,
  US_PR_RADAR_CLICK,
  US_PR_RADAR_VALIDTIME_CHANGE,
  EU_RADAR_CLICK,
  EU_RADAR_VALIDTIME_CHANGE,
  AU_RADAR_CLICK,
  AU_RADAR_VALIDTIME_CHANGE,
  KR_RADAR_CLICK,
  KR_RADAR_VALIDTIME_CHANGE,
  TW_RADAR_CLICK,
  TW_RADAR_VALIDTIME_CHANGE,
  JP_ICDB_RADAR_CLICK,
  JP_ICDB_RADAR_VALIDTIME_CHANGE,
  JP_ECHOTOP_CLICK,
  JP_RADAR_ACTIVITY_SUCCESS,
  JP_RADAR_ACTIVITY_FAILURE,
  JP_RADAR_ACTIVITY_CHANGE,
  JMA_PRCRIN_CLICK,
  JMA_PRCRIN_VALIDTIME_CHANGE,
  JMA_PRCRIN_EXTRA_CLICK,
  JMA_PRCRIN_EXTRA_VALIDTIME_CHANGE,
  WX_JP_RADAR_TIMELIST,
  WX_US_AK_RADAR_TIMELIST,
  WX_US_GU_RADAR_TIMELIST,
  WX_US_HI_RADAR_TIMELIST,
  WX_US_NA_RADAR_TIMELIST,
  WX_US_PR_RADAR_TIMELIST,
  WX_EU_RADAR_TIMELIST,
  WX_AU_RADAR_TIMELIST,
  WX_KR_RADAR_TIMELIST,
  WX_TW_RADAR_TIMELIST,
  JMA_OBS_RADAR_ECHINT_JP_TIMELIST,
  JMA_NOWCAS_PRCRIN_TIMELIST,
  JMA_ANLSIS_PRCRIN_TIMELIST,
  JMA_ANLSIS_PRCRIN_EXTRA_TIMELIST,
  EC_OBS_RADAR_ECHINT_CA_CLICK,
  EC_OBS_RADAR_ECHINT_CA_VALIDTIME_CHANGE,
  EC_OBS_RADAR_ECHINT_CA_TIMELIST,
} from '../constants/radar/ActionTypes';

const initialState = {
  radar: {
    radarChecked: true,
    coverageChecked: true,
    jpChecked: false,
    jpvalidtimeidx: 0,
    usAkChecked: false,
    usAkvalidtimeidx: 0,
    usGuChecked: false,
    usGuvalidtimeidx: 0,
    usHiChecked: false,
    usHivalidtimeidx: 0,
    usNaChecked: false,
    usNavalidtimeidx: 0,
    usPrChecked: false,
    usPrvalidtimeidx: 0,
    euChecked: false,
    euvalidtimeidx: 0,
    auChecked: false,
    auvalidtimeidx: 0,
    krChecked: false,
    krvalidtimeidx: 0,
    twChecked: false,
    twvalidtimeidx: 0,
    jpicdbChecked: false,
    jpicdbvalidtimeidx: 0,
    jpechotopChecked: false,
    WX_JP_Radar: [],
    WX_US_AK_Radar: [],
    WX_US_GU_Radar: [],
    WX_US_HI_Radar: [],
    WX_US_NA_Radar: [],
    WX_US_PR_Radar: [],
    WX_EU_Radar: [],
    WX_AU_Radar: [],
    WX_KR_Radar: [],
    WX_TW_Radar: [],
    JMA_OBS_RADAR_ECHINT_JP_5min: [],
    jpActivitySelect: {},
    jpActivity: {},
    jpActivityFailure: false,
    jmaprcrinChecked: false,
    jmaprcrinvalidtimeidx: 0,
    jmaprcrinextraChecked: false,
    jmaprcrinextravalidtimeidx: 0,
    jmaprcrinvalidtime: '',
    JMA_PRCRIN: [],
    JMA_NOWCAS_PRCRIN: [],
    JMA_ANLSIS_PRCRIN: [],
    JMA_ANLSIS_PRCRIN_EXTRA: [],
    ecobsradarechintcaChecked: false,
    ecobsradarechintcaidtimeidx: 0,
    EC_OBS_RADAR_ECHINT_CA: [],
  },
};

function contactJmaPrcrin(nowcas, anlsis) {
  const rst = [];
  Object.assign(rst, nowcas);
  if (anlsis && anlsis.length > 0) {
    /* eslint-disable no-param-reassign */
    let jmaahavestart = false;
    rst.map((jmap) => {
      if (!jmaahavestart) {
        const jmaaf = anlsis.filter(jmaa => jmap.tm === jmaa.tm);
        if (jmaaf && jmaaf.length > 0) {
          jmaahavestart = true;
        }
      }
      if (!jmaahavestart && jmap.ts.indexOf('fcst') < 0) {
        jmap.ts += '(fcst)';
      }
      return jmap;
    });
  }
  return rst;
}

export default handleActions({
  [JP_RADAR_ACTIVITY_SUCCESS]: (state, action) => {
    const jpactivity = action.payload.data;
    const announceddate = jpactivity.announced_date;
    const jpactivityann = {};
    jpactivityann[announceddate] = jpactivity;
    return {
      ...state,
      radar: {
        ...state.radar,
        jpActivityFailure: false,
        jpActivitySelect: jpactivity,
        jpActivity: {
          ...state.radar.jpActivity,
          ...jpactivityann,
        },
      },
    };
  },
  [JP_RADAR_ACTIVITY_FAILURE]: state => ({
    ...state,
    radar: {
      ...state.radar,
      jpActivityFailure: true,
      jpActivitySelect: {},
    },
  }),
  [JP_RADAR_ACTIVITY_CHANGE]: (state, action) => {
    const jpactivityann = action.payload.value;
    const jpActivitySelect = state.radar.jpActivity[jpactivityann];
    return {
      ...state,
      radar: {
        ...state.radar,
        jpActivitySelect,
      },
    };
  },
  [RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      radarChecked: action.payload.checked,
    },
  }),
  [RADAR_COVERAGE_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      coverageChecked: action.payload.checked,
    },
  }),
  [JP_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jpChecked: action.payload.checked,
    },
  }),
  [JP_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jpvalidtimeidx: action.payload.value,
    },
  }),
  [US_AK_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usAkChecked: action.payload.checked,
    },
  }),
  [US_AK_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usAkvalidtimeidx: action.payload.value,
    },
  }),
  [US_GU_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usGuChecked: action.payload.checked,
    },
  }),
  [US_GU_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usGuvalidtimeidx: action.payload.value,
    },
  }),
  [US_HI_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usHiChecked: action.payload.checked,
    },
  }),
  [US_HI_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usHivalidtimeidx: action.payload.value,
    },
  }),
  [US_NA_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usNaChecked: action.payload.checked,
    },
  }),
  [US_NA_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usNavalidtimeidx: action.payload.value,
    },
  }),
  [US_PR_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usPrChecked: action.payload.checked,
    },
  }),
  [US_PR_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      usPrvalidtimeidx: action.payload.value,
    },
  }),
  [EU_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      euChecked: action.payload.checked,
    },
  }),
  [EU_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      euvalidtimeidx: action.payload.value,
    },
  }),
  [AU_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      auChecked: action.payload.checked,
    },
  }),
  [AU_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      auvalidtimeidx: action.payload.value,
    },
  }),
  [KR_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      krChecked: action.payload.checked,
    },
  }),
  [KR_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      krvalidtimeidx: action.payload.value,
    },
  }),
  [TW_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      twChecked: action.payload.checked,
    },
  }),
  [TW_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      twvalidtimeidx: action.payload.value,
    },
  }),
  [JP_ICDB_RADAR_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jpicdbChecked: action.payload.checked,
    },
  }),
  [JP_ICDB_RADAR_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jpicdbvalidtimeidx: action.payload.value,
    },
  }),
  [JP_ECHOTOP_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jpechotopChecked: action.payload.checked,
    },
  }),
  [JMA_PRCRIN_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jmaprcrinChecked: action.payload.checked,
    },
  }),
  [JMA_PRCRIN_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jmaprcrinvalidtimeidx: action.payload.value,
    },
  }),
  [JMA_PRCRIN_EXTRA_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jmaprcrinextraChecked: action.payload.checked,
    },
  }),
  [JMA_PRCRIN_EXTRA_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      jmaprcrinextravalidtimeidx: action.payload.value,
    },
  }),
  [EC_OBS_RADAR_ECHINT_CA_CLICK]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      ecobsradarechintcaChecked: action.payload.checked,
    },
    actiontype: action.type,
  }),
  [EC_OBS_RADAR_ECHINT_CA_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      ecobsradarechintcaidtimeidx: action.payload.value,
    },
    actiontype: action.type,
  }),
  [WX_JP_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_JP_Radar: action.payload.data.tsarr,
      jpvalidtimeidx: 0,
    },
  }),
  [WX_US_AK_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_US_AK_Radar: action.payload.data.tsarr,
      usAkvalidtimeidx: 0,
    },
  }),
  [WX_US_GU_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_US_GU_Radar: action.payload.data.tsarr,
      usGuvalidtimeidx: 0,
    },
  }),
  [WX_US_HI_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_US_HI_Radar: action.payload.data.tsarr,
      usHivalidtimeidx: 0,
    },
  }),
  [WX_US_NA_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_US_NA_Radar: action.payload.data.tsarr,
      usNavalidtimeidx: 0,
    },
  }),
  [WX_US_PR_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_US_PR_Radar: action.payload.data.tsarr,
      usPrvalidtimeidx: 0,
    },
  }),
  [WX_EU_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_EU_Radar: action.payload.data.tsarr,
      euvalidtimeidx: 0,
    },
  }),
  [WX_AU_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_AU_Radar: action.payload.data.tsarr,
      auvalidtimeidx: 0,
    },
  }),
  [WX_KR_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_KR_Radar: action.payload.data.tsarr,
      krvalidtimeidx: 0,
    },
  }),
  [WX_TW_RADAR_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      WX_TW_Radar: action.payload.data.tsarr,
      twvalidtimeidx: 0,
    },
  }),
  [JMA_OBS_RADAR_ECHINT_JP_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      JMA_OBS_RADAR_ECHINT_JP_5min: action.payload.data.tsarr,
      jpicdbvalidtimeidx: 0,
    },
  }),
  [JMA_NOWCAS_PRCRIN_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      JMA_NOWCAS_PRCRIN: action.payload.data.tsarr,
      JMA_PRCRIN: contactJmaPrcrin(action.payload.data.tsarr, state.radar.JMA_ANLSIS_PRCRIN),
      jmaprcrinvalidtimeidx: 0,
    },
  }),
  [JMA_ANLSIS_PRCRIN_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      JMA_ANLSIS_PRCRIN: action.payload.data.tsarr,
      JMA_PRCRIN: contactJmaPrcrin(state.radar.JMA_NOWCAS_PRCRIN, action.payload.data.tsarr),
    },
  }),
  [JMA_ANLSIS_PRCRIN_EXTRA_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      JMA_ANLSIS_PRCRIN_EXTRA: action.payload.data.tsarr,
      jmaprcrinextravalidtimeidx: 0,
    },
  }),
  [EC_OBS_RADAR_ECHINT_CA_TIMELIST]: (state, action) => ({
    ...state,
    radar: {
      ...state.radar,
      EC_OBS_RADAR_ECHINT_CA: action.payload.data.tsarr,
      ecobsradarechintcaidtimeidx: 0,
    },
  }),
}, initialState);
