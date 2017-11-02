import { handleActions } from 'redux-actions';
import {
  ACOS_SHOW_CLICK,
  ACOS_INITIALIZE,
  ACOS_SHOW_LATEST,
  ACOS_SHOW_BEFORE,
  ACOS_SHOW_NEXT,
  ACOS_SHOW_NEWEST,
  ACOS_SHOW_ALL,
  ACOS_FL_CHANGE,
  ACOS_BASETIME_CHANGE,
  ACOS_TIMELIST,
} from '../constants/acos/ActionTypes';

const initialState = {
  data: {},
  showchecked: false,
  subDisabled: { disabled: true },
  beforeDisabled: { disabled: true },
  nextDisabled: { disabled: true },
  ctrlDisabled: { disabled: true },
  validtimelist: [],
  targetPoint: '',
  basetime: '',
  valididx: 0,
  validall: false,
  gpvtimelist: [],
  fl: 'ALL',
};

export default handleActions({
  [ACOS_SHOW_CLICK]: (state, action) => ({
    ...state,
    showchecked: action.payload.checked,
    subDisabled: { disabled: !action.payload.checked },
  }),
  [ACOS_FL_CHANGE]: (state, action) => {
    const v = action.payload.value;
    let flv = '';
    if (v === 0) {
      flv = 'ALL';
    } else if (v < 100) {
      flv = `FL0${v}`;
    } else {
      flv = `FL${v}`;
    }
    const rst = {
      ...state,
      fl: flv,
    };
    return rst;
  },
  [ACOS_SHOW_LATEST]: state => ({
    ...state,
    valididx: 0,
    beforeDisabled: { disabled: true },
    nextDisabled: { disabled: false },
  }),
  [ACOS_SHOW_BEFORE]: (state) => {
    const idx = state.valididx;
    const rst = {
      ...state,
      valididx: idx - 1,
      beforeDisabled: idx - 1 === 0 ? { disabled: true } : { disabled: false },
      nextDisabled: { disabled: false },
    };
    return rst;
  },
  [ACOS_SHOW_NEXT]: (state) => {
    const idx = state.valididx;
    const len = state.validtimelist.length;
    const rst = {
      ...state,
      valididx: idx + 1,
      beforeDisabled: { disabled: false },
      nextDisabled: idx + 1 === len - 1 ? { disabled: true } : { disabled: false },
    };
    return rst;
  },
  [ACOS_SHOW_NEWEST]: (state) => {
    const len = state.validtimelist.length;
    const rst = {
      ...state,
      valididx: len - 1,
      beforeDisabled: { disabled: false },
      nextDisabled: { disabled: true },
    };
    return rst;
  },
  [ACOS_SHOW_ALL]: (state) => {
    const validall = !state.validall;
    const beforedis = { disabled: false };
    const nextdis = { disabled: true };
    if (validall) {
      beforedis.disabled = true;
      nextdis.disabled = true;
    } else {
      const idx = state.valididx;
      const len = state.validtimelist.length;
      if (idx === 0) {
        beforedis.disabled = true;
      } else {
        beforedis.disabled = false;
      }

      if (idx === len - 1) {
        nextdis.disabled = true;
      } else {
        nextdis.disabled = false;
      }
    }
    const rst = {
      ...state,
      validall,
      beforeDisabled: beforedis,
      nextDisabled: nextdis,
    };
    return rst;
  },
  [ACOS_TIMELIST]: (state, action) => {
    const timelist = action.payload.data.timelist;
    const points = Object.keys(timelist);
    let basetime = '';
    let newestpttimelist;
    let targetPoint = '';
    // console.log('pt points ------', points);
    points.map((pt) => {
      const ptlist = timelist[pt];
      // console.log('pt ptlist ------', pt, ptlist);
      // 20170628 floating_ash_flagを確認しない、最新のものを表示する
        // if (ptlist && ptlist.length > 0 && ptlist[0].floating_ash_flag === 0) {
      if (ptlist && ptlist.length > 0) {
        const ptbasetime = ptlist[0].erupted_date;
        if (ptbasetime > basetime) {
          targetPoint = pt;
          basetime = ptbasetime;
          newestpttimelist = ptlist[0].validtime;
        }
      }
      return pt;
    });
    if (newestpttimelist) {
      const validtimelist = newestpttimelist.slice();
      validtimelist.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
      return {
        ...state,
        gpvtimelist: timelist,
        validtimelist,
        targetPoint,
        basetime,
        ctrlDisabled: { disabled: false },
        beforeDisabled: { disabled: true },
        nextDisabled: { disabled: false },
        valididx: 0,
        validall: false,
      };
    }
    return {
      ...state,
      ctrlDisabled: { disabled: true },
      beforeDisabled: { disabled: true },
      nextDisabled: { disabled: true },
    };
  },
  [ACOS_BASETIME_CHANGE]: (state, action) => {
    const gpvtimelist = state.gpvtimelist;
    const { ptname, erupted } = action.payload.data;
    let newestpttimelist;
    if (gpvtimelist[ptname]) {
      const ptlist = gpvtimelist[ptname];
      if (ptlist && ptlist.length > 0) {
        const targettm = ptlist.filter(tobj => (tobj.erupted_date === erupted));
        // console.log('targettm-----------', targettm);
        newestpttimelist = targettm[0];
      }
    }
    if (newestpttimelist) {
      const validtimelist = newestpttimelist.validtime.slice();
      validtimelist.sort((a, b) => {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;
      });
      return {
        ...state,
        validtimelist,
        basetime: erupted,
        targetPoint: ptname,
        beforeDisabled: { disabled: true },
        nextDisabled: { disabled: false },
        valididx: 0,
        validall: false,
      };
    }
    return state;
  },
  [ACOS_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),
}, initialState);
