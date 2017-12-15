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
import * as InitActions from '../../actions/layerInit';
import { styles, childWrapper } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  compasshour: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
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

  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { basetime, tsobj, compassHourChecked } = this.props.compasshour;
      const { actions, layerInitflags, isLoading } = this.props;
      if ((!layerInitflags.compasshour && compassHourChecked && isLoading
        && basetime.length !== 0 && Object.keys(tsobj).length !== 0)
      ) {
        actions.layerInit({ compasshour: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);

    const waitForMapInitialize = setInterval(() => {
      const { actions, isLoading } = this.props;
      if (!isLoading) {
        actions.compassHourClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }

  // componentDidUpdate() {
  //   const { basetime, tsobj, compassHourChecked } = this.props.compasshour;
  //   const { layerInitflags, isLoading } = this.props;
  //   const { actions } = this.props;
  //   if ((!layerInitflags.compasshour && compassHourChecked && isLoading
  //     && basetime.length !== 0 && Object.keys(tsobj).length !== 0)
  //   ) {
  //     actions.layerInit({ compasshour: true });
  //   }
  //   if (!isLoading) {
  //     actions.compassHourClick(true);
  //   }
  // }

  render() {
    const {
      actions, compasshour,
    } = this.props;

    const {
      compassHourChecked,
      basetime,
      validtimeidx,
      basetimeidx,
      tsobj,
      compassHourTmpChecked,
      compassHourTmpContourChecked,
      compassHourTmpGridValueChecked,
      compassHourTmpFillValue,
      compassHourPresChecked,
      compassHourPresContourChecked,
      compassHourPresGridValueChecked,
      compassHourRhChecked,
      compassHourRhContourChecked,
      compassHourRhGridValueChecked,
      compassHourAsnowChecked,
      compassHourAsnowContourChecked,
      compassHourAsnowGridValueChecked,
      compassHourApcpChecked,
      compassHourApcpContourChecked,
      compassHourApcpGridValueChecked,
      compassHourPopChecked,
      compassHourPopContourChecked,
      compassHourPopGridValueChecked,
      compassHourUgrdvgrdChecked,
      compassHourUgrdvgrdBarbsChecked,
      compassHourVisChecked,
      compassHourVisContourChecked,
      compassHourVisGridValueChecked,
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
    let temperatureState = 5;
    if (compassHourTmpContourChecked && compassHourTmpGridValueChecked) {
      temperatureState = 9;
    } else if (compassHourTmpContourChecked || compassHourTmpGridValueChecked) {
      temperatureState = 7;
    }
    return (
      <div>
        <Checkbox
          id="compasshour"
          label={<FormattedMessage id="compasshour.compasshour" />}
          checked={compassHourChecked}
          onClick={e => actions.compassHourClick(e.target.checked)}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          disabled={!compassHourChecked}
          onChange={(event, index, value) => actions.compassHourBasetimeChange(value)}
          style={styles.select.wrapper}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          disabled={!compassHourChecked}
          onChange={(event, index, value) => actions.compassHourValidtimeChange(value)}
          style={styles.select.wrapper}
        >
          {validtimeItems}
        </SelectField>
        <div>
          {/* 気温 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourTmpChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourTmpClick(e.target.checked)}
            label={<FormattedMessage id="common.temperature" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div
            style={childWrapper(temperatureState, compassHourTmpChecked)}
          >
            <RadioButtonGroup
              name="TMP_FILL_RG"
              defaultSelected={compassHourTmpFillValue}
              onChange={(e, value) => actions.compassHourTmpfillChange(value)}
            >
              <RadioButton
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
                disabled={!compassHourChecked}
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
              />
              <RadioButton
                value="flat"
                label={<FormattedMessage id="common.flat" />}
                disabled={!compassHourChecked}
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
              />
              <RadioButton
                value="none"
                label={<FormattedMessage id="common.none" />}
                disabled={!compassHourChecked}
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourTmpContourChecked}
              onClick={e => actions.compassHourTmpcontourClick(e.target.checked)}
              disabled={!compassHourChecked}
              label={<FormattedMessage id="common.contour" />}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <div style={childWrapper(2, compassHourTmpContourChecked)}>
              <RadioButtonGroup
                name="CONTOUR_UNIT_RG"
                defaultSelected="C"
                onChange={(e, value) => actions.compassHourTmpcontourUnit(value)}
              >
                <RadioButton
                  iconStyle={styles.radio.icon}
                  labelStyle={styles.radio.label}
                  disabled={!compassHourChecked}
                  value="C"
                  label={<FormattedMessage id="common.temperature.celcius" />}
                />
                <RadioButton
                  iconStyle={styles.radio.icon}
                  labelStyle={styles.radio.label}
                  disabled={!compassHourChecked}
                  value="F"
                  label={<FormattedMessage id="common.temperature.fahrenheit" />}
                />
              </RadioButtonGroup>
            </div>
            <Checkbox
              checked={compassHourTmpGridValueChecked}
              onClick={e => actions.compassHourTmpgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <div style={childWrapper(2, compassHourTmpGridValueChecked)}>
              <RadioButtonGroup
                name="GRIDVALUE_UNIT_RG"
                defaultSelected="C"
                onChange={(e, value) => actions.compassHourTmpgridvalueUnit(value)}
              >
                <RadioButton
                  iconStyle={styles.radio.icon}
                  labelStyle={styles.radio.label}
                  disabled={!compassHourChecked}
                  value="C"
                  label={<FormattedMessage id="common.temperature.celcius" />}
                />
                <RadioButton
                  iconStyle={styles.radio.icon}
                  labelStyle={styles.radio.label}
                  disabled={!compassHourChecked}
                  value="F"
                  label={<FormattedMessage id="common.temperature.fahrenheit" />}
                />
              </RadioButtonGroup>
            </div>
          </div>
          {/* 気圧 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourPresChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourPresClick(e.target.checked)}
            label={<FormattedMessage id="common.pressure" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(5, compassHourPresChecked)}>
            <RadioButtonGroup
              name="PRES_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourPresfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourPresContourChecked}
              onClick={e => actions.compassHourPrescontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourPresGridValueChecked}
              onClick={e => actions.compassHourPresgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          <Checkbox
            value={basetimeidx}
            checked={compassHourRhChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourRhClick(e.target.checked)}
            label={<FormattedMessage id="common.relative.humidity" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          {/* 相対温度 */}
          <div style={childWrapper(5, compassHourRhChecked)}>
            <RadioButtonGroup
              name="RH_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourRhfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourRhContourChecked}
              onClick={e => actions.compassHourRhcontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourRhGridValueChecked}
              onClick={e => actions.compassHourRhgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          {/* 積雪 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourAsnowChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourAsnowClick(e.target.checked)}
            label={<FormattedMessage id="common.total.snowfall" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(5, compassHourAsnowChecked)}>
            <RadioButtonGroup
              name="ASNOW_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourAsnowfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourAsnowContourChecked}
              onClick={e => actions.compassHourAsnowcontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourAsnowGridValueChecked}
              onClick={e => actions.compassHourAsnowgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          {/* 降水量 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourApcpChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourApcpClick(e.target.checked)}
            label={<FormattedMessage id="common.total.precipitation" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(5, compassHourApcpChecked)}>
            <RadioButtonGroup
              name="ASNOW_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourApcpfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourApcpContourChecked}
              onClick={e => actions.compassHourApcpcontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourApcpGridValueChecked}
              onClick={e => actions.compassHourApcpgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          {/* 降水確率 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourPopChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourPopClick(e.target.checked)}
            label={<FormattedMessage id="common.precipitation.probability" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(5, compassHourPopChecked)}>
            <RadioButtonGroup
              name="POP_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourPopfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourPopContourChecked}
              onClick={e => actions.compassHourPopcontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourPopGridValueChecked}
              onClick={e => actions.compassHourPopgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          {/* 風 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourUgrdvgrdChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourUgrdvgrdClick(e.target.checked)}
            label={<FormattedMessage id="common.wind" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(1, compassHourUgrdvgrdChecked)}>
            <Checkbox
              checked={compassHourUgrdvgrdBarbsChecked}
              disabled={!compassHourChecked}
              onClick={e => actions.compassHourUgrdvgrdbarbsClick(e.target.checked)}
              label={<FormattedMessage id="common.windbarb" />}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          {/* visibly */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourVisChecked}
            disabled={!compassHourChecked}
            onClick={e => actions.compassHourVisClick(e.target.checked)}
            label={<FormattedMessage id="common.visibility" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(5, compassHourVisChecked)}>
            <RadioButtonGroup
              name="VIS_FILL_RG"
              defaultSelected="gradation"
              onChange={(e, value) => actions.compassHourVisfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="gradation"
                label={<FormattedMessage id="common.gradiation" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="flat"
                label={<FormattedMessage id="common.flat" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourVisContourChecked}
              onClick={e => actions.compassHourViscontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourVisGridValueChecked}
              onClick={e => actions.compassHourVisgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              disabled={!compassHourChecked}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          {/* 天気 */}
          <Checkbox
            value={basetimeidx}
            checked={compassHourWiwwChecked}
            disabled={!compassHourChecked}
            onClick={e => Menu.showClick(e, actions)}
            label={<FormattedMessage id="compasshour.weather" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(4, compassHourWiwwChecked)}>
            <RadioButtonGroup
              name="WIWW_FILL_RG"
              defaultSelected="block"
              disabled={!compassHourChecked}
              onChange={(e, value) => actions.compassHourWiwwfillChange(value)}
            >
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="block"
                label={<FormattedMessage id="common.block" />}
              />
              <RadioButton
                iconStyle={styles.radio.icon}
                labelStyle={styles.radio.label}
                disabled={!compassHourChecked}
                value="none"
                label={<FormattedMessage id="common.none" />}
              />
            </RadioButtonGroup>
            <Checkbox
              checked={compassHourWiwwContourChecked}
              disabled={!compassHourChecked}
              onClick={e => actions.compassHourWiwwcontourClick(e.target.checked)}
              label={<FormattedMessage id="common.contour" />}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <Checkbox
              checked={compassHourWiwwGridValueChecked}
              disabled={!compassHourChecked}
              onClick={e => actions.compassHourWiwwgridvalueClick(e.target.checked)}
              label={<FormattedMessage id="common.gridvalue" />}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
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
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(LegendActions, CompassHourActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
