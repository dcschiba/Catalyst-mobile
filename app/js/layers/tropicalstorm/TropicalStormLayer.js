import { Logger, Core } from 'WRAP';
import WrapLayer from 'WRAP/UI/WrapLayer';


class TropicalStormLayer extends WrapLayer {
  constructor(conf) {
    super(conf);
    this.dispatchfunc = conf.dispatchAction;
  }

  configureCompleted() {
    Logger.debug('TropicalStormLayer configureCompleted');
    this.dhData.inspect((ref) => {
      const index = ref.query('index').value();
      const data = ref.query('data').value();
      if (index && index.index) {
        this.TropicalStormDataInspect(index, data);
      }
    }, true);
  }

  static makePlaceText(p, g) {
    let itext = '';
    itext += `大きさ：${p.specification.scale === '_missing_' ? 'なし' : p.specification.scale}`;
    itext += `  強さ：${p.specification.intensity === '_missing_' ? 'なし' : p.specification.intensity}\n`;
    itext += `場所：${p.specification.existance_area_name === '_missing_' ? 'なし' : p.specification.existance_area_name}`;
    if (g.coordinates) {
      const elat = g.coordinates[1];
      const elon = g.coordinates[0];
      const ns = (elat >= 0 ? 'N' : 'S');
      const ew = (elon >= 0 ? 'E' : 'W');
      itext += `(${ns}${elat.toFixed(2)}${ew}${elon.toFixed(2)})\n`;
    }
    itext += `中心気圧：${p.state.central_pressure}hPa\n`;
    itext += `進行方向：${p.state.moving_direction} 速度：${p.state.speed}km/h\n`;
    if (p.wind) {
      itext += `中心付近の最大風速：${p.wind.max_wind_speed} m/s\n`;
      itext += `最大瞬間風速：${p.wind.wind_gust} m/s\n`;
    }
    if (p.storm) {
      const stormstr = (p.storm.area.wide === '_missing_' ? 'なし' : `${(p.storm.area.wide + p.storm.area.narrow) / 2}km`);
      itext += `暴風域半径：${stormstr}\n`;
    }
    if (p.gale) {
      const galestr = (p.gale.area.wide === '_missing_' ? 'なし' : `${(p.gale.area.wide + p.gale.area.narrow) / 2}km`);
      itext += `強風域半径：${galestr}\n`;
    }
    return itext;
  }
  static makeJMAInfoText(tyindex, tydata) {
    // const oneData = [];
    const analyzedDate = tydata.analyzed_date;
    let infotxt = `台風${tydata.index.no}号(${tydata.index.name_kana})\n`;
    const at = new Core.DateTime(analyzedDate);
    infotxt += at.text('YYYY年MM月DD日 hh時mm分(UTC)発表\n');
    switch (tyindex.remarks) {
      case 3:
        infotxt += '台風消滅の通知(台風が温帯低気圧に変わった)\n';
        break;
      case 4:
        infotxt += '台風消滅の通知又は熱帯低気圧に関する情報終了の通知\n';
        infotxt += '(台風が最大風速17ms(34ノット)未満の熱帯低気圧に変わった\n';
        infotxt += '又は情報を発表していた熱帯低気圧が台風になる見込みがなくなった)\n';
        break;
      case 5:
        infotxt += '台風消滅の通知(台風が気象庁担当域外に進んだ)\n';
        break;
      default:
        break;
    }
    for (let t = 0; t < tydata.features.length; t += 1) {
      const p = tydata.features[t].properties;
      if (p.wrap_feature_type === 'analysis' || p.wrap_feature_type === 'forecast') {
        if (p.wrap_feature_type !== 'forecast') {
          infotxt += '●実況\n';
        } else {
          const ft = new Core.DateTime(p.wrap_forecast_date);
          infotxt += ft.text('●MM月DD日 hh時(UTC)予想\n');
        }
        infotxt += this.makePlaceText(p, tydata.features[t].geometry);
        if (p.swca) {
          const swcastr = (p.swca.area.wide === '_missing_' ? 'なし' : `${(p.swca.area.wide + p.swca.area.narrow)}km`);
          infotxt += `暴風警戒域 全域：${swcastr}\n`;
        }
      }
    }
    infotxt += '\n';
    return infotxt;
  }

