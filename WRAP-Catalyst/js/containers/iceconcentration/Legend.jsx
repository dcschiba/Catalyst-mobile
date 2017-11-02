import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as IceConcentrationActions from '../../actions/iceconcentration';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/iceconcentration/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.iceConcentrationClick(false);
    actions.deleteLegend('iceconcentration');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 80);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <span className={css.legendtext}>0.0</span>
          <div className={css.legendgrad} />
          <span className={css.legendtext}>1.0</span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    iceBerg: state.iceBerg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, IceConcentrationActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
