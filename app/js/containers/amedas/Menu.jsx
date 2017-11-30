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

import css from '../../../style/amedas/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  amedas: PropTypes.object.isRequired,
};

const styles = {
  main_button: {
    padding: '20px',
    border: 'solid 0.5px lightgray',
    margin: 0,
  },
  padding: {
    padding: '20px',
  },
  radio: {
    padding: '10px 20px',
  },
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
          style={styles.main_button}
        />
        <SelectField
          floatingLabelText={<FormattedMessage id="common.validtime" />}
          value={validtimeidx}
          {...subDisabled}
          style={{ ...css.selectTime, ...styles.padding }}
          onChange={(event, index, value) => actions.amedasValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.bottomCheckBox}>
          <CheckBox
            disabled={!showchecked}
            checked={windchecked}
            onClick={e => actions.amedasWindClick(e.target.checked)}
            label={<FormattedMessage id="common.wind" />}
            style={styles.padding}
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
              style={styles.radio}
            />
            <RadioButton
              disabled={!showchecked}
              value="Temperature"
              label={<FormattedMessage id="common.temperature.withunit" />}
              style={styles.radio}
            />
            <RadioButton
              disabled={!showchecked}
              value="Precipitation"
              label={<FormattedMessage id="common.precipitation.withunit" />}
              style={styles.radio}
            />
            <RadioButton
              disabled={!showchecked}
              value="SnowDepth"
              label={<FormattedMessage id="common.snowdepth.withunit" />}
              style={styles.radio}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(AmedasActions, LegendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
