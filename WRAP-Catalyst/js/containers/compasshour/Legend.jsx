import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as CompassHourActions from '../../actions/compasshour';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/compasshour/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.compassHourClick(false);
    actions.deleteLegend('compasshour');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 150);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
        <div><span>{'Legend goes here'}</span></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    compassHour: state.compassHour,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, CompassHourActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
