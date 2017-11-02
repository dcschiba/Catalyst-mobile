import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as SigwxActions from '../../actions/sigwx';

import css from '../../../style/sigwx/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  sigwx: PropTypes.object.isRequired,
  ukhighpast: PropTypes.object.isRequired,
  ukmiddlepast: PropTypes.object.isRequired,
  ushighpast: PropTypes.object.isRequired,
  usmiddlepast: PropTypes.object.isRequired,
};

class Menu extends Component {
  static createTimeitem(basetime, basetimeidx, tsobj) {
    const basetimeItems = [];
    basetime.map((time, i) =>
      basetimeItems.push(<MenuItem key={i} value={i} primaryText={time} />));
    const validtimeItems = [];
    const sltbasetime = basetime[basetimeidx];
    const ukhightsarr = tsobj[sltbasetime];
    if (ukhightsarr) {
      ukhightsarr.map((ts, i) =>
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    }
    return { basetimeItems, validtimeItems };
  }
  render() {
    const {
      actions,
      sigwx,
      ukhighpast,
      ukmiddlepast,
      ushighpast,
      usmiddlepast,
    } = this.props;
    const { sigwxChecked } = sigwx;
    const {
      ukhighchecked,
      ukhighDisabled,
      basetime: ukhighbasetime,
      validtimeidx: ukhighvalidtimeidx,
      basetimeidx: ukhighbasetimeidx,
      tsobj: ukhightsobj,
    } = ukhighpast;

    const {
      ukmiddlechecked,
      ukmiddleDisabled,
      basetime: ukmiddlebasetime,
      validtimeidx: ukmiddlevalidtimeidx,
      basetimeidx: ukmiddlebasetimeidx,
      tsobj: ukmiddletsobj,
    } = ukmiddlepast;

    const {
      ushighchecked,
      ushighDisabled,
      basetime: ushighbasetime,
      validtimeidx: ushighvalidtimeidx,
      basetimeidx: ushighbasetimeidx,
      tsobj: ushightsobj,
    } = ushighpast;

    const {
      usmiddlechecked,
      usmiddleDisabled,
      basetime: usmiddlebasetime,
      validtimeidx: usmiddlevalidtimeidx,
      basetimeidx: usmiddlebasetimeidx,
      tsobj: usmiddletsobj,
    } = usmiddlepast;

    const { basetimeItems: ukhighbasetimeItems,
       validtimeItems: ukhighvalidtimeItems } = Menu.createTimeitem(
         ukhighbasetime, ukhighbasetimeidx, ukhightsobj);

    const { basetimeItems: ukmiddlebasetimeItems,
       validtimeItems: ukmiddlevalidtimeItems } = Menu.createTimeitem(
         ukmiddlebasetime, ukmiddlebasetimeidx, ukmiddletsobj);

    const { basetimeItems: ushighbasetimeItems,
       validtimeItems: ushighvalidtimeItems } = Menu.createTimeitem(
         ushighbasetime, ushighbasetimeidx, ushightsobj);

    const { basetimeItems: usmiddlebasetimeItems,
       validtimeItems: usmiddlevalidtimeItems } = Menu.createTimeitem(
         usmiddlebasetime, usmiddlebasetimeidx, usmiddletsobj);

    return (
      <div className={css.navcontents}>
        <Checkbox
          label="SIGWX"
          onClick={e => actions.sigwxClick(e.target.checked)}
        />
        <RadioButtonGroup
          name="SIGWX_RG"
          defaultSelected="SIGWX_UK_High"
          onChange={(e, value) => actions.sigwxChange(value)}
        >
          <RadioButton
            disabled={!sigwxChecked}
            className={css.rdpaddleft}
            value="SIGWX_UK_High"
            label="UK High"
          />
          <RadioButton
            disabled={!sigwxChecked}
            className={css.rdpaddleft}
            value="SIGWX_UK_Medium"
            label="UK Middle"
          />
          <RadioButton
            disabled={!sigwxChecked}
            className={css.rdpaddleft}
            value="SIGWX_US_High"
            label="US High"
          />
          <RadioButton
            disabled={!sigwxChecked}
            className={css.rdpaddleft}
            value="SIGWX_US_Medium"
            label="US Middle"
          />
        </RadioButtonGroup>
        <div style={{ height: 20 }} />
        <Checkbox
          value={ukhighbasetimeidx}
          checked={ukhighchecked}
          onClick={e => actions.ukHighClick(e.target.checked)}
          label={'UK High(past)'}
        />
        <SelectField
          value={ukhighbasetimeidx}
          floatingLabelText="basetime"
          {...ukhighDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.ukHighBasetimeChange(value)}
        >
          {ukhighbasetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={ukhighvalidtimeidx}
          {...ukhighDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.ukHighValidtimeChange(value)}
        >
          {ukhighvalidtimeItems}
        </SelectField>
        <div style={{ height: 20 }} />
        <Checkbox
          value={ukmiddlebasetimeidx}
          checked={ukmiddlechecked}
          onClick={e => actions.ukMiddleClick(e.target.checked)}
          label={'UK Middle(past)'}
        />
        <SelectField
          value={ukmiddlebasetimeidx}
          floatingLabelText="basetime"
          {...ukmiddleDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.ukMiddleBasetimeChange(value)}
        >
          {ukmiddlebasetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={ukmiddlevalidtimeidx}
          {...ukmiddleDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.ukMiddleValidtimeChange(value)}
        >
          {ukmiddlevalidtimeItems}
        </SelectField>
        <div style={{ height: 20 }} />
        <Checkbox
          value={ushighbasetimeidx}
          checked={ushighchecked}
          onClick={e => actions.usHighClick(e.target.checked)}
          label={'US High(past)'}
        />
        <SelectField
          value={ushighbasetimeidx}
          floatingLabelText="basetime"
          {...ushighDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.usHighBasetimeChange(value)}
        >
          {ushighbasetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={ushighvalidtimeidx}
          {...ushighDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.usHighValidtimeChange(value)}
        >
          {ushighvalidtimeItems}
        </SelectField>
        <div style={{ height: 20 }} />
        <Checkbox
          value={usmiddlebasetimeidx}
          checked={usmiddlechecked}
          onClick={e => actions.usMiddleClick(e.target.checked)}
          label={'US Middle(past)'}
        />
        <SelectField
          value={usmiddlebasetimeidx}
          floatingLabelText="basetime"
          {...usmiddleDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.usMiddleBasetimeChange(value)}
        >
          {usmiddlebasetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={usmiddlevalidtimeidx}
          {...usmiddleDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.usMiddleValidtimeChange(value)}
        >
          {usmiddlevalidtimeItems}
        </SelectField>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sigwx: state.sigwx.sigwx,
    ukhighpast: state.sigwx.ukhighpast,
    ukmiddlepast: state.sigwx.ukmiddlepast,
    ushighpast: state.sigwx.ushighpast,
    usmiddlepast: state.sigwx.usmiddlepast,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SigwxActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
