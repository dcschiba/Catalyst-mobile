import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_SEASIA_CLICK,
  WAVE_BLEND_ARROW_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendSeasiaArrowLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendArrowChecked,
            waveBlendSeasiaChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendArrowChecked && waveBlendSeasiaChecked;
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
      type === WAVE_BLEND_SEASIA_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendSeasiaArrowLayer;
