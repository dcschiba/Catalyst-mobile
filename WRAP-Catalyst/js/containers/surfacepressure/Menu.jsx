import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as SurfacePressureActions from '../../actions/surfacepressure';
import css from '../../../style/surfacepressure/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  surfacepressure: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions, surfacepressure,
    } = this.props;

    const {
      surfacePressureChecked,
      subDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = surfacepressure;

    const basetimeItems = [];
    basetime.map((time, i) =>
      basetimeItems.push(<MenuItem key={i} value={i} primaryText={time} />));
    const validtimeItems = [];
    const sltbasetime = basetime[basetimeidx];
    const tsarr = tsobj[sltbasetime];
    if (tsarr) {
      tsarr.map((ts, i) =>
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    }

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label={<FormattedMessage id="surfacepressure.surfacepressure" />}
          checked={surfacePressureChecked}
          onClick={e => actions.surfacePressureClick(e.target.checked)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.surfacePressureBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.surfacePressureValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    surfacepressure: state.surfacepressure,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SurfacePressureActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
