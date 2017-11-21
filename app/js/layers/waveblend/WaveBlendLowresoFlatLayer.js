import WaveBlendLayer from './WaveBlendLayer';

import {
  WAVE_BLEND_CLICK,
  WAVE_BLEND_LOWRESO_CLICK,
  WAVE_BLEND_FLAT_CLICK } from '../../constants/waveblend/ActionTypes';

class WaveBlendLowresoFlatLayer extends WaveBlendLayer {
  ctrlLayer(type, state) {
    const { waveBlendChecked,
            waveBlendFlatChecked,
            waveBlendLowresoChecked,
            basetimeidx,
            validtimeidx,
            lowthreshold,
            highthreshold } = state.waveblend;
    const enabled = waveBlendChecked && waveBlendFlatChecked && waveBlendLowresoChecked;
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
      type === WAVE_BLEND_LOWRESO_CLICK
    ) {
      this.setVisible(enabled);
    }
  }
}

export default WaveBlendLowresoFlatLayer;
