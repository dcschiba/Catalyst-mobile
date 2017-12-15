import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import * as WaveBlendActions from '../../actions/waveblend';
import * as LegendActions from '../../actions/legend';
import * as InitActions from '../../actions/layerInit';
import { styles, childWrapper } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  waveblend: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
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
  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { actions, layerInitflags, isLoading, waveblend } = this.props;
      if (!layerInitflags.waveblend && isLoading
        && waveblend.basetime.length !== 0 && waveblend.tsobj.length !== 0) {
        actions.layerInit({ waveblend: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);

    const waitForMapInitialize = setInterval(() => {
      const { isLoading, actions } = this.props;
      if (!isLoading) {
        actions.waveBlendClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
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
      lowthreshold,
      highthreshold,
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
      <div>
        <Checkbox
          id="waveblend"
          label={<FormattedMessage id="waveblend.waveblend" />}
          checked={waveBlendChecked}
          onClick={e => Menu.showClick(e, actions)}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText={<FormattedMessage id="common.basetime" />}
          {...subDisabled}
          style={styles.select.wrapper}
          onChange={(event, index, value) => actions.waveBlendBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={styles.select.wrapper}
          onChange={(event, index, value) => actions.waveBlendValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div style={styles.sectionName}>{<FormattedMessage id="common.data" />}</div>
        <div style={childWrapper(4, true)}>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendLowresoChecked}
            onClick={e => actions.waveBlendLowresoClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.lowreso" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendNpacChecked}
            onClick={e => actions.waveBlendNpacClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.npac" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendNatlChecked}
            onClick={e => actions.waveBlendNatlClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.natl" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendSeasiaChecked}
            onClick={e => actions.waveBlendSeasiaClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.seasia" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
        </div>
        <div style={styles.sectionName}>{<FormattedMessage id="common.display" />}</div>
        <div style={childWrapper(waveBlendFlatChecked ? 5 : 3, true)}>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendFlatChecked}
            onClick={e => actions.waveBlendFlatClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.flat" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(2, waveBlendFlatChecked)}>
            <div style={styles.line} >
              <div style={styles.numeric.label}>
                {<FormattedMessage id="common.threshold" />} 1 </div>
              <NumericInput
                {...subDisabled}
                style={{ input: { width: '120px', height: '36px' } }}
                precision={1}
                step={0.1}
                value={lowthreshold}
                min={0.0}
                max={highthreshold}
                onChange={valueAsNumber => actions.waveBlendLowthresholdChange(valueAsNumber)}
              />
            </div>
            <div style={styles.line} >
              <div style={styles.numeric.label}>
                {<FormattedMessage id="common.threshold" />} 2 </div>
              <NumericInput
                {...subDisabled}
                style={{ input: { width: '120px', height: '36px' } }}
                precision={1}
                step={0.1}
                value={highthreshold}
                min={lowthreshold}
                max={10.0}
                onChange={valueAsNumber => actions.waveBlendHighthresholdChange(valueAsNumber)}
              />
            </div>
          </div>
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendContourChecked}
            onClick={e => actions.waveBlendContourClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.contour" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <Checkbox
            value={basetimeidx}
            {...subDisabled}
            checked={waveBlendArrowChecked}
            onClick={e => actions.waveBlendArrowClick(e.target.checked)}
            label={<FormattedMessage id="waveblend.arrow" />}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
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
    isLoading: state.loading.isLoading,
    layerInitflags: state.layerInit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(LegendActions, WaveBlendActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
