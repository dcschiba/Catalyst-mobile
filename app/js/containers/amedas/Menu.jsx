import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as AmedasActions from '../../actions/amedas';
import * as LegendActions from '../../actions/legend';
import * as InitActions from '../../actions/layerInit';
import { styles, childWrapper } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  amedas: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.amedasClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('amedas');
    } else {
      actions.deleteLegend('amedas');
    }
  }
  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { actions, layerInitflags, isLoading, amedas } = this.props;
      if (!layerInitflags.amedas && isLoading && amedas.tsarr.length !== 0) {
        actions.layerInit({ amedas: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);

    const waitForMapInitialize = setInterval(() => {
      const { actions, isLoading } = this.props;
      if (!isLoading) {
        actions.amedasClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions, amedas,
    } = this.props;

    const {
      showchecked,
      subDisabled,
      validtimeidx,
      windchecked,
      tsarr,
    } = amedas;
    const validtimeItems = [];
    if (tsarr) {
      tsarr.map((ts, i) =>
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    }
    return (
      <div>
        <CheckBox
          id="amedas"
          checked={showchecked}
          onClick={e => Menu.showClick(e, actions)}
          label={<FormattedMessage id="amedas.amedas" />}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          onChange={(event, index, value) => actions.amedasValidtimeChange(value)}
          style={styles.select.wrapper}
        >
          {validtimeItems}
        </SelectField>
        <div style={childWrapper(5, showchecked)}>
          <CheckBox
            disabled={!showchecked}
            checked={windchecked}
            onClick={e => actions.amedasWindClick(e.target.checked)}
            label={<FormattedMessage id="common.wind" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <RadioButtonGroup
            name="AMEDAS_RG"
            defaultSelected="Sunshine"
            onChange={(e, value) => actions.amedasContentChange(value)}
          >
            <RadioButton
              disabled={!showchecked}
              value="Sunshine"
              label={<FormattedMessage id="common.sunshine.withunit" />}
              iconStyle={styles.radio.icon}
              labelStyle={styles.radio.label}
            />
            <RadioButton
              disabled={!showchecked}
              value="Temperature"
              label={<FormattedMessage id="common.temperature.withunit" />}
              iconStyle={styles.radio.icon}
              labelStyle={styles.radio.label}
            />
            <RadioButton
              disabled={!showchecked}
              value="Precipitation"
              label={<FormattedMessage id="common.precipitation.withunit" />}
              iconStyle={styles.radio.icon}
              labelStyle={styles.radio.label}
            />
            <RadioButton
              disabled={!showchecked}
              value="SnowDepth"
              label={<FormattedMessage id="common.snowdepth.withunit" />}
              iconStyle={styles.radio.icon}
              labelStyle={styles.radio.label}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    amedas: state.amedas,
    locale: state.locale.locale,
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(AmedasActions, LegendActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
