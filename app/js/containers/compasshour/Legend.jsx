import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as CompassHourActions from '../../actions/compasshour';
import css from '../../../style/compasshour/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.compassHourWiwwClick(false);
    actions.deleteLegend('compasshour');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(180, 180);
  }

  render() {
    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF2800' }} />
          <span className={css.legendtext}> {<FormattedMessage id="compasshour.clear" />} </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF9900' }} />
          <span className={css.legendtext}> {<FormattedMessage id="compasshour.sunny" />} </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#AAAAAA' }} />
          <span className={css.legendtext}> {<FormattedMessage id="compasshour.cloudy" />} </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#0041FF' }} />
          <span className={css.legendtext}> {<FormattedMessage id="compasshour.rainy" />} </span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FFFFFF' }} />
          <span className={css.legendtext}> {<FormattedMessage id="compasshour.snowy" />} </span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    compassHour: state.compassHour,
    locale: state.locale.locale,
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
