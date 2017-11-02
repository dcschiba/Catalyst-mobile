import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as SeaVisibilityActions from '../../actions/seavisibility';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/seavisibility/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.seaVisibilityClick(false);
    actions.deleteLegend('seavisibility');
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
          <span className={css.legendtext}>0–1 Nautical mile</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#00FF00' }} />
          <span className={css.legendtext}>1–2 Nautical mile</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#0000FF' }} />
          <span className={css.legendtext}>2–3 Nautical mile</span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    seaVisibility: state.seaVisibility,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, SeaVisibilityActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
