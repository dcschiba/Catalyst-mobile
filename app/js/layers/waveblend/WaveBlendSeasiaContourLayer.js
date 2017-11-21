import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_SEASIA_CLICK,
  WAVE_BLEND_CONTOUR_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendSeasiaContourLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendContourChecked,
            waveBlendSeasiaChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendContourChecked && waveBlendSeasiaChecked;
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
      type === WAVE_BLEND_SEASIA_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendSeasiaContourLayer;
