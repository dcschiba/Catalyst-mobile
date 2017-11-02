import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as GASSActions from '../../actions/gass';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/gass/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  gass: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.gassClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('gass');
    } else {
      actions.deleteLegend('gass');
    }
  }

  render() {
    const {
      actions, gass,
    } = this.props;

    const {
      gassChecked,
      subDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = gass;

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
          label={<FormattedMessage id="gassscale.gassscale" />}
          checked={gassChecked}
          onClick={e => Menu.showClick(e, actions)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.gassBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.gassValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gass: state.gass,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, GASSActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
