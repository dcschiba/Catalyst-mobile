import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as SeaSprayIcingActions from '../../actions/seasprayicing';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/seasprayicing/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.seaSprayIcingClick(false);
    actions.deleteLegend('seasprayicing');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 120);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF0000' }} />
          <span className={css.legendtext}> ≥ 2cm </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF8000' }} />
          <span className={css.legendtext}>1–2cm</span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    seaSprayIcing: state.seaSprayIcing,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, SeaSprayIcingActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
