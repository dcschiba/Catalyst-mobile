import WRAP from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';
import 'isomorphic-fetch';
import WrapController from 'WRAP/UI/WrapController';
import css from '../../style/disasterreport/layer.css';
import nophoto from '../../img/disasterreport/report_nophoto.jpg';
import {
  DISASTER_REPORT_CLICK,
  DISASTER_REPORT_TYPE_CHANGE,
} from '../constants/disasterreport/ActionTypes';

class DisasterReportLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.windowdiv = null;
    this.loadnum = 0;
    this.currentdate = '';
    this.bfdate = '';
    this.bfpastckdate = null;
    this.pasthour = 1;
    this.pastdata = {};
    this.datelist = [];

    WRAP.Geo.addEventHandler('touch', DisasterReportLayer.touchHandle);
    WrapController.setMapClickCallback(DisasterReportLayer.mapClickHandle);

    this.setDisasterReportTooltip();
  }

  /**
   * layer conf取得完了
   **/
  configureCompleted() {
    fetch(`${WrapController.dhkeyoption.apppath}pri/conf/app/DisasterReport.json?t=${new Date().getTime()}`)
    .then(response => response.json())
    .then((json) => {
      this.pastdataurl = json.PastDataPath.replace('%baseurl%', WrapController.dhkeyoption.baseurl);
      this.inspectData();
      this.setPastLayer();
      this.getData();
    });
  }

  /**
   * DH data オブジェクトの更新を監視する
   **/
  inspectData() {
    const dhdata = this.dhData;
    if (dhdata) {
      dhdata.inspect((ref) => {
        const curtm = new WRAP.Core.DateTime();
        const tmtext = curtm.text('YYYYMMDD');

        // 日付変わったら、元現在日付のデータを取得して、pastlayerにセットする
        // 最新日のデータを取る
        if (this.currentdate !== '' && tmtext > this.currentdate) {
          // console.log('new date-----------------------');
          this.bfdate = this.currentdate;
          this.getPastDataByDate(this.bfdate);
          this.currentdate = tmtext;
          return;
        }

        // １時間過ぎたら、過去データを再表示
        if (this.bfpastckdate) {
          const pastdiff = curtm.diff(this.bfpastckdate);
          if (pastdiff < -1 * 60 * 60) {
            // console.log('slide-----------------------');
            this.bfpastckdate = curtm;
            this.showPastData();
          }
        }

        // 現在日付データをフィルター
        DisasterReportLayer.currentDataFilter(ref, this.pasthour);
        this.invalidate();
      }, true);
    }
  }

  /**
   * 過去データ表示レイヤ(pastlayer)を生成
   **/
  setPastLayer() {
    const pastdhdata = WRAP.DH.addObject('DisasterReportPast');
    this.pastlayer = new WRAP.Geo.Layer('PastDisasterReportLayer');
    WrapController.layer.upper_layers.push(this.pastlayer);
    WRAP.Geo.setLayer(WrapController.layer);

    this.pastlayer.configure(pastdhdata, this.layerConf);
    this.pastlayer.setTooltip((geo) => {
      const p = geo && geo.properties;
      return DisasterReportLayer.getShowInfo(p);
    });
  }

  /**
   * 現在日付より、過去一週間データを取る
   **/
  getData() {
    const curtm = new WRAP.Core.DateTime();
    this.currentdate = curtm.text('YYYYMMDD');

    let i = 1;
    while (i < 8) {
      curtm.add(-1 * 24 * 60 * 60);
      const datestr = curtm.text('YYYYMMDD');
      this.datelist.push(datestr);
      this.pastdata[datestr] = null;
      this.getPastDataByDate(datestr);
      i += 1;
    }
  }

  /**
   * 過去データを取る
   * @param {String} pastdate 過去日付
   **/
  getPastDataByDate(pastdate) {
    const layerfeatures = this.layerConf.Attributes.features;
    fetch(`${this.pastdataurl}/${pastdate}.json?t=${new Date().getTime()}`)
    .then(response => response.json())
    .then((json) => {
      const jsonfeatures = json.features;
      if (jsonfeatures) {
        const imgfeature = [];
        jsonfeatures.map((item) => {
          const geometry = item.geometry;
          const icon = item.properties.icon;
          const style = DisasterReportLayer.getImageStyle(layerfeatures, icon);
          if (style) {
            const feature = new WRAP.Geo.Feature.Image({
              point: geometry.coordinates,
              image: style.url,
              width: style.width,
              height: style.height,
              offsetX: style.offset_x,
              offsetY: style.offset_y,
            });
            feature.geo = item;
            imgfeature.push(feature);
          }
          return item;
        });
        this.pastdata[pastdate] = imgfeature;
        this.pastloadComplete();
      }
    })
    .catch(() => {
      // 通信失敗時
      this.pastloadComplete();
    });
  }

  /**
   * layer.confからアイコンのスタイルを取る
   * @param {Array} features layer.conf.features
   * @param {String} icon icon key
   **/
  static getImageStyle(features, icon) {
    const filterf = features.filter((f) => {
      const selector = f.selector;
      if (selector.value === icon) {
        return f;
      }
      return null;
    });

    if (filterf && filterf.length) {
      return filterf[0].style.default;
    }
    return null;
  }

  /**
   * 過去データ取得完了
   **/
  pastloadComplete() {
    this.loadnum += 1;
    if (this.loadnum > 6) {
      if (this.loadnum > 7) {
        this.datelist.unshift(this.bfdate);
        const oldest = this.datelist.pop();
        if (this.pastdata[oldest]) {
          delete this.pastdata[oldest];
        }
      }
      this.bfpastckdate = new WRAP.Core.DateTime();
      this.showPastData();
      this.setCurrentDate();
    }
  }

  /**
   * レイヤに最新日をセットする
   **/
  setCurrentDate() {
    const dhkeyoption = WrapController.dhkeyoption || {};
    WrapController.dhkeyoption = {
      ...dhkeyoption,
      latest: this.currentdate,
    };
    WRAP.DH.set(WrapController.dhkeyoption);
  }

  /**
   * 過去データ表示
   **/
  showPastData() {
    this.pastlayer.clear();
    this.displayPastLayer(this.datelist, this.pastdata, this.pasthour);
    this.pastlayer.setVisible(this.visible());
  }

  /**
   * 現在日付のデータをフィルター
   * @param {Object} dhdata DHのデータオブジェクト
   * @param {String} showtype 表示種別
   **/
  static currentDataFilter(dhdata, showtype) {
    const basedata = dhdata.query('data').value();
    if (basedata && basedata.features) {
      const curtm = new WRAP.Core.DateTime();
      basedata.features.map((f) => {
        const prop = f.properties;
        if (showtype === 1) {
          const pfdate = prop.date;
          const wraptm = new WRAP.Core.DateTime(pfdate);
          const diff = curtm.diff(wraptm);
          prop.display_flag = (diff >= -1 * 60 * 60);
        } else {
          prop.display_flag = true;
        }
        return f;
      });
      // this.invalidate();
    }
  }

  /**
   * public
   * メニューから表示週類を切り替える
   * @param {String} showtype 表示種別
   **/
  showbyType(showtype) {
    this.pasthour = parseInt(showtype, 10);
    DisasterReportLayer.currentDataFilter(this.dhData, this.pasthour);
    this.invalidate();
    this.pastlayer.clear();
    this.displayPastLayer(this.datelist, this.pastdata, this.pasthour);
  }

  /**
   * 過去日付のデータを表示する
   * @param {Array} datelist 過去日付のデータリスト
   * @param {Object} pastdata 過去日付のデータオブジェクト
   * @param {int} pasthour 過去表示時間
   **/
  displayPastLayer(datelist, pastdata, pasthour) {
    // console.log('displayPastLayer pasthour-----', pasthour);
    const curtm = new WRAP.Core.DateTime();
    const hoursec = 60 * 60;
    for (let i = datelist.length; i > 0; i -= 1) {
      const date = datelist[i - 1];
      const pastfeatures = pastdata[date];
      if (pastfeatures && pastfeatures.length) {
        // console.log('--------------', date, pastfeatures.length);
        let testi = 0;
        pastfeatures.map((pf) => {
          testi += 1;
          if (testi > 2000) {
            return pf;
          }
          const pfdate = pf.geo.properties.date;
          const wraptm = new WRAP.Core.DateTime(pfdate);
          const diff = curtm.diff(wraptm);
          if (diff > -1 * pasthour * hoursec) {
            this.pastlayer.addFeature(pf);
          }
          return pf;
        });
      }
    }
    WRAP.Geo.invalidate();
  }

  /**
   * ツールチップ
   **/
  setDisasterReportTooltip() {
    this.setTooltip((geo) => {
      const p = geo && geo.properties;
      return DisasterReportLayer.getShowInfo(p);
    });
  }

  /**
   * ポップアップウインドウ
   **/
  static createPopupWindow() {
    const div = document.createElement('div');
    div.className = css.popupwindow;
    const clsbt = document.createElement('button');
    clsbt.className = `${css.popupbutton} ${css.camera_close}`;
    div.appendChild(clsbt);
    const infodiv = document.createElement('div');
    div.appendChild(infodiv);
    clsbt.onclick = () => {
      div.style.display = 'none';
      div.visible = false;
    };
    let [dragging, dragx, dragy, offsetx, offsety] = [false, 0, 0, 0, 0];
    div.onmousedown = (evt) => {
      dragging = true;
      dragx = div.style.left.replace(/px/, '');
      dragy = div.style.top.replace(/px/, '');
      offsetx = evt.clientX - dragx;
      offsety = evt.clientY - dragy;
      evt.preventDefault();
    };

    div.onmouseup = (evt) => {
      dragging = false;
      evt.preventDefault();
    };

    WRAP.Geo.addEventHandler('mousemove', (evt) => {
      if (dragging) {
        const x = evt.clientX - offsetx;
        const y = evt.clientY - offsety;
        div.style.left = `${x}px`;
        div.style.top = `${y}px`;
        evt.preventDefault();
      }
    });
    this.windowncreated = true;
    return div;
  }

  static mapClickHandle() {
    if (!DisasterReportLayer.clickInfo) {
      return;
    }
    const gtm = new Date().getTime();
    const { feature, sp, tm } = DisasterReportLayer.clickInfo;
    if (gtm - tm < 300) {
      DisasterReportLayer.openwindow(feature, sp);
    }
  }
  /**
   * タッチイベント ハンドラー
   **/
  static touchHandle(layer, feature, sp) {
    if (layer && layer.name().indexOf('DisasterReport') > -1) {
      if (WrapController.gmap) {
        const tm = new Date().getTime();
        DisasterReportLayer.clickInfo = { feature, sp, tm };
      } else {
        DisasterReportLayer.openwindow(feature, sp);
      }
    }
  }

  static openwindow(feature, sp) {
    const p = feature.geo && feature.geo.properties;
    let div = this.windowdiv;
    if (!div) {
      div = DisasterReportLayer.createPopupWindow();
      this.windowdiv = div;
    } else {
      div.style.display = 'block';
      div.visible = true;
    }
    div.children[1].innerHTML = DisasterReportLayer.getShowInfo(p);
    div.style.top = `${sp.y - 50}px`;
    div.style.left = `${sp.x + 50}px`;
    div.style.display = 'block';
    WrapController.mapDiv.appendChild(div);
  }

  /**
   * プップアップの表示内容
   * @param {Object} p feature.geo.properties
   **/
  static getShowInfo(p) {
    if (p) {
      const {
        title,
        photo,
        location,
        name,
        report,
        date,
      } = p;
      const dt = new WRAP.Core.DateTime(date);
      dt.add(9 * 60 * 60);
      const dtfmt = dt.text('YYYY-MM-DD hh:mm');

      let photock = photo;

      if (!photo) {
        photock = nophoto;
      }

      return `<div class='${css.popuptitle}'>${title}</div>
            <Hr class='${css.hr}'>
            <div class='${css.popupcontentbody}'>
                <div class='${css.imgdiv}'>
                  <img src='${photock}'/>
                </div>
                <div class='${css.popupcontent}'>
                ${location}<br><br>
                ${name === null ? '' : name}<br>
                ${dtfmt}<br><br>
                ${report}
                </div>
            </div>`;
    }
    return null;
  }
  ctrlLayer(type, state) {
    const { disasterReportChecked, showtype } = state.disasterreport;
    if (type === DISASTER_REPORT_CLICK) {
      this.setVisible(disasterReportChecked);
      if (this.pastlayer) {
        this.pastlayer.setVisible(disasterReportChecked);
      }
    } else if (type === DISASTER_REPORT_TYPE_CHANGE) {
      this.showbyType(showtype);
    }
  }
}

export default DisasterReportLayer;
