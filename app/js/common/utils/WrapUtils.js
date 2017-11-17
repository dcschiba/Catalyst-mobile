import WRAP from 'WRAP';

class WrapUtils {
  /**
  * @param date {String} 文字列表現された時間（YYYY/MM/DDT/hh/mm/ss形式）
  * @param format {String} Y,M,D,h,m,sと任意デリミタでフォーマットを表現
  * @param sec {Number} 秒
  */
  static dateFormat(date, format = 'MM/DD hh:mm', sec = 0) {
    const wdate = new WRAP.Core.DateTime(date);
    if (sec !== 0) {
      wdate.add(sec);
    }
    return wdate.text(format);
  }

  static setMessageJson(json) {
    WrapUtils.messages = json;
  }

  static getMessageJson(id) {
    if (WrapUtils.messages && WrapUtils.messages[id]) {
      return WrapUtils.messages[id];
    }
    return id;
  }

  static metertoft(v) {
    return `${Math.floor(v * 3.28084)}ft`;
  }

  static latlondir(ll, flag) {
    let f = '';
    if (flag === 'lat') {
      f = ll < 0 ? 'S' : 'N';
    } else {
      f = ll < 0 ? 'W' : 'E';
    }
    const lll = `${ll}`.replace('-', '');

    return `${f}${lll}`;
  }

  static latlonfmt60(ll, f) {
    const d = parseInt(ll, 10);
    const m = (ll - d) * 60;
    const mi = parseInt(m, 10);
    const s = parseInt((m - mi) * 100, 10);
    return `${f}${d}-${mi}.${s}`;
  }


  /* static fmtJpcharstr(ann) {
    const anndt = new WRAP.Core.DateTime(ann);
    anndt.add(9 * 60 * 60);
    return anndt.text('DD日hh時mm分');
  }

  static timeStringJST(ann) {
    const anndt = new WRAP.Core.DateTime(ann);
    anndt.add(9 * 60 * 60);
    return anndt.text('YYYY/MM/DD hh:mm');
  }
  static timeString(tm, year) {
    const yearstr = year ? `${tm.substr(0, 4)}/` : '';
    return `${yearstr}${tm.substr(4, 2)}/${tm.substr(6, 2)} \
    ${tm.substr(9, 2)}:${tm.substr(11, 2)}`;
  }
  static timeymdhZString(tm, year) {
    const yearstr = year ? `${tm.substr(0, 4)}/` : '';
    return `${yearstr}${tm.substr(4, 2)}/${tm.substr(6, 2)} \
${tm.substr(9, 2)}:${tm.substr(11, 2)}Z`;
  }
  static timeymdhmZString(tm) {
    return `${tm.substr(4, 2)}/\
${tm.substr(6, 2)} ${tm.substr(9, 2)}:${tm.substr(11, 2)}:${tm.substr(13, 2)}Z`;
  }
  static timeymdString(tm) {
    return `${tm.substr(0, 4)}/${tm.substr(4, 2)}/${tm.substr(6, 2)}`;
  }

  static timehmString(tm) {
    return `${tm.substr(9, 2)}:${tm.substr(11, 2)}Z`;
  }

  static timeStringUTC(tm) {
    const yearstr = `${tm.substr(0, 4)}/`;
    return `${yearstr}${tm.substr(4, 2)}/${tm.substr(6, 2)} \
${tm.substr(9, 2)}${tm.substr(11, 2)}UTC`;
  }*/

}

export default WrapUtils;
