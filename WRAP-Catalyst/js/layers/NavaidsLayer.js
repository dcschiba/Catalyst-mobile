import WrapLayer from 'WRAP/UI/WrapLayer';

class NavaidsLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.setNavaidsTooltip();
  }

  setNavaidsTooltip() {
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      if (p) {
        return `${p.mark} / ${p.name}`;
      }
      return null;
    });
  }

  ctrlLayer(type, state) {
    const { navaids } = state;
    this.setVisible(navaids.navaidsChecked);
  }
}

export default NavaidsLayer;
