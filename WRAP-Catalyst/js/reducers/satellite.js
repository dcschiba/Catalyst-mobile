import { handleActions } from 'redux-actions';
import {
  SATELLITE_CLICK,
  SATELLITE_TOOLTIP_CLICK,
  SAT_TYPE_CHANGE,
  SAT_VALIDTIME_CHANGE,
  SATELLITE_INITIALIZE,
  SAT_WORLD_WV_VALIDTIME,
  SAT_WORLD_IR_VALIDTIME,
  SAT_WORLD_CLDTOP_VALIDTIME,
  HIMA8_JP_WV_VALIDTIME,
  HIMA8_JP_VIS_VALIDTIME,
  HIMA8_JP_IR_VALIDTIME,
  HIMA8_JP_CLDTOP_VALIDTIME,
  MSG_FD_VIS_VALIDTIME,
  MSG_FD_IR_VALIDTIME,
  MSG_FD_WV_VALIDTIME,
  MSG_FD_CLDTOP_VALIDTIME,
  MSG_IODC_FD_VIS_VALIDTIME,
  MSG_IODC_FD_IR_VALIDTIME,
  MSG_IODC_FD_WV_VALIDTIME,
  MSG_IODC_FD_CLDTOP_VALIDTIME,
} from '../constants/satellite/ActionTypes';

const initialState = {
  data: {},
  satellite: {
    satelliteChecked: false,
    cloudTooltipEnabled: false,
    cloudTooltipChecked: false,
    validtime: '',
    before: '',
    satidx: 0,
    sat_arr: [
      'SAT_WORLD_WV',
      'SAT_WORLD_IR',
      'SAT_WORLD_CLDTOP',
      'HIMA8_JP_WV',
      'HIMA8_JP_VIS',
      'HIMA8_JP_IR',
      'HIMA8_JP_CLDTOP',
      'MSG_FD_VIS',
      'MSG_FD_IR',
      'MSG_FD_WV',
      'MSG_FD_CLDTOP',
      'MSG_IODC_FD_VIS',
      'MSG_IODC_FD_IR',
      'MSG_IODC_FD_WV',
      'MSG_IODC_FD_CLDTOP',
    ],
    sat_validtime_arr: [],
    world_wv_validtime: [],
    world_ir_validtime: [],
    world_cldtop_validtime: [],
    hima8_jp_wv_validtime: [],
    hima8_jp_vis_validtime: [],
    hima8_jp_ir_validtime: [],
    hima8_jp_cldtop_validtime: [],
    msg_fd_vis_validtime: [],
    msg_fd_ir_validtime: [],
    msg_fd_wv_validtime: [],
    msg_fd_cldtop_validtime: [],
    msg_iodc_fd_vis_validtime: [],
    msg_iodc_fd_ir_validtime: [],
    msg_iodc_fd_wv_validtime: [],
    msg_iodc_fd_cldtop_validtime: [],
  },
};

