import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_NPAC_CLICK,
  WAVE_BLEND_CONTOUR_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendNpacContourLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendContourChecked,
            waveBlendNpacChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendContourChecked && waveBlendNpacChecked;
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
      type === WAVE_BLEND_NPAC_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendNpacContourLayer;
