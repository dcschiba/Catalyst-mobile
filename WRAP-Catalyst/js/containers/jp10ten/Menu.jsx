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

import css from '../../../style/jp10ten/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  jp10ten: PropTypes.object.isRequired,
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
  render() {
    const {
      actions, jp10ten,
    } = this.props;

    const {
      showchecked,
      subDisabled,
      showpast,
      validtimeidx,
      validtimelist,
    } = jp10ten;

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
          checked={showchecked}
          onClick={e => Menu.showClick(e, actions)}
          label={'JP 10ten'}
        />
        <SelectField
          value={validtimeidx}
          floatingLabelText="validtime"
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.jptenValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div className={css.bottomCheckBox}>
          <RadioButtonGroup
            name="DisasterReport"
            defaultSelected={showpast}
            onChange={(e, value) => actions.jptenPastChange(value)}
          >
            <RadioButton
              {...subDisabled}
              value="0"
              label="最新"
            />
            <RadioButton
              {...subDisabled}
              value="10"
              label="過去１０分"
            />
            <RadioButton
              {...subDisabled}
              value="30"
              label="過去３０分"
            />
            <RadioButton
              {...subDisabled}
              value="60"
              label="過去１時間"
            />
            <RadioButton
              {...subDisabled}
              value="180"
              label="過去３時間"
            />
            <RadioButton
              {...subDisabled}
              value="360"
              label="過去６時間"
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, Jp10tenActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
