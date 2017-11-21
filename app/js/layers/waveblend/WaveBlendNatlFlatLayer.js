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

class WaveBlendNatlFlatLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    if (
      type === WAVE_BLEND_ARROW_CLICK ||
      type === WAVE_BLEND_CONTOUR_CLICK ||
      type === WAVE_BLEND_LOWRESO_CLICK ||
      type === WAVE_BLEND_NPAC_CLICK ||
      type === WAVE_BLEND_SEASIA_CLICK
    ) {
      return;
    }
    const { waveBlendChecked,
            waveBlendFlatChecked,
            waveBlendNatlChecked,
            basetimeidx,
            validtimeidx,
            lowthreshold,
            highthreshold } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendFlatChecked && waveBlendNatlChecked;
    if (enabled) {
      this.setContent(
        {
          element: 'HTSGW',
        },
        basetimeidx,
        validtimeidx,
      );
      this.setAttributes({
        style: {
          default: {
            fill_type: 'flat',
            palette_gradient: false,
            palette_step: 0.01,
            palette: [{
              value: lowthreshold,
              color: '#34B1F0',
            },
            {
              value: highthreshold,
              color: '#1B34CB',
            }],
          },
        },
      });
    }
    if (
      type === WAVE_BLEND_CLICK ||
      type === WAVE_BLEND_FLAT_CLICK ||
      type === WAVE_BLEND_NATL_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendNatlFlatLayer;
