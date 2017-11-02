import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import * as WindBarbsActions from '../../actions/windbarbs';

import css from '../../../style/windbarbs/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  windbarbs: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions, windbarbs,
    } = this.props;

    const {
      windBarbsChecked,
      subDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
      threshold,
    } = windbarbs;

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
      <div>
        <CheckBox
          value={basetimeidx}
          checked={windBarbsChecked}
          onClick={e => actions.windBarbsClick(e.target.checked)}
          label={<FormattedMessage id="windbarb.windbarb" />}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.windBarbsBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.windBarbsValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.hordiv}>
          <span>{<FormattedMessage id="common.threshold" />}: </span>
        </div>
        <div className={css.hordiv}>
          <span>{<FormattedMessage id="common.wind.speed" />} ≥ </span>
          <NumericInput
            {...subDisabled}
            style={{ input: { width: '70px' } }}
            precision={1}
            step={0.1}
            value={threshold}
            min={0.0}
            max={40.0}
            onChange={valueAsNumber => actions.windBarbsThresholdChange(valueAsNumber)}
          />
          <span>{<FormattedMessage id="common.kt" />}</span>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    windbarbs: state.windbarbs,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(WindBarbsActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
