import WrapLayer from 'WRAP/UI/WrapLayer';

class FirLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setFirTooltip();
  }

  setFirTooltip() {
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        return `FIR: ${p.name || p.id || p.kind}`;
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { fir } = state;
    this.setVisible(fir.firChecked);
  }
}

export default FirLayer;
