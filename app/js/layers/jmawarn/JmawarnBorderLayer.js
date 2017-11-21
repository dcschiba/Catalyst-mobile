import WrapLayer from 'WRAP/UI/WrapLayer';

class JmawarnBorderLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dhData.inspect((ref) => {
      const data = ref.query('data').value();
      if (data && data.features) {
        /* eslint no-param-reassign: ["error", { "props": false }]*/
        data.features.map((f) => {
          f.properties.display_flag = (f.properties.saibun_level === '0');
          return f;
        });
        this.invalidate();
      }
    }, true);
  }
  ctrlLayer(type, state) {
    this.setVisible(state.jmawarn.jmawarnChecked);
  }
}

export default JmawarnBorderLayer;
