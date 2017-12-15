import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import * as DisasterReportActions from '../../actions/disasterreport';
import * as InitActions from '../../actions/layerInit';
import { styles, childWrapper } from '../../utils/menuStyle';
import css from '../../../style/disasterreport/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  disasterReportChecked: PropTypes.bool.isRequired,
  showtype: PropTypes.string.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentDidMount() {
    const { actions, layerInitflags, isLoading } = this.props;
    if (!layerInitflags.disasterreport && isLoading) {
      actions.layerInit({ disasterreport: true });
    }
    const waitForMapInitialize = setInterval(() => {
      if (!this.props.isLoading) {
        actions.disasterReportClick(true);
        actions.disasterReportTypeChange('72');
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions,
      disasterReportChecked,
      showtype,
    } = this.props;
    return (
      <div className={css.ctrlpanel}>
        <div style={styles.line}>
          <Checkbox
            id="disasterreport"
            label="災害情報"
            checked={disasterReportChecked}
            onClick={e => actions.disasterReportClick(e.target.checked)}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
        </div>
        <div style={childWrapper(4, disasterReportChecked)}>
          <RadioButtonGroup
            name="DisasterReport"
            defaultSelected={showtype}
            onChange={(e, value) => actions.disasterReportTypeChange(value)}
          >
            <RadioButton
              value="1"
              label="過去１時間"
              labelStyle={styles.radio.label}
              iconStyle={styles.radio.icon}
            />
            <RadioButton
              value="24"
              label="過去24時間"
              labelStyle={styles.radio.label}
              iconStyle={styles.radio.icon}
            />
            <RadioButton
              value="72"
              label="過去72時間"
              labelStyle={styles.radio.label}
              iconStyle={styles.radio.icon}
            />
            <RadioButton
              value="168"
              label="過去一週間"
              labelStyle={styles.radio.label}
              iconStyle={styles.radio.icon}
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
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(DisasterReportActions, InitActions),
      dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
