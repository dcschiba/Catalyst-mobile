import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_NPAC_CLICK,
  WAVE_BLEND_NATL_CLICK,
  WAVE_BLEND_SEASIA_CLICK,
  WAVE_BLEND_ARROW_CLICK,
  WAVE_BLEND_CONTOUR_CLICK,
  WAVE_BLEND_FLAT_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendNatlContourLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    if (
      type === WAVE_BLEND_ARROW_CLICK ||
      type === WAVE_BLEND_FLAT_CLICK ||
      type === WAVE_BLEND_LOWRESO_CLICK ||
      type === WAVE_BLEND_NPAC_CLICK ||
      type === WAVE_BLEND_SEASIA_CLICK
    ) {
      return;
    }
    const { waveBlendChecked,
            waveBlendContourChecked,
            waveBlendNatlChecked,
            basetimeidx,
            validtimeidx } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendContourChecked && waveBlendNatlChecked;
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
      type === WAVE_BLEND_NATL_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendNatlContourLayer;
