import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tooltip from 'rc-tooltip';
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import '!!style-loader!css-loader!rc-tooltip/assets/bootstrap.css';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import WRAP from 'WRAP';
import WrapController from 'WRAP/UI/WrapController';
import * as JmaWarnActions from '../actions/jmawarn';
import * as JmaSanWarnActions from '../actions/jmaseawarn';
import * as LegendActions from '../actions/legend';
import * as GraphActions from '../actions/graph';
import AmedasGraph from '../components/amedas/Graph';
import css from '../../style/overmapdiv.css';
import sigmetcss from '../../style/sigmet/overmapdiv.css';
import jmawarncss from '../../style/jmawarn/overmapdiv.css';
import jmaseawarncss from '../../style/jmaseawarn/overmapdiv.css';
import notDecipherRed from '../../img/not_decipher_red.png';

const propTypes = {
  actions: PropTypes.object,
  showContents: PropTypes.array,
  jmawarn: PropTypes.object,
  jmaseawarn: PropTypes.object,
  sigmet: PropTypes.object,
  amedas: PropTypes.object,
  graph: PropTypes.object,
};


class OverMapDiv extends Component {
  static jmawarnRefreshClick() {
    const warnLayer = WrapController.getLayer('WX_JMA_Warn');
    if (warnLayer && warnLayer.dhData) {
      warnLayer.dhData.load();
    }
  }
  static jamseawarnRefreshClick(type) {
    let warnLayer;
    if (type === 'warning') {
      warnLayer = WrapController.getLayer('WX_JMA_SeaWarn');
    } else {
      warnLayer = WrapController.getLayer('WX_JMA_SeaForecast');
    }
    if (warnLayer && warnLayer.dhData) {
      warnLayer.dhData.load();
    }
  }

  static jmaseawarnShowtypeChange(value, jmaseawarnChecked, actions) {
    actions.jmaseawarnShowtypeChange(value);
    if (jmaseawarnChecked && value === 'warning') {
      actions.addLegend('jmaseawarn');
    } else {
      actions.deleteLegend('jmaseawarn');
    }
  }

  constructor(props) {
    super(props);
    this.amedasClickHandle = this.amedasClickHandle.bind(this);
  }

  componentWillMount() {
    const { showContents } = this.props;
    if (showContents.indexOf('amedas') > -1) {
      WRAP.Geo.addEventHandler('touch', this.amedasClickHandle);
    }
  }

  amedasClickHandle(layer, feature) {
    if (layer && layer.name() === 'WX_JMA_Amedas') {
      const { actions } = this.props;
      const amsid = feature.tooltipdata.amsid;
      const endpoint = `${WrapController.dhkeyoption.apppath}cgi-bin/get_amedas.cgi?amsid=${amsid}&hours=2`;
      actions.loadGraphData(endpoint);
    }
  }

  render() {
    const { showContents } = this.props;
    if (!showContents || showContents.length === 0) {
      return (<div />);
    }
    let jmawarndiv = <div />;
    if (showContents.indexOf('jmawarn') > -1) {
      const { jmawarn } = this.props;
      const { announceddate, jmawarnChecked } = jmawarn;
      if (jmawarnChecked) {
        jmawarndiv = (<div className={jmawarncss.basediv}>
          <div className={jmawarncss.anndiv}>{`JMA Warn最新発表時刻: ${announceddate}`}</div>
          <div className={jmawarncss.btdiv}>
            <button
              className={jmawarncss.button}
              onClick={OverMapDiv.jmawarnRefreshClick}
            >更新</button>
          </div>
        </div>);
      }
    }

    let jmaseawarndiv = <div />;
    if (showContents.indexOf('jmaseawarn') > -1) {
      const { jmaseawarn, actions } = this.props;
      const { announceddate, forecastannounceddate, showtype, jmaseawarnChecked } = jmaseawarn;
      if (jmaseawarnChecked) {
        const ann = (showtype === 'warning' ? announceddate : forecastannounceddate);
        jmaseawarndiv = (<div>
          <div className={jmaseawarncss.basediv}>
            <div className={css.anndiv}>{`JMA SeaWarn最新発表時刻: ${ann}`}</div>
            <div className={jmaseawarncss.btdiv}>
              <button
                className={jmaseawarncss.button}
                onClick={() => OverMapDiv.jamseawarnRefreshClick(showtype)}
              >更新</button>
            </div>
          </div>
          <div className={jmaseawarncss.basediv}>
            <RadioButtonGroup
              name="warnrdg"
              defaultSelected="warning"
              onChange={(e, value) => {
                OverMapDiv.jmaseawarnShowtypeChange(value, jmaseawarnChecked, actions);
              }
              }
            >
              <RadioButton
                style={{ display: 'inline-block', width: '100px' }}
                value="warning"
                label="警報"
              />
              <RadioButton
                style={{ display: 'inline-block', width: '100px' }}
                value="forecast"
                label="予報"
              />
            </RadioButtonGroup>
          </div>
        </div>);
      }
    }

    let sigmetdiv = <div />;
    if (showContents.indexOf('sigmet') > -1) {
      const { sigmet } = this.props;
      const { sigmetChecked, sigmetNotreadVisible, sigmetNotreadArr } = sigmet;
      sigmetdiv = (<div
        className={
          (sigmetChecked && sigmetNotreadVisible)
            ? sigmetcss.divVisible
            : sigmetcss.divHidden}
      >
        SIGMET Unanalysable
        {sigmetNotreadArr.map((sigmetnotread, key) =>
          <Tooltip
            key={key}
            placement="bottom"
            trigger={['hover']}
            overlayClassName={sigmetcss.tooltip}
            overlay={
              <span>
                {sigmetnotread.bltin}
              </span>
            }
          >
            <div className={sigmetcss.center}>
              <div className={sigmetcss.tooltipbasetext}>{sigmetnotread.text}</div>
              <img src={notDecipherRed} alt="weathernew" />
            </div>
          </Tooltip>,
        )}
      </div>);
    }

    let amedasgraphdiv = <div />;
    const { amedas, graph } = this.props;
    if (showContents.indexOf('amedas') > -1 && amedas.showchecked) {
      amedasgraphdiv = <AmedasGraph data={graph.data} />;
    }
    return (
      <div className={css.basediv}>
        {jmawarndiv}
        {jmaseawarndiv}
        {sigmetdiv}
        {amedasgraphdiv}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { catalyst, sigmet, jmawarn, jmaseawarn, amedas, graph } = state;
  return {
    showContents: catalyst.showContents,
    jmawarn,
    jmaseawarn,
    sigmet,
    amedas,
    graph,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        JmaWarnActions,
        JmaSanWarnActions,
        LegendActions,
        GraphActions,
      ),
      dispatch),
  };
}

OverMapDiv.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OverMapDiv);
