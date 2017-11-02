import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as SeaSprayIcingActions from '../../actions/seasprayicing';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/seasprayicing/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  seasprayicing: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.seaSprayIcingClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('seasprayicing');
    } else {
      actions.deleteLegend('seasprayicing');
    }
  }

  render() {
    const {
      actions, seasprayicing,
    } = this.props;

    const {
      seaSprayIcingChecked,
      subDisabled,
      seaSprayIcingFlatChecked,
      seaSprayIcingContourChecked,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = seasprayicing;

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
          label={<FormattedMessage id="seasprayicing.seasprayicing" />}
          checked={seaSprayIcingChecked}
          onClick={e => Menu.showClick(e, actions)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.seaSprayIcingBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.seaSprayIcingValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={seaSprayIcingFlatChecked}
            onClick={e => actions.seaSprayIcingFlatClick(e.target.checked)}
            label={<FormattedMessage id="common.flat" />}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={seaSprayIcingContourChecked}
            onClick={e => actions.seaSprayIcingContourClick(e.target.checked)}
            label={<FormattedMessage id="common.contour" />}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    seasprayicing: state.seasprayicing,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, SeaSprayIcingActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
