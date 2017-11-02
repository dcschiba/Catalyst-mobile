import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as DashActions from '../../actions/dash';
import * as LegendActions from '../../actions/legend';

import css from '../../../style/dash/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  dash: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.dashClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('dash');
    } else {
      actions.deleteLegend('dash');
    }
  }

  render() {
    const {
      actions, dash,
    } = this.props;

    const {
      dashChecked,
      subDisabled,
      dangerChecked,
      severeChecked,
      heavyChecked,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = dash;

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
        <Checkbox
          label={<FormattedMessage id="dash.dash" />}
          value={basetimeidx}
          checked={dashChecked}
          onClick={e => Menu.showClick(e, actions)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.dashBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.dashValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={dangerChecked}
            onClick={e => actions.dangerClick(e.target.checked)}
            label={<FormattedMessage id="dash.d.danger" />}
          />
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={severeChecked}
            onClick={e => actions.severeClick(e.target.checked)}
            label={<FormattedMessage id="dash.s.severe" />}
          />
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={heavyChecked}
            onClick={e => actions.heavyClick(e.target.checked)}
            label={<FormattedMessage id="dash.h.heavy" />}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dash: state.dash,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, DashActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
