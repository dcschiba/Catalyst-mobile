import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RadarAmedasActions from '../../actions/radaramedas';

import css from '../../../style/satellite/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  radaramedas: PropTypes.object.isRequired,
};

class Menu extends Component {
  static formatTm(tm, i) {
    const tstr = `${tm.substr(4, 2)}/${tm.substr(6, 2)} ${tm.substr(9, 2)}:\
${tm.substr(11, 2)}:${tm.substr(13, 2)}Z`;
    if (i < 6) {
      return `${tstr}(fcst)`;
    }
    return tstr;
  }

  render() {
    const {
      actions,
      radaramedas,
    } = this.props;

    const {
      radaramedasChecked,
      validtime,
      radaramedas_validtime_arr,
    } = radaramedas;

    return (
      <div className={css.ctrlpanel}>
        <div>
          <div>
            <div className={css.hordiv}>
              <Checkbox
                label="RadarAmedas"
                checked={radaramedasChecked}
                onClick={e => actions.radaramedasClick(e.target.checked)}
              />
            </div>
          </div>
          <div>
            <div className={css.hordiv2}>
              <select
                value={validtime}
                disabled={!radaramedasChecked}
                onChange={e => actions.radaramedasValidtimeChange(e.target.value)}
              >
                {radaramedas_validtime_arr.map((ts, i) =>
                  <option key={i} value={ts}>{Menu.formatTm(ts, i)}</option>,
                )};
            </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    radaramedas: state.radaramedas.radaramedas,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RadarAmedasActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
