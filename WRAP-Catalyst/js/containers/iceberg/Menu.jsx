import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import * as LegendActions from '../../actions/legend';
import * as IceBergActions from '../../actions/iceberg';

import css from '../../../style/iceberg/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  iceberg: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.iceBergClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('iceberg');
    } else {
      actions.deleteLegend('iceberg');
    }
  }

  render() {
    const {
      actions, iceberg,
    } = this.props;

    const {
      iceBergChecked,
      subDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
      threshold,
    } = iceberg;

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
          checked={iceBergChecked}
          onClick={e => Menu.showClick(e, actions)}
          label={<FormattedMessage id="iceberg.iceberg" />}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.iceBergBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.iceBergValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.hordiv}>
          <span>{<FormattedMessage id="common.threshold" />}: </span>
        </div>
        <div className={css.hordiv}>
          <span>{<FormattedMessage id="common.level" />} ≧ </span>
          <NumericInput
            {...subDisabled}
            style={{ input: { width: '50px' } }}
            precision={0}
            step={1}
            value={threshold}
            min={0}
            max={5}
            onChange={valueAsNumber => actions.iceBergThresholdChange(valueAsNumber)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    iceberg: state.iceberg,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, IceBergActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
