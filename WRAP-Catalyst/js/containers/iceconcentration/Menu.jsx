import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as LegendActions from '../../actions/legend';
import * as IceConcentrationActions from '../../actions/iceconcentration';
import css from '../../../style/iceconcentration/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  iceconcentration: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.iceConcentrationClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('iceconcentration');
    } else {
      actions.deleteLegend('iceconcentration');
    }
  }

  render() {
    const {
      actions, iceconcentration,
    } = this.props;

    const {
      iceConcentrationChecked,
      subDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = iceconcentration;

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
          label={<FormattedMessage id="iceconcentration.iceconcentration" />}
          checked={iceConcentrationChecked}
          onClick={e => Menu.showClick(e, actions)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.iceConcentrationBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.iceConcentrationValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    iceconcentration: state.iceconcentration,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, IceConcentrationActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
