import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_CONTOUR_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendLowresoContourLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendContourChecked,
            waveBlendLowresoChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendContourChecked && waveBlendLowresoChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'HTSGW',
        },
        basetimeidx,
        validtimeidx,
      );
    }
    if (
      type === WAVE_BLEND_CLICK ||
      type === WAVE_BLEND_CONTOUR_CLICK ||
      type === WAVE_BLEND_LOWRESO_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendLowresoContourLayer;
