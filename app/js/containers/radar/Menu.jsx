import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import WrapController from 'WRAP/UI/WrapController';
import * as RadarActions from '../../actions/radar';
import * as LegendActions from '../../actions/legend';

import css from '../../../style/radar/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  radar: PropTypes.object.isRequired,
};

const JpRadarActivityStatus = [
  '電文受信なし',
  'エコーあり',
  'No Echo',
  'No Operation',
];


class Menu extends Component {
  static jpRadarValidtimeChange(e, actions, jpActivity, WXJPRadar) {
    actions.jpRadarValidtimeChange(e.target.value);
    const jpts = WXJPRadar[e.target.value];
    if (jpts) {
      const jptm = jpts.tm;
      if (jptm) {
        if (jpActivity[jptm]) {
          actions.jpRadarActivityChange(jptm);
        } else {
          actions.loadJPRadarActivity(WrapController.dhkeyoption.baseurl,
             WXJPRadar[e.target.value].tm);
        }
      }
    }
  }

  static getJpRadarName(code) {
    if (Menu.JpRadarActivityMaster && Menu.JpRadarActivityMaster[code]) {
      return Menu.JpRadarActivityMaster[code];
    }
    return code;
  }

  static radarClick(e, actions, jpChecked) {
    const radarchecked = e.target.checked;
    actions.radarClick(radarchecked);
    if (jpChecked) {
      if (radarchecked) {
        actions.addLegend('radar');
      } else {
        actions.deleteLegend('radar');
      }
    }
  }

