import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import comcss from '../../../style/common/legend.css';
import * as FixActions from '../../actions/fix';
import css from '../../../style/fix/menu.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.fixClick(false);
    actions.deleteLegend('fix');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(350, 150);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} />
          <span className={css.legendtext}>
            <img src="img/fix/triangle_01.png" width="15" height="15" alt="" />
            Compulsory Reporting Point </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} />
          <span className={css.legendtext}>
            <img src="img/fix/triangle_02.png" width="15" height="15" alt="" />
            Non-compulsory Reporting Point </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} />
          <span className={css.legendtext}>
            <img src="img/fix/Fly-by_WPT.png" width="15" height="15" alt="" /> RNAV Waypoint
          </span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fix: state.fix,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, FixActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
