import WrapLayer from 'WRAP/UI/WrapLayer';

class RadarAmedasNOWCASTLayer extends WrapLayer {

  ctrlLayer(type, state) {
    const { radaramedasChecked, nowcasSelected, validtime } = state.radaramedas.radaramedas;
    this.set({ validtime });
    this.setVisible(radaramedasChecked && nowcasSelected);
  }
}

export default RadarAmedasNOWCASTLayer;
