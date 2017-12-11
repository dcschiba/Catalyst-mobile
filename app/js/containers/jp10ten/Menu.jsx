import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import WrapUtils from '../../common/utils/WrapUtils';
import * as LegendActions from '../../actions/legend';
import * as Jp10tenActions from '../../actions/jp10ten';
import * as InitActions from '../../actions/layerInit';
import { styles, childStyles, childWrapper } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  jp10ten: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.jptenClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('jp10ten');
    } else {
      actions.deleteLegend('jp10ten');
    }
  }
  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { actions, layerInitflags, isLoading, jp10ten } = this.props;
      if (!layerInitflags.jp10ten && isLoading && jp10ten.validtimelist.length !== 0) {
        actions.layerInit({ jp10ten: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);

    const waitForMapInitialize = setInterval(() => {
      const { isLoading, actions } = this.props;
      if (!isLoading) {
        actions.jptenClick(true);
        actions.jptenValidtimeChange(0);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions, jp10ten,
    } = this.props;

    const {
      showchecked,
      showpast,
      validtimeidx,
      validtimelist,
    } = jp10ten;

    if (Object.keys(validtimelist).length === 0) {
      return null;
    }
    const validtimeItems = [];
    validtimelist.map((time, i) => {
      if (i < 360) {
        const timestr = WrapUtils.dateFormat(time, 'MM/DD hh:mm', 9 * 3600);
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={timestr} />);
      }
      return time;
    });
    return (
      <div>
        <CheckBox
          id="jp10ten"
          checked={showchecked}
          onClick={e => Menu.showClick(e, actions)}
          label={'JP 10ten'}
          style={styles.checkbox}
          labelStyle={styles.label}
        />
        <div style={childWrapper(7, showchecked)}>
          <div style={childStyles.line}>
            <div style={childStyles.selectLabel}>validtime</div>
            <div style={childStyles.selectWrapper}>
              <SelectField
                value={validtimeidx}
                onChange={(event, index, value) => actions.jptenValidtimeChange(value)}
                style={childStyles.select}
                labelStyle={childStyles.selectLabel}
              >
                {validtimeItems}
              </SelectField>
            </div>
          </div>
          <RadioButtonGroup
            name="DisasterReport"
            defaultSelected={showpast}
            onChange={(e, value) => actions.jptenPastChange(value)}
          >
            <RadioButton
              value="0"
              label="最新"
              style={childStyles.radio}
              labelStyle={childStyles.label}
            />
            <RadioButton
              value="10"
              label="過去１０分"
              style={childStyles.radio}
              labelStyle={childStyles.label}
            />
            <RadioButton
              value="30"
              label="過去３０分"
              style={childStyles.radio}
              labelStyle={childStyles.label}
            />
            <RadioButton
              value="60"
              label="過去１時間"
              style={childStyles.radio}
              labelStyle={childStyles.label}
            />
            <RadioButton
              value="180"
              label="過去３時間"
              style={childStyles.radio}
              labelStyle={childStyles.label}
            />
            <RadioButton
              value="360"
              label="過去６時間"
              style={childStyles.radio}
              labelStyle={childStyles.label}
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jp10ten: state.jp10ten,
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(LegendActions, Jp10tenActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
