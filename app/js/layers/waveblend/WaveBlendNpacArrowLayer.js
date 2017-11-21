import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_NPAC_CLICK,
  WAVE_BLEND_ARROW_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendNpacArrowLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendArrowChecked,
            waveBlendNpacChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendArrowChecked && waveBlendNpacChecked;
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
      type === WAVE_BLEND_NPAC_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendNpacArrowLayer;