  static jpRadarClick(e, actions, jpActivitySelect, WXJPRadar) {
    actions.jpRadarClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('radar');
    } else {
      actions.deleteLegend('radar');
    }
    if (Object.keys(jpActivitySelect).length < 1) {
      actions.loadJPRadarActivity(WrapController.dhkeyoption.baseurl, WXJPRadar[0].tm);
    }
  }

  // componentWillMount() {
  //   fetch(`./pri/conf/app/JpRadarActivity.json?t=${new Date().getTime()}`)
  //   .then(response => response.json())
  //   .then((json) => {
  //     Menu.JpRadarActivityMaster = json;
  //     Menu.JpRadarActivityMasterIndex = {};
  //     const keys = Object.keys(json);
  //     for (let i = 0; i < keys.length; i += 1) {
  //       Menu.JpRadarActivityMasterIndex[keys[i]] = i;
  //     }
  //   });
  // }

  render() {
    const {
      actions,
      radar,
    } = this.props;

    const {
      radarChecked,
      coverageChecked,
      WX_JP_Radar,
      WX_US_AK_Radar,
      WX_US_GU_Radar,
      WX_US_HI_Radar,
      WX_US_NA_Radar,
      WX_US_PR_Radar,
      WX_EU_Radar,
      WX_AU_Radar,
      WX_KR_Radar,
      WX_TW_Radar,
      JMA_OBS_RADAR_ECHINT_JP_5min,
      jpvalidtimeidx,
      auvalidtimeidx,
      usAkvalidtimeidx,
      usGuvalidtimeidx,
      usHivalidtimeidx,
      usNavalidtimeidx,
      usPrvalidtimeidx,
      euvalidtimeidx,
      twvalidtimeidx,
      krvalidtimeidx,
      jpicdbChecked,
      jpicdbvalidtimeidx,
      jpActivity,
      jpChecked,
      jpActivitySelect,
      // jmaprcrinChecked,
      // jmaprcrinvalidtimeidx,
      // JMA_PRCRIN,
      jmaprcrinextraChecked,
      jmaprcrinextravalidtimeidx,
      JMA_ANLSIS_PRCRIN_EXTRA,
      ecobsradarechintcaChecked,
      ecobsradarechintcaidtimeidx,
      EC_OBS_RADAR_ECHINT_CA,
    } = radar;

    let jpActivitycss = css.radarActivityHide;
    if (jpChecked) {
      jpActivitycss = css.radarActivityShow;
    }

    let jpActivitySelectkey = Object.keys(jpActivitySelect);
    jpActivitySelectkey = jpActivitySelectkey.filter(key => key !== 'announced_date');

    if (Menu.JpRadarActivityMasterIndex) {
      jpActivitySelectkey.sort((a, b) => {
        const aidx = Menu.JpRadarActivityMasterIndex[a];
        const bidx = Menu.JpRadarActivityMasterIndex[b];
        if (aidx > bidx) return 1;
        if (aidx < bidx) return -1;
        return 0;
      });
    }

    return (
      <div>
        <div>
          <div className={css.hordiv}>
            <Checkbox
              id="radar"
              label="Radar"
              checked={radarChecked}
              onClick={e => Menu.radarClick(e, actions, jpChecked)}
            />
          </div>
          <div className={css.hordiv2}>
            <Checkbox
              label="coverage"
              checked={coverageChecked}
              disabled={!radarChecked}
              onClick={e => actions.radarCoverageClick(e.target.checked)}
            />
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="JP"
              checked={jpChecked}
              disabled={!radarChecked}
              onClick={
                e => Menu.jpRadarClick(e, actions, jpActivitySelect, WX_JP_Radar)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={jpvalidtimeidx}
              onChange={e => Menu.jpRadarValidtimeChange(e, actions, jpActivity, WX_JP_Radar)}
            >
              {WX_JP_Radar.map((ts, i) =>
                <option key={ts.tm} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="US_AK"
              disabled={!radarChecked}
              onClick={e => actions.usAkRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={usAkvalidtimeidx}
              onChange={e => actions.usAkRadarValidtimeChange(e.target.value)}
            >
              {WX_US_AK_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="US_GU"
              disabled={!radarChecked}
              onClick={e => actions.usGuRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={usGuvalidtimeidx}
              onChange={e => actions.usGuRadarValidtimeChange(e.target.value)}
            >
              {WX_US_GU_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="US_HI"
              disabled={!radarChecked}
              onClick={e => actions.usHiRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={usHivalidtimeidx}
              onChange={e => actions.usHiRadarValidtimeChange(e.target.value)}
            >
              {WX_US_HI_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="US_NA"
              disabled={!radarChecked}
              onClick={e => actions.usNaRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={usNavalidtimeidx}
              onChange={e => actions.usNaRadarValidtimeChange(e.target.value)}
            >
              {WX_US_NA_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="US_PR"
              disabled={!radarChecked}
              onClick={e => actions.usPrRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={usPrvalidtimeidx}
              onChange={e => actions.usPrRadarValidtimeChange(e.target.value)}
            >
              {WX_US_PR_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="EU"
              disabled={!radarChecked}
              onClick={e => actions.euRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={euvalidtimeidx}
              onChange={e => actions.euRadarValidtimeChange(e.target.value)}
            >
              {WX_EU_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="AU"
              disabled={!radarChecked}
              onClick={e => actions.auRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={auvalidtimeidx}
              onChange={e => actions.auRadarValidtimeChange(e.target.value)}
            >
              {WX_AU_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="KR"
              disabled={!radarChecked}
              onClick={e => actions.krRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={krvalidtimeidx}
              onChange={e => actions.krRadarValidtimeChange(e.target.value)}
            >
              {WX_KR_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="TW"
              disabled={!radarChecked}
              onClick={e => actions.twRadarClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={!radarChecked}
              value={twvalidtimeidx}
              onChange={e => actions.twRadarValidtimeChange(e.target.value)}
            >
              {WX_TW_Radar.map((ts, i) =>
                <option key={i} value={i}>{ts.ts}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="JP_ICDB"
              disabled={!radarChecked}
              onClick={e => actions.jpICDBRadarClick(e.target.checked)}
            />
          </div>
        </div>
        <div className={css.hordiv3}>
          <select
            disabled={!radarChecked}
            value={jpicdbvalidtimeidx}
            onChange={e => actions.jpICDBRadarValidtimeChange(e.target.value)}
          >
            {JMA_OBS_RADAR_ECHINT_JP_5min.map((ts, i) =>
              <option key={i} value={i}>{ts.ts}</option>,
            )};
          </select>
        </div>
        <div className={css.hordiv3}>
          <Checkbox
            label="JP_ECHOTOP"
            disabled={!radarChecked || !jpicdbChecked}
            onClick={e => actions.jpEchoTopClick(e.target.checked)}
          />
        </div>
        <div>
          {/* <div className={css.hordiv2}>
            <Checkbox
              disabled={!radarChecked}
              label="JMA_PRCRIN"
              onClick={e => actions.jmaPrcrinClick(e.target.checked)}
            />
            <div className={css.hordiv2}>
              <select
                disabled={!radarChecked || !jmaprcrinChecked}
                value={jmaprcrinvalidtimeidx}
                onChange={e => actions.jmaPrcrinValidtimeChange(e.target.value)}
              >
                {JMA_PRCRIN.map((ts, i) =>
                  <option key={i} value={i}>{ts.ts}</option>,
                )};
              </select>
            </div>
          </div> */}
          <div className={css.hordiv2}>
            <Checkbox
              disabled={!radarChecked}
              label="JMA_PRCRIN"
              onClick={e => actions.jmaPrcrinExtraClick(e.target.checked)}
            />
            <div className={css.hordiv2}>
              <select
                disabled={!radarChecked || !jmaprcrinextraChecked}
                value={jmaprcrinextravalidtimeidx}
                onChange={e => actions.jmaPrcrinExtraValidtimeChange(e.target.value)}
              >
                {JMA_ANLSIS_PRCRIN_EXTRA.map((ts, i) =>
                  <option key={i} value={i}>{ts.ts}</option>,
                )};
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              disabled={!radarChecked}
              label="OBS_RADAR_CA"
              onClick={e => actions.ecObsRadarEchintCaClick(e.target.checked)}
            />
            <div className={css.hordiv2}>
              <select
                disabled={!radarChecked || !ecobsradarechintcaChecked}
                value={ecobsradarechintcaidtimeidx}
                onChange={e => actions.ecObsRadarEchintCaValidtimeChange(e.target.value)}
              >
                {EC_OBS_RADAR_ECHINT_CA.map((ts, i) =>
                  <option key={i} value={i}>{ts.ts}</option>,
                )};
              </select>
            </div>
          </div>
        </div>
        <div className={jpActivitycss}>
          <p>JP Radar Activity</p>
          {jpActivitySelectkey.map((key, i) =>
            <div
              className={jpActivitySelect[key] === 0 || jpActivitySelect[key] === 3
              ? css.graycolor : css.bluecolor} key={i}
            >
              <label htmlFor className={css.labelwidth}>{Menu.getJpRadarName(key)}</label>
              ： {JpRadarActivityStatus[jpActivitySelect[key]]}
            </div>,
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    radar: state.radar.radar,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(RadarActions, LegendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
