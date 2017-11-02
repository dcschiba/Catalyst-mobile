import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import NavTropicalStorm from './NavTropicalStorm';
import * as TropicalStormActions from '../../actions/tropicalstorm';
import * as LegendActions from '../../actions/legend';

import css from '../../../style/tropicalstorm/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  tropicalstorm: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.tropicalstormClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('tropicalstorm');
    } else {
      actions.deleteLegend('tropicalstorm');
    }
  }
  componentWillUnmount() {
    const { actions } = this.props;
    actions.tropicalstormClick(false);
  }
  render() {
    const {
      actions,
      tropicalstorm,
    } = this.props;

    const {
      tropChecked,
      tsContent,
      jmatyphoonidx,
      jma_History,
      jmaHistoryidx,
      jma5FTrackChecked,
      jma5FCircleChecked,
      jma3WniChecked,
      jma3JtwcChecked,
      wniRelationidx,
      WX_WNI_Relation,
    } = tropicalstorm;

    let jmaSelectedHist = [];
    if (jmatyphoonidx === 'ALL') {
      const tys = Object.keys(jma_History);
      for (let i = 0; i < tys.length; i += 1) {
        jmaSelectedHist = jmaSelectedHist.concat(jma_History[tys[i]]);
      }
    } else if (jma_History[jmatyphoonidx]) {
      jmaSelectedHist = jmaSelectedHist.concat(jma_History[jmatyphoonidx]);
    }
    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          checked={tropChecked}
          onClick={e => Menu.showClick(e, actions)}
          label={'TropicalStorm'}
        />
        <input
          id="radioAll"
          type="radio"
          name="TS_CONT"
          disabled={!tropChecked}
          value="tsAll"
          onChange={e => actions.tsChange(e.target.value)}
          checked={tsContent === 'tsAll'}
        />
        <label htmlFor={'radioAll'}>ALL</label>
        <div>
          <NavTropicalStorm {...tropicalstorm} actions={actions} />
        </div>
        <input
          id="radioHistory"
          type="radio"
          name="TS_CONT"
          disabled={!tropChecked}
          value="tsHistory"
          onChange={e => actions.tsChange(e.target.value)}
          checked={tsContent === 'tsHistory'}
        />
        <label htmlFor={'radioHistory'}>History(JMA)</label>
        <select
          disabled={tsContent !== 'tsHistory'}
          value={jmaHistoryidx}
          onChange={e => actions.jmaHistChange(e.target.value)}
        >
          {jmaSelectedHist.map(obj =>
            <option key={obj.dt} value={obj.dt}>{obj.ts}</option>,
          )};
        </select>
        <br />
        <input
          id="radio5days"
          type="radio"
          name="TS_CONT"
          disabled={!tropChecked}
          value="ts5days"
          onChange={e => actions.tsChange(e.target.value)}
          checked={tsContent === 'ts5days'}
        />
        <label htmlFor={'radio5days'}>5daysForecast(JMA)</label>
        <div className={css.hordiv3}>
          <Checkbox
            disabled={tsContent !== 'ts5days'}
            label="forecast_Track"
            onClick={e => actions.jma5FTrackClick(e.target.checked)}
            checked={jma5FTrackChecked}
          />
          <Checkbox
            disabled={tsContent !== 'ts5days'}
            label="forecast_Wind"
            onClick={e => actions.jma5FCircleClick(e.target.checked)}
            checked={jma5FCircleChecked}
          />
        </div>
        <input
          id="radio3arrow"
          type="radio"
          name="TS_CONT"
          disabled={!tropChecked}
          value="ts3arrow"
          onChange={e => actions.tsChange(e.target.value)}
          checked={tsContent === 'ts3arrow'}
        />
        <label htmlFor={'radio3arrow'}>3Arrows(JMA)</label>
        <div className={css.hordiv3}>
          <select
            disabled={tsContent !== 'ts3arrow'}
            value={wniRelationidx}
            onChange={e => actions.wniRelationTyphChange(e.target.value)}
          >
            {WX_WNI_Relation.map(obj =>
              <option key={obj.typhid} value={obj.typhid}>{obj.typhid}</option>,
            )};
            </select>
        </div>
        <br />
        <div className={css.hordiv3}>
          <Checkbox
            disabled={tsContent !== 'ts3arrow'}
            label="wni_forecast"
            labelStyle={{ color: 'green' }}
            checked={jma3WniChecked}
            onClick={e => actions.jma3WniClick(e.target.checked)}
          />
          <Checkbox
            disabled={tsContent !== 'ts3arrow'}
            label="jtwc_forecast"
            labelStyle={{ color: 'blue' }}
            checked={jma3JtwcChecked}
            onClick={e => actions.jma3JtwcClick(e.target.checked)}
          />
        </div>
        <input
          id="radioAnalogous"
          type="radio"
          name="TS_CONT"
          disabled={!tropChecked}
          value="tsAnalogous"
          onChange={e => actions.tsChange(e.target.value)}
          checked={tsContent === 'tsAnalogous'}
        />
        <label htmlFor={'radioAnalogous'}>AnalogousTS(JMA)</label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tropicalstorm: state.tropicalstorm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(TropicalStormActions, LegendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
