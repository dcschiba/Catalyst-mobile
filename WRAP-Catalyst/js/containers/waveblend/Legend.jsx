import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as WaveBlendActions from '../../actions/waveblend';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/waveblend/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.waveBlendClick(false);
    actions.deleteLegend('waveblend');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(150, 120);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#34B1F0' }} />
          <span className={css.legendtext}> ≥ 2.0 </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#1B34CB' }} />
          <span className={css.legendtext}> ≥ 4.0 </span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    waveBlend: state.waveBlend,
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