  // check valid TS
  TropicalStormDataInspect(index, data) {
    const tsarr = [{ idx: 0, typhid: 'ALL', name: 'ALL' }];
    switch (this.name()) {
      case 'JMA_Typhoon': {
        const histarr = {};
        const tylist = Object.keys(index.index);
        const info = {};
        let tcount = 0;
        for (let i = 0; i < tylist.length; i += 1) {
          const histtimes = {};
          const typhid = tylist[i];             // 16221
          if (TropicalStormLayer.checkValidData(typhid, index.index)) {
            if (data[typhid]) {
              const name = data[typhid].index.no; // 1703
              const wnijmano = index.index[typhid].wrap_typhoon_no;  // 201703
              const tdNumber = data[typhid].td_number;  // JMA1704
              // make typh list
              tsarr[tcount + 1] = { idx: tcount, typhid, name, wnijmano, tdNumber };
              tcount += 1;
              for (let t = 0; t < data[typhid].features.length; t += 1) {
                const feature = data[typhid].features[t].properties;
                const dt = feature.analyzed_date;
                if (dt) {
                  const wdt = new Core.DateTime(dt);
                  const ts = wdt.text('YYYY/MM/DD hh:mm');
                  histtimes[dt] = ts;
                }
              }
              const dtar = Object.keys(histtimes).sort().reverse();
              histarr[typhid] = [];
              for (let d = 0; d < dtar.length; d += 1) {
                histarr[typhid].push({ idx: d, dt: dtar[d], ts: histtimes[dtar[d]] });
              }
              // make typh info text
              const tyindex = index.index[typhid];
              const tydata = data[typhid];
              const infotxt = TropicalStormLayer.makeJMAInfoText(tyindex, tydata);
              info[typhid] = infotxt;
            }
          }
        }
        // if (tsarr.length > 1) {
        //   tsarr.unshift({ idx: 0, typhid: 'ALL', name: 'ALL' });
        // }
        this.dispatchfunc('JMA_TYPH_HISTORY', { histarr }, this.name());
        this.dispatchfunc('JMA_TYPH_INFO', { info }, this.name());
        break;
      }
      case 'JMA_Typhoon_5days': {
        const tylist = Object.keys(index.index);
        const info5 = {};
        for (let i = 0; i < tylist.length; i += 1) {
          const typhid = tylist[i];             // 16221
          if (TropicalStormLayer.checkValidData(typhid, index.index)) {
            if (data[typhid]) {
              // make typh info text
              const tyindex = index.index[typhid];
              const tydata = data[typhid];
              const infotxt = TropicalStormLayer.makeJMAInfoText(tyindex, tydata);
              info5[typhid] = infotxt;
            }
          }
        }
        this.dispatchfunc('JMA_TYPH_5days_INFO', { info5 }, this.name());
        break;
      }
      case 'JTWC_Typhoon':
      case 'WNI_TropicalStorm': {
        const tylist = Object.keys(index.index);
        let count = 0;
        for (let i = 0; i < tylist.length; i += 1) {
          const typhid = tylist[i];
          const name = typhid;
          if (TropicalStormLayer.checkValidData(typhid, index.index)) {
            if (data[typhid]) {
              tsarr[count + 1] = { idx: i, typhid, name };
              count += 1;
            }
          }
        }
        break;
      }
      default: {
        Logger.debug('TropicalStormDataInspect unknown data');
        break;
      }
    }
    tsarr.sort((a, b) => {
      if (a.typhid === 'ALL') return -1;
      if (b.typhid === 'ALL') return 1;
      if (a.typhid > b.typhid) return 1;
      if (a.typhid < b.typhid) return -1;
      return 0;
    });
    this.dispatchfunc(`${this.name()}_LIST`, { tsarr }, this.name());
  }

  // この台風は有効か返す(消滅してから1日経ったものを判定する予定)
  static checkValidData(tyid, index, data, histinfo) {
    if (!histinfo) {
      if (index[tyid].final_flag > 0) {
        const it = new Core.DateTime(index[tyid].issue_date);
        const nt = new Core.DateTime();
        const diffs = it.diff(nt);
        if (diffs > 60 * 60 * 24) {
          return false;
        }
      }
      return true;
    }
    if (histinfo[tyid]) {
      // 5日間予報用。経路の最新と本体のannouncedを比較してissue_date < 経路最新-6時間ならおわり
      const analysisDate = new Core.DateTime(histinfo[tyid][0].dt);
      const issueDate = new Core.DateTime(data[tyid].analyzed_date);
      const diffsecond = issueDate.diff(analysisDate);
      if (diffsecond > 60 * 60 * 6) {
        return false;
      }
    }
    return true;
  }

  setLayerContent(key, histinfo) {
    const index = this.dhData.query('index').value();
    const data = this.dhData.query('data').value();
    if (!index || !index.index) {
      return;
    }
    const tylist = Object.keys(index.index);
    for (let i = 0; i < tylist.length; i += 1) {
      const tyid = tylist[i];
      if (data[tyid]) {
        if (!TropicalStormLayer.checkValidData(tyid, index.index, data, histinfo)) {
          data[tyid].display_flag = false;
        } else {
          data[tyid].display_flag = (tyid === key || key === 'ALL');
        }
      }
    }
    this.invalidate();
  }
  ctrlStormElements(track, low, est, ftrack, fcircle, awind, fwind, hist) {
    this.setAttributes({
      show_track_history: track,
      show_track: track,
      show_td_low: (track && low),
      show_estimate: (track && est),
      show_forecast_track: ftrack,
      show_forcast_track: ftrack,
      show_forecast_circle: fcircle,
      show_analysis_wind_radii: awind,
      show_forecast_wind_radii: fwind,
      show_swca: fwind,
      track_circle_time: hist,
      custom_icon_time: hist,
      show_datetime: (track || ftrack || fcircle || awind || fwind),
    });
  }
}
export default TropicalStormLayer;
