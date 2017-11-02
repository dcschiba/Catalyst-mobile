import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as WaveBlendActions from '../../actions/waveblend';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/waveblend/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  waveblend: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.waveBlendClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('waveblend');
    } else {
      actions.deleteLegend('waveblend');
    }
  }

  render() {
    const {
      actions, waveblend,
    } = this.props;

    const {
      waveBlendChecked,
      subDisabled,
      waveBlendArrowChecked,
      waveBlendContourChecked,
      waveBlendFlatChecked,
      waveBlendLowresoChecked,
      waveBlendNpacChecked,
      waveBlendNatlChecked,
      waveBlendSeasiaChecked,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = waveblend;

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
          label={<FormattedMessage id="waveblend.waveblend" />}
          checked={waveBlendChecked}
          onClick={e => Menu.showClick(e, actions)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.waveBlendBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.waveBlendValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.subcheckbox}>
          <div><span>{<FormattedMessage id="common.data" />}</span></div>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendLowresoChecked}
            onClick={e => actions.waveBlendLowresoClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.lowreso" />}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendNpacChecked}
            onClick={e => actions.waveBlendNpacClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.npac" />}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendNatlChecked}
            onClick={e => actions.waveBlendNatlClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.natl" />}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendSeasiaChecked}
            onClick={e => actions.waveBlendSeasiaClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.seasia" />}
          />
          <div><span>{<FormattedMessage id="common.display" />}</span></div>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendFlatChecked}
            onClick={e => actions.waveBlendFlatClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.flat" />}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendContourChecked}
            onClick={e => actions.waveBlendContourClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.contour" />}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendArrowChecked}
            onClick={e => actions.waveBlendArrowClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.arrow" />}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    waveblend: state.waveblend,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, WaveBlendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
