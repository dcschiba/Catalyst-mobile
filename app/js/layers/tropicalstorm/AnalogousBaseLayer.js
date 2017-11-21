import { Logger } from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import WrapController from 'WRAP/UI/WrapController';

class AnalogousBaseLayer extends WrapLayer {
  configureCompleted() {
    Logger.debug('AnalogousBaseLayer configureCompleted');
    this.dhData.inspect((ref) => {
      const index = ref.query('index').value();
      if (index && index.index) {
        const AnalogousTropicalStormLayer0 = WrapController.getLayer('AnalogousTropicalStorm_0');
        const AnalogousTropicalStormLayer1 = WrapController.getLayer('AnalogousTropicalStorm_1');
        const AnalogousTropicalStormLayer2 = WrapController.getLayer('AnalogousTropicalStorm_2');
        const newlink = {};
        const newindex = {};
        Object.keys(index.jmatyph_link).forEach((idx) => {
          const llst = index.jmatyph_link[idx];
          newlink[idx] = [];
          for (let i = 0; i < llst.length; i += 1) {
            newlink[idx].push(`T${llst[i]}`);
          }
        });
        const indexlist = Object.keys(index.index);
        for (let j = 0; j < indexlist.length; j += 1) {
          newindex[`T${indexlist[j]}`] = {};
        }
        const newconfig = {
          jmatyph_link: newlink,
          index: newindex,
        };
        AnalogousTropicalStormLayer0.loadTyphData(newconfig);
        AnalogousTropicalStormLayer1.loadTyphData(newconfig);
        AnalogousTropicalStormLayer2.loadTyphData(newconfig);
      }
    }, true);
  }
}
export default AnalogousBaseLayer;
