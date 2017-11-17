import WrapLayer from 'WRAP/UI/WrapLayer';
import WRAP from 'WRAP';
import WrapController from 'WRAP/UI/WrapController';
import WrapUtils from '../common/utils/WrapUtils';
import {
  JPTEN_CLICK,
  JPTEN_VALIDTIME_CHANGE,
  JPTEN_PAST_CHANGE,
  JPTEN_TYPE_CHECK,
  JPTEN_TIMELIST,
} from '../constants/jp10ten/ActionTypes';

class Jp10tenLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.codeinfo = {
      100: '影くっきり／はっきり',
      101: '影ぼんやり／うっすら',
      200: '影見えない（くもり）',
      300: 'ぽつぽつ',
      301: 'ぱらぱら',
      302: 'さー',
      303: 'ザー',
      304: 'ゴーッ',
      400: 'べちゃ（みぞれ）',
      410: 'ちらちら',
      411: 'ふわふわ',
      412: 'しんしん',
      420: 'ドカドカ',
      421: 'あられ',
      422: '吹雪',
    };
    this.currentvalidtime = '';
    this.updatedCount = 0;
    this.pastDatas = {};
    this.dispathfunc = conf.dispatchAction;
    this.dhData.inspect((ref) => {
      const timelist = ref.query('validtime').value();
      this.dataInspect(timelist);
    });
    this.setLayerTooltip();
  }

  configureCompleted() {
    this.setPastLayer();
  }

  setPastLayer() {
    const pastdhdata = WRAP.DH.addObject('WX_WNI_JP_10Ten_Report_past');
    this.pastlayer = new WRAP.Geo.Layer('Jp10tenPastLayer');
    this.pastlayer.setVisible(false);
    WrapController.layer.upper_layers.push(this.pastlayer);
    WRAP.Geo.setLayer(WrapController.layer);

    this.pastlayer.configure(pastdhdata, this.layerConf);
    this.pastlayer.setTooltip((geo) => {
      const p = geo && geo.properties;
      return `${p.validtime}<br />${this.codeinfo[p.code]}`;
    });
  }

  dataInspect(timelist) {
    if (timelist && timelist.length) {
      const timelist12hour = timelist.slice(0, 60 * 12);
      this.dispathfunc(JPTEN_TIMELIST,
        { validtimelist: timelist12hour, validtimeidx: 0 },
        this.name());
      this.checkLoadPastData(timelist12hour);
    }
  }

  checkLoadPastData(timelist12hour) {
    this.updatedCount += 1;
    timelist12hour.map((validtime, i) => {
      if (i > 0 && !this.pastDatas[validtime]) {
        this.pastDatas[validtime] = this.getPastImageFeatures({ validtime });
      }
      return validtime;
    });
    if (this.updatedCount > 60) { // ６０回約１時間毎に 約１３時間前のpastDataを削除する
      const times = Object.keys(this.pastDatas);
      const deletefrom = 60 * 13;
      if (times.length > deletefrom) {
        for (let i = deletefrom; i < times.length; i += 1) {
          delete this.pastDatas[times[i]];
        }
      }
      this.updatedCount = 0;
    }
  }

  ctrlLayer(type, state) {
    const { showchecked, validtimeidx, validtimelist, showpast, visiblecodes } = state.jp10ten;
    this.visiblecodes = visiblecodes;
    const selectvalidtime = validtimelist[validtimeidx];
    this.currentvalidtime = WrapUtils.dateFormat(selectvalidtime, 'hh:mm', 9 * 3600);
    // console.log(type);
    if (type === JPTEN_CLICK) {
      this.setVisible(showchecked);
      this.pastlayer.setVisible(showchecked);
    } else if (validtimelist && validtimeidx < validtimelist.length) {
      const content = { validtime: selectvalidtime };
      const pastnum = parseInt(showpast, 10);
      if (type === JPTEN_VALIDTIME_CHANGE ||
          type === JPTEN_TIMELIST ||
          type === JPTEN_TYPE_CHECK) {
        if (type !== JPTEN_TYPE_CHECK) {
          this.set(content);
        }
        this.displayIcon(content);
      }
      if (pastnum > 0) {
        this.pastlayer.clear();
        for (let i = pastnum; i > 0; i -= 1) {
          if (validtimeidx + i < validtimelist.length) {
            const vtm = validtimelist[validtimeidx + i];
            const pastimgfeatures = this.pastDatas[vtm];
            if (pastimgfeatures) {
              pastimgfeatures.every((pf) => {
                if (this.visiblecodes.indexOf(parseInt(pf.geo.properties.code, 10)) > -1) {
                  this.pastlayer.addFeature(pf);
                }
                return pf;
              });
            }
          }
        }
        WRAP.Geo.invalidate();
      }
      if (type === JPTEN_PAST_CHANGE) {
        if (pastnum === 0) {
          this.pastlayer.clear();
          this.pastlayer.setVisible(false);
        } else if (!this.pastlayer.visible()) {
          this.pastlayer.setVisible(true);
        }
      }
    }
  }

  getPastImageFeatures(pastcontent) {
    const arr = [];
    this.dhData.getData(pastcontent, (gd) => {
      if (gd && gd.length) {
        const root = gd[0];
        root.features.every((feature) => {
          const code = feature.properties.code;
          const imgfeature = Jp10tenLayer.createImageFeature(feature, code, pastcontent.validtime);
          arr.push(imgfeature);
          return feature;
        });
      }
    });
    return arr;
  }

  static createImageFeature(feature, code, validtime) {
    const imgfeature = new WRAP.Geo.Feature.Image({
      point: feature.geometry.coordinates,
      image: `img/jp10ten/${code}.png`,
      width: 10,
      height: 10,
      offsetX: -5,
      offsetY: -5,
    });
    imgfeature.geo = {
      properties: {
        validtime: WrapUtils.dateFormat(validtime, 'hh:mm', 9 * 3600),
        code,
      },
    };
    return imgfeature;
  }

  displayIcon(content) {
    if (!this.visiblecodes) {
      return;
    }
    this.dhData.getData(content, (gd) => {
      if (gd && gd.length) {
        const arr = [];
        const root = gd[0];
        root.features.every((feature) => {
          const prop = feature.properties;
          const code = parseInt(prop.code, 10);
          prop.display_flag = this.visiblecodes.indexOf(code) > -1;
          const imgfeature = Jp10tenLayer.createImageFeature(feature, code, content.validtime);
          arr.push(imgfeature);
          return feature;
        });
        this.pastDatas[content.validtime] = arr;
        this.invalidate();
      }
    });
  }

  setLayerTooltip() {
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      return `${this.currentvalidtime}<br />${this.codeinfo[p.code]}`;
    });
  }
}

export default Jp10tenLayer;
