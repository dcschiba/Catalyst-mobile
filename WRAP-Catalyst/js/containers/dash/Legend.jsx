import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as DashActions from '../../actions/dash';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/dash/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.dashClick(false);
    actions.deleteLegend('dash');
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
          <div className={css.legenditem} style={{ backgroundColor: '#ff6900' }} />
          <span className={css.legendtext}>D (Danger)</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#ffff00' }} />
          <span className={css.legendtext}>S (Severe)</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#ffff99' }} />
          <span className={css.legendtext}>H (Heavy)</span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dash: state.dash,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, DashActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
