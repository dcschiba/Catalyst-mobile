import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as MsmgroundActions from '../../actions/msmground';

import css from '../../../style/msmground/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  gpv: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      gpv,
    } = this.props;

    // console.log('MSM-Ground gpv', gpv);

    const {
      gpvDisabled,
      gpvchecked,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
      windchecked,
      precipitationchecked,
      contourchecked,
    } = gpv;

    const basetimeItems = [];
    basetime.map((time, i) =>
      basetimeItems.push(<MenuItem key={i} value={i} primaryText={time} />));
    const validtimeItems = [];
    const sltbasetime = basetime[basetimeidx];
    const tsarr = tsobj[sltbasetime];
    // console.log('MSM-Ground gpv', tsarr);
    if (tsarr) {
      tsarr.map((ts, i) =>
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    }
    return (
      <div>
        <CheckBox
          value={basetimeidx}
          checked={gpvchecked}
          onClick={e => actions.gpvClick(e.target.checked)}
          label={'MSM-Ground'}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText="basetime"
          {...gpvDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.gpvBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={validtimeidx}
          {...gpvDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.gpvValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div>
          <CheckBox
            checked={windchecked}
            onClick={e => actions.gpvWindClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'Wind'}
          />
          <CheckBox
            checked={precipitationchecked}
            onClick={e => actions.gpvPrecipitationClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'Precipitation'}
          />
          <CheckBox
            checked={contourchecked}
            onClick={e => actions.gpvContourClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'Countour'}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gpv: state.msmground.gpv,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MsmgroundActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
