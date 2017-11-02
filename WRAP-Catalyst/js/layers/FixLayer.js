import WrapLayer from 'WRAP/UI/WrapLayer';
import { FIX_CLICK, FIX_COMPULSORY_CLICK, FIXN_CLICK, FIX_RNAV_CLICK } from '../constants/fix/ActionTypes';
// import { FIX_COMPULSORY, FIXN, FIX_RNAV } from '../layers/LayerConfig';

class FixLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        if (p.kind === 'FIX') {
          return `FIX: ${p.name || p.id || p.kind}`;
        } else if (p.kind === 'FIXN') {
          return `FIXN: ${p.name || p.id || p.kind}`;
        } else if (p.kind === 'RNAV') {
          return `RNAV: ${p.name || p.id || p.kind}`;
        }
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { fixChecked,
       fixCompulsoryChecked,
       fixNChecked,
       fixRNAVChecked } = state.fix;
    const layername = this.name();
    if (type === FIX_CLICK) {
      switch (layername) {
        case 'FIX_COMPULSORY':
          this.setVisible(fixCompulsoryChecked && fixChecked);
          break;
        case 'FIXN':
          this.setVisible(fixNChecked && fixChecked);
          break;
        case 'FIX_RNAV':
          this.setVisible(fixRNAVChecked && fixChecked);
          break;
        default:
          break;
      }
    }

    if (type === FIX_COMPULSORY_CLICK) {
      this.setVisible(fixCompulsoryChecked);
    }

    if (type === FIXN_CLICK) {
      this.setVisible(fixNChecked);
    }

    if (type === FIX_RNAV_CLICK) {
      this.setVisible(fixRNAVChecked);
    }
    // if (type === FIX_CLICK || type === FIX_COMPULSORY_CLICK) {
    //    this.setVisible(fix.fixCompulsoryChecked && fix.fixChecked);
    //  }
    // if (type === FIX_CLICK || type === FIXN_CLICK) {
    //    this.setVisible(fix.fixNChecked && fix.fixChecked);
    //  }
    // if (type === FIX_CLICK || type === FIX_RNAV_CLICK) {
    //    this.setVisible(fix.fixRNAVChecked && fix.fixChecked);
  }
  }

export default FixLayer;
