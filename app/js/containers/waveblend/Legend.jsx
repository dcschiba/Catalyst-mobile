import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import * as LegendActions from '../../actions/legend';
import * as WaveBlendActions from '../../actions/waveblend';
import css from '../../../style/waveblend/legend.css';

const propTypes = {
  actions: PropTypes.object,
  waveblend: PropTypes.object.isRequired,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.waveBlendClick(false);
    actions.deleteLegend('waveblend');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(220, 120);
  }

  render() {
    const {
      waveblend,
    } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#34B1F0' }} />
          <span className={css.legendtext}>
            ≥ {waveblend.lowthreshold} ({<FormattedMessage id="common.threshold" />} 1)
          </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#1B34CB' }} />
          <span className={css.legendtext}>
            ≥ {waveblend.highthreshold} ({<FormattedMessage id="common.threshold" />} 2)
          </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    waveblend: state.waveblend,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, WaveBlendActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
