import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as DisasterReportActions from '../../actions/disasterreport';

import css from '../../../style/disasterreport/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  disasterReportChecked: PropTypes.bool.isRequired,
  showtype: PropTypes.string.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      disasterReportChecked,
      showtype,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          id="disasterreport"
          label="災害情報"
          checked={disasterReportChecked}
          onClick={e => actions.disasterReportClick(e.target.checked)}
        />
        <div className={css.bottomCheckBox}>
          <RadioButtonGroup
            name="DisasterReport"
            defaultSelected={showtype}
            onChange={(e, value) => actions.disasterReportTypeChange(value)}
          >
            <RadioButton
              disabled={!disasterReportChecked}
              value="1"
              label="過去１時間"
            />
            <RadioButton
              disabled={!disasterReportChecked}
              value="24"
              label="過去24時間"
            />
            <RadioButton
              disabled={!disasterReportChecked}
              value="72"
              label="過去72時間"
            />
            <RadioButton
              disabled={!disasterReportChecked}
              value="168"
              label="過去一週間"
            />
          </RadioButtonGroup>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    disasterReportChecked: state.disasterreport.disasterReportChecked,
    showtype: state.disasterreport.showtype,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(DisasterReportActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