export default handleActions({
  [SATELLITE_CLICK]: (state, action) => ({
    ...state,
    satellite: {
      ...state.satellite,
      satelliteChecked: action.payload.checked,
    },
  }),
  [SATELLITE_TOOLTIP_CLICK]: (state, action) => ({
    ...state,
    satellite: {
      ...state.satellite,
      cloudTooltipChecked: action.payload.checked,
    },
  }),
  [SAT_TYPE_CHANGE]: (state, action) => {
    const sattype = action.payload.value;
    const before = state.satellite.sat_arr[state.satellite.satidx];
    let satidx = 0;
    let satvalidtimearr = [];
    let cloudTooltipEnabled = false;
    switch (sattype) {
      case 'SAT_WORLD_WV':
        satidx = 0;
        satvalidtimearr = state.satellite.world_wv_validtime;
        break;
      case 'SAT_WORLD_IR':
        satidx = 1;
        satvalidtimearr = state.satellite.world_ir_validtime;
        break;
      case 'SAT_WORLD_CLDTOP':
        satidx = 2;
        cloudTooltipEnabled = true;
        satvalidtimearr = state.satellite.world_cldtop_validtime;
        break;
      case 'HIMA8_JP_WV':
        satidx = 3;
        satvalidtimearr = state.satellite.hima8_jp_wv_validtime;
        break;
      case 'HIMA8_JP_VIS':
        satidx = 4;
        satvalidtimearr = state.satellite.hima8_jp_vis_validtime;
        break;
      case 'HIMA8_JP_IR':
        satidx = 5;
        satvalidtimearr = state.satellite.hima8_jp_ir_validtime;
        break;
      case 'HIMA8_JP_CLDTOP':
        satidx = 6;
        cloudTooltipEnabled = true;
        satvalidtimearr = state.satellite.hima8_jp_cldtop_validtime;
        break;
      case 'MSG_FD_VIS':
        satidx = 7;
        satvalidtimearr = state.satellite.msg_fd_vis_validtime;
        break;
      case 'MSG_FD_IR':
        satidx = 8;
        satvalidtimearr = state.satellite.msg_fd_ir_validtime;
        break;
      case 'MSG_FD_WV':
        satidx = 9;
        satvalidtimearr = state.satellite.msg_fd_wv_validtime;
        break;
      case 'MSG_FD_CLDTOP':
        satidx = 10;
        cloudTooltipEnabled = true;
        satvalidtimearr = state.satellite.msg_fd_cldtop_validtime;
        break;
      case 'MSG_IODC_FD_VIS':
        satidx = 11;
        satvalidtimearr = state.satellite.msg_iodc_fd_vis_validtime;
        break;
      case 'MSG_IODC_FD_IR':
        satidx = 12;
        satvalidtimearr = state.satellite.msg_iodc_fd_ir_validtime;
        break;
      case 'MSG_IODC_FD_WV':
        satidx = 13;
        satvalidtimearr = state.satellite.msg_iodc_fd_wv_validtime;
        break;
      case 'MSG_IODC_FD_CLDTOP':
        satidx = 14;
        cloudTooltipEnabled = true;
        satvalidtimearr = state.satellite.msg_iodc_fd_cldtop_validtime;
        break;
      default:

    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        satidx,
        before,
        cloudTooltipEnabled,
        validtime: satvalidtimearr[0],
        sat_validtime_arr: satvalidtimearr,
      },
    };
  },
  [SAT_VALIDTIME_CHANGE]: (state, action) => ({
    ...state,
    satellite: {
      ...state.satellite,
      validtime: action.payload.value,
    },
  }),
  [SATELLITE_INITIALIZE]: state => ({
    ...state,
    ...initialState,
  }),

  [SAT_WORLD_WV_VALIDTIME]: (state, action) => {
    const satValidtimeArr = state.satellite.sat_validtime_arr;
    if (satValidtimeArr.length === 0) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          sat_validtime_arr: action.payload.data.validtime,
          validtime: action.payload.data.validtime[0],
          world_wv_validtime: action.payload.data.validtime,
        },
      };
    }
    if (state.satellite.satidx === 0) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          satvalidtimearr: action.payload.data.validtime,
          world_wv_validtime: action.payload.data.validtime,
        },
      };
    }

    return {
      ...state,
      satellite: {
        ...state.satellite,
        world_wv_validtime: action.payload.data.validtime,
      },
    };
  },
  [SAT_WORLD_IR_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 1) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          world_ir_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        world_ir_validtime: action.payload.data.validtime,
      },
    };
  },
  [SAT_WORLD_CLDTOP_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 2) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          world_cldtop_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        world_cldtop_validtime: action.payload.data.validtime,
      },
    };
  },
  [HIMA8_JP_WV_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 3) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          hima8_jp_wv_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        hima8_jp_wv_validtime: action.payload.data.validtime,
      },
    };
  },
  [HIMA8_JP_VIS_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 4) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          hima8_jp_vis_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        hima8_jp_vis_validtime: action.payload.data.validtime,
      },
    };
  },
  [HIMA8_JP_IR_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 5) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          hima8_jp_ir_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        hima8_jp_ir_validtime: action.payload.data.validtime,
      },
    };
  },
  [HIMA8_JP_CLDTOP_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 6) {
      // console.log('HIMA8_JP_CLDTOP_VALIDTIME----');
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          hima8_jp_cldtop_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        hima8_jp_cldtop_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_FD_VIS_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 7) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_fd_vis_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_fd_vis_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_FD_IR_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 8) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_fd_ir_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_fd_ir_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_FD_WV_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 9) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_fd_wv_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_fd_wv_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_FD_CLDTOP_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 10) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_fd_cldtop_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_fd_cldtop_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_IODC_FD_VIS_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 11) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_iodc_fd_vis_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_iodc_fd_vis_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_IODC_FD_IR_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 12) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_iodc_fd_ir_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_iodc_fd_ir_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_IODC_FD_WV_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 13) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_iodc_fd_wv_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_iodc_fd_wv_validtime: action.payload.data.validtime,
      },
    };
  },
  [MSG_IODC_FD_CLDTOP_VALIDTIME]: (state, action) => {
    if (state.satellite.satidx === 14) {
      return {
        ...state,
        satellite: {
          ...state.satellite,
          validtime: action.payload.data.validtime[0],
          sat_validtime_arr: action.payload.data.validtime,
          msg_iodc_fd_cldtop_validtime: action.payload.data.validtime,
        },
      };
    }
    return {
      ...state,
      satellite: {
        ...state.satellite,
        msg_iodc_fd_cldtop_validtime: action.payload.data.validtime,
      },
    };
  },
}, initialState);
