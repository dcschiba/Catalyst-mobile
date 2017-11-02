import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import * as CurrentActions from '../../actions/current';

import css from '../../../style/current/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions, current,
    } = this.props;

    const {
      currentChecked,
      subDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
      threshold,
    } = current;

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
          checked={currentChecked}
          onClick={e => actions.currentClick(e.target.checked)}
          label={'Current'}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText="basetime"
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.currentBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.currentValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.hordiv}>
          <span>threshold:　</span>
          <NumericInput
            {...subDisabled}
            style={{ input: { width: '70px' } }}
            precision={1}
            step={0.1}
            value={threshold}
            min={0.0}
            max={10.0}
            onChange={valueAsNumber => actions.currentThresholdChange(valueAsNumber)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    current: state.current,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CurrentActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
