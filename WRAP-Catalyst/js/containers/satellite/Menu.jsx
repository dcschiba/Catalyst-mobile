import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import WrapUtils from '../../common/utils/WrapUtils';
import * as SatelliteActions from '../../actions/satellite';

import css from '../../../style/satellite/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  satellite: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      satellite,
    } = this.props;

    const {
      satelliteChecked,
      cloudTooltipEnabled,
      validtime,
      sat_arr,
      sat_validtime_arr,
    } = satellite;

    return (
      <div>
        <div>
          <div className={css.hordiv}>
            <Checkbox
              id="satellite_ckb"
              label="Satellite"
              checked={satelliteChecked}
              onClick={e => actions.satelliteClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <Checkbox
              id="satellite_tooltip_ckb"
              label="Tooltip"
              disabled={!satelliteChecked || !cloudTooltipEnabled}
              onClick={e => actions.satelliteTooltipClick(e.target.checked)}
            />
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <select
              id="satellite_type_select"
              disabled={!satelliteChecked}
              onChange={e => actions.satTypeChange(e.target.value)}
            >
              {sat_arr.map((tp, i) =>
                <option key={i} value={tp}>{tp}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <select
              id="satellite_validtime_select"
              value={validtime}
              disabled={!satelliteChecked}
              onChange={e => actions.satValidtimeChange(e.target.value)}
            >
              {sat_validtime_arr.map((ts, i) =>
                <option key={i} value={ts}>{WrapUtils.dateFormat(ts, 'YYYY/MM/DD hh:mm:ssZ')}</option>,
              )};
            </select>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    satellite: state.satellite.satellite,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SatelliteActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
