import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as CompassHourActions from '../../actions/compasshour';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/compasshour/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  compasshour: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.compassHourWiwwClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('compasshour');
    } else {
      actions.deleteLegend('compasshour');
    }
  }

  render() {
    const {
      actions, compasshour,
    } = this.props;

    const {
      compassHourChecked,
      compassHourDisabled,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
      compassHourTmpGroupDisabled,
      compassHourTmpChecked,
      compassHourTmpContourChecked,
      compassHourTmpGridValueChecked,
      compassHourPresGroupDisabled,
      compassHourPresChecked,
      compassHourPresContourChecked,
      compassHourPresGridValueChecked,
      compassHourRhGroupDisabled,
      compassHourRhChecked,
      compassHourRhContourChecked,
      compassHourRhGridValueChecked,
      compassHourAsnowGroupDisabled,
      compassHourAsnowChecked,
      compassHourAsnowContourChecked,
      compassHourAsnowGridValueChecked,
      compassHourApcpGroupDisabled,
      compassHourApcpChecked,
      compassHourApcpContourChecked,
      compassHourApcpGridValueChecked,
      compassHourPopGroupDisabled,
      compassHourPopChecked,
      compassHourPopContourChecked,
      compassHourPopGridValueChecked,
      compassHourUgrdvgrdGroupDisabled,
      compassHourUgrdvgrdChecked,
      compassHourUgrdvgrdBarbsChecked,
      compassHourVisGroupDisabled,
      compassHourVisChecked,
      compassHourVisContourChecked,
      compassHourVisGridValueChecked,
      compassHourWiwwGroupDisabled,
      compassHourWiwwChecked,
      compassHourWiwwContourChecked,
      compassHourWiwwGridValueChecked,
    } = compasshour;

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
          id="compasshour"
          label={<FormattedMessage id="compasshour.compasshour" />}
          checked={compassHourChecked}
          onClick={e => actions.compassHourClick(e.target.checked)}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...compassHourDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.compassHourBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...compassHourDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.compassHourValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourTmpChecked}
            onClick={e => actions.compassHourTmpClick(e.target.checked)}
            label={<FormattedMessage id="common.temperature" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="TMP_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourTmpfillChange(value)}
            >
              <RadioButton
                disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourTmpContourChecked}
              onClick={e => actions.compassHourTmpcontourClick(e.target.checked)}
              disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <div className={css.bottomCheckBox}>
              <RadioButtonGroup
                name="CONTOUR_UNIT_RG"
                defaultSelected="C"
                onChange={(e, value) => actions.compassHourTmpcontourUnit(value)}
              >
                <RadioButton
                  disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                  value="C"
                  label={<FormattedMessage id="common.temperature.celcius" />}
                />
                <RadioButton
                  disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                  value="F"
                  label={<FormattedMessage id="common.temperature.fahrenheit" />}
                />
              </RadioButtonGroup>
            </div>
            <Checkbox
              checked={compassHourTmpGridValueChecked}
              onClick={e => actions.compassHourTmpgridvalueClick(e.target.checked)}
              disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
            <div className={css.bottomCheckBox}>
              <RadioButtonGroup
                name="GRIDVALUE_UNIT_RG"
                defaultSelected="C"
                onChange={(e, value) => actions.compassHourTmpgridvalueUnit(value)}
              >
                <RadioButton
                  disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                  value="C"
                  label={<FormattedMessage id="common.temperature.celcius" />}
                />
                <RadioButton
                  disabled={compassHourTmpGroupDisabled.disabled || compassHourDisabled.disabled}
                  value="F"
                  label={<FormattedMessage id="common.temperature.fahrenheit" />}
                />
              </RadioButtonGroup>
            </div>
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourPresChecked}
            onClick={e => actions.compassHourPresClick(e.target.checked)}
            label={<FormattedMessage id="common.pressure" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="PRES_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourPresfillChange(value)}
            >
              <RadioButton
                disabled={compassHourPresGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourPresGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourPresGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourPresContourChecked}
              onClick={e => actions.compassHourPrescontourClick(e.target.checked)}
              disabled={compassHourPresGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourPresGridValueChecked}
              onClick={e => actions.compassHourPresgridvalueClick(e.target.checked)}
              disabled={compassHourPresGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourRhChecked}
            onClick={e => actions.compassHourRhClick(e.target.checked)}
            label={<FormattedMessage id="common.relative.humidity" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="RH_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourRhfillChange(value)}
            >
              <RadioButton
                disabled={compassHourRhGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourRhGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourRhGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourRhContourChecked}
              onClick={e => actions.compassHourRhcontourClick(e.target.checked)}
              disabled={compassHourRhGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourRhGridValueChecked}
              onClick={e => actions.compassHourRhgridvalueClick(e.target.checked)}
              disabled={compassHourRhGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourAsnowChecked}
            onClick={e => actions.compassHourAsnowClick(e.target.checked)}
            label={<FormattedMessage id="common.total.snowfall" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="ASNOW_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourAsnowfillChange(value)}
            >
              <RadioButton
                disabled={compassHourAsnowGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourAsnowGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourAsnowGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourAsnowContourChecked}
              onClick={e => actions.compassHourAsnowcontourClick(e.target.checked)}
              disabled={compassHourAsnowGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourAsnowGridValueChecked}
              onClick={e => actions.compassHourAsnowgridvalueClick(e.target.checked)}
              disabled={compassHourAsnowGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourApcpChecked}
            onClick={e => actions.compassHourApcpClick(e.target.checked)}
            label={<FormattedMessage id="common.total.precipitation" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="ASNOW_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourApcpfillChange(value)}
            >
              <RadioButton
                disabled={compassHourApcpGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourApcpGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourApcpGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourApcpContourChecked}
              onClick={e => actions.compassHourApcpcontourClick(e.target.checked)}
              disabled={compassHourApcpGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourApcpGridValueChecked}
              onClick={e => actions.compassHourApcpgridvalueClick(e.target.checked)}
              disabled={compassHourApcpGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourPopChecked}
            onClick={e => actions.compassHourPopClick(e.target.checked)}
            label={<FormattedMessage id="common.precipitation.probability" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="POP_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourPopfillChange(value)}
            >
              <RadioButton
                disabled={compassHourPopGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourPopGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourPopGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourPopContourChecked}
              onClick={e => actions.compassHourPopcontourClick(e.target.checked)}
              disabled={compassHourPopGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourPopGridValueChecked}
              onClick={e => actions.compassHourPopgridvalueClick(e.target.checked)}
              disabled={compassHourPopGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourUgrdvgrdChecked}
            onClick={e => actions.compassHourUgrdvgrdClick(e.target.checked)}
            label={<FormattedMessage id="common.wind" />}
          />
          <div className={css.bottomCheckBox}>
            <Checkbox
              checked={compassHourUgrdvgrdBarbsChecked}
              onClick={e => actions.compassHourUgrdvgrdbarbsClick(e.target.checked)}
              disabled={compassHourUgrdvgrdGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.windbarb" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourVisChecked}
            onClick={e => actions.compassHourVisClick(e.target.checked)}
            label={<FormattedMessage id="common.visibility" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="VIS_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourVisfillChange(value)}
            >
              <RadioButton
                disabled={compassHourVisGroupDisabled.disabled || compassHourDisabled.disabled}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                disabled={compassHourVisGroupDisabled.disabled || compassHourDisabled.disabled}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                disabled={compassHourVisGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourVisContourChecked}
              onClick={e => actions.compassHourViscontourClick(e.target.checked)}
              disabled={compassHourVisGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourVisGridValueChecked}
              onClick={e => actions.compassHourVisgridvalueClick(e.target.checked)}
              disabled={compassHourVisGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
        <div className={css.subcheckbox}>
          <Checkbox
            value={basetimeidx}
            {...compassHourDisabled}
            checked={compassHourWiwwChecked}
            onClick={e => Menu.showClick(e, actions)}
            label={<FormattedMessage id="compasshour.weather" />}
          />
          <div className={css.bottomCheckBox}>
            <RadioButtonGroup
              name="WIWW_FILL_RG"
              defaultSelected="block"
              onChange={(e, value) => actions.compassHourWiwwfillChange(value)}
            >
              <RadioButton
                disabled={compassHourWiwwGroupDisabled.disabled || compassHourDisabled.disabled}
                value="block"
                label={<FormattedMessage id="common.block" />}
              />
              <RadioButton
                disabled={compassHourWiwwGroupDisabled.disabled || compassHourDisabled.disabled}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourWiwwContourChecked}
              onClick={e => actions.compassHourWiwwcontourClick(e.target.checked)}
              disabled={compassHourWiwwGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.contour" />}
            />
            <Checkbox
              checked={compassHourWiwwGridValueChecked}
              onClick={e => actions.compassHourWiwwgridvalueClick(e.target.checked)}
              disabled={compassHourWiwwGroupDisabled.disabled || compassHourDisabled.disabled}
              label={<FormattedMessage id="common.gridvalue" />}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    compasshour: state.compasshour,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, CompassHourActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
