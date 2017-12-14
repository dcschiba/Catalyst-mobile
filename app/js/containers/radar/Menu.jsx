import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import WrapController from 'WRAP/UI/WrapController';
import * as RadarActions from '../../actions/radar';
import * as LegendActions from '../../actions/legend';
import * as InitActions from '../../actions/layerInit';
import css from '../../../style/radar/menu.css';
import { styles, childWrapper } from '../../utils/menuStyle';


const propTypes = {
  actions: PropTypes.object.isRequired,
  radar: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
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
  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { actions, layerInitflags, isLoading, radar } = this.props;
      if (!layerInitflags.radar && isLoading
        && radar.JMA_ANLSIS_PRCRIN_EXTRA.length !== 0
      ) {
        actions.layerInit({ radar: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);
    const waitForMapInitialize = setInterval(() => {
      const { actions, isLoading } = this.props;
      if (!isLoading) {
        actions.radarClick(true);
        actions.jmaPrcrinExtraValidtimeChange(12);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions,
      radar,
    } = this.props;

    const {
      radarChecked,
      coverageChecked,
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
      jpChecked,
      jpActivitySelect,
      jmaprcrinextraChecked,
      jmaprcrinextravalidtimeidx,
      JMA_ANLSIS_PRCRIN_EXTRA,
      ecobsradarechintcaChecked,
      ecobsradarechintcaidtimeidx,
      EC_OBS_RADAR_ECHINT_CA,
      usAkChecked,
      usGuChecked,
      usHiChecked,
      usNaChecked,
      usPrChecked,
      euChecked,
      auChecked,
      krChecked,
      twChecked,
      jpechotopChecked,
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
        <Checkbox
          id="radar"
          label="Radar"
          checked={radarChecked}
          onClick={e => Menu.radarClick(e, actions, jpChecked)}
          iconStyle={styles.checkbox.leftPosition.icon}
          labelStyle={styles.checkbox.leftPosition.label}
        />
        <Checkbox
          label="coverage"
          checked={coverageChecked}
          disabled={!radarChecked}
          onClick={e => actions.radarCoverageClick(e.target.checked)}
          iconStyle={styles.checkbox.leftPosition.icon}
          labelStyle={styles.checkbox.leftPosition.label}
        />
        <div style={styles.line}>
          <Checkbox
            label="JMA_PRCRIN"
            checked={jmaprcrinextraChecked}
            disabled={!radarChecked}
            onClick={e => actions.jmaPrcrinExtraClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !jmaprcrinextraChecked}
            value={jmaprcrinextravalidtimeidx}
            onChange={(event, index, value) => actions.jmaPrcrinExtraValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {JMA_ANLSIS_PRCRIN_EXTRA.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="US_AK"
            checked={usAkChecked}
            disabled={!radarChecked}
            onClick={e => actions.usAkRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !usAkChecked}
            value={usAkvalidtimeidx}
            onChange={(event, index, value) => actions.usAkRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_US_AK_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="US_GU"
            checked={usGuChecked}
            disabled={!radarChecked}
            onClick={e => actions.usGuRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !usGuChecked}
            value={usGuvalidtimeidx}
            onChange={(event, index, value) => actions.usGuRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_US_GU_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="US_HI"
            checked={usHiChecked}
            disabled={!radarChecked}
            onClick={e => actions.usHiRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !usHiChecked}
            value={usHivalidtimeidx}
            onChange={(event, index, value) => actions.usHiRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_US_HI_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="US_NA"
            checked={usNaChecked}
            disabled={!radarChecked}
            onClick={e => actions.usNaRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !usNaChecked}
            value={usNavalidtimeidx}
            onChange={(event, index, value) => actions.usNaRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_US_NA_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="US_PR"
            checked={usPrChecked}
            disabled={!radarChecked}
            onClick={e => actions.usPrRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !usPrChecked}
            value={usPrvalidtimeidx}
            onChange={(event, index, value) => actions.usPrRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_US_PR_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="EU"
            checked={euChecked}
            disabled={!radarChecked}
            onClick={e => actions.euRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !euChecked}
            value={euvalidtimeidx}
            onChange={(event, index, value) => actions.euRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_EU_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="AU"
            checked={auChecked}
            disabled={!radarChecked}
            onClick={e => actions.auRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !auChecked}
            value={auvalidtimeidx}
            onChange={(event, index, value) => actions.auRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_AU_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="KR"
            checked={krChecked}
            disabled={!radarChecked}
            onClick={e => actions.krRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !krChecked}
            value={krvalidtimeidx}
            onChange={(event, index, value) => actions.krRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_KR_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="TW"
            checked={twChecked}
            disabled={!radarChecked}
            onClick={e => actions.twRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !twChecked}
            value={twvalidtimeidx}
            onChange={(event, index, value) => actions.twRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {WX_TW_Radar.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={styles.line}>
          <Checkbox
            label="JP_ICDB"
            disabled={!radarChecked}
            checked={jpicdbChecked}
            onClick={e => actions.jpICDBRadarClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !jpicdbChecked}
            value={jpicdbvalidtimeidx}
            onChange={(event, index, value) => actions.jpICDBRadarValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {JMA_OBS_RADAR_ECHINT_JP_5min.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
        </div>
        <div style={childWrapper(1, jpicdbChecked)}>
          <Checkbox
            label="JP_ECHOTOP"
            checked={jpechotopChecked}
            disabled={!radarChecked || !jpicdbChecked}
            onClick={e => actions.jpEchoTopClick(e.target.checked)}
          />
        </div>
        <div style={styles.line}>
          <Checkbox
            label="OBS_RADAR_CA"
            checked={ecobsradarechintcaChecked}
            disables={!radarChecked}
            onClick={e => actions.ecObsRadarEchintCaClick(e.target.checked)}
            iconStyle={styles.checkbox.leftPosition.icon}
            labelStyle={styles.checkbox.leftPosition.label}
          />
          <SelectField
            disabled={!radarChecked || !ecobsradarechintcaChecked}
            value={ecobsradarechintcaidtimeidx}
            onChange={(event, index, value) => actions.ecObsRadarEchintCaValidtimeChange(value)}
            style={styles.select.rightPosition}
          >
            {EC_OBS_RADAR_ECHINT_CA.slice(0, 20).map((ts, i) =>
              <MenuItem key={i} value={i} primaryText={ts.ts} />,
            )}
          </SelectField>
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
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(RadarActions, LegendActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
