import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_ARROW_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendLowresoArrowLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendArrowChecked,
            waveBlendLowresoChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendArrowChecked && waveBlendLowresoChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'WNIPRDIR',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === WAVE_BLEND_CLICK ||
      type === WAVE_BLEND_ARROW_CLICK ||
      type === WAVE_BLEND_LOWRESO_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendLowresoArrowLayer;
