import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as hilofrontActions from '../../actions/hilofront';
import * as InitActions from '../../actions/layerInit';
import { styles, childWrapper } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  hilofront: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { actions, layerInitflags, isLoading, hilofront } = this.props;
      if (!layerInitflags.hilofront && isLoading
        && hilofront.basetimelist.length !== 0 && hilofront.bvtimeobj.length !== 0) {
        actions.layerInit({ hilofront: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);

    const waitForMapInitialize = setInterval(() => {
      const { isLoading, actions } = this.props;
      if (!isLoading) {
        actions.hilofrontShowClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions,
      hilofront,
    } = this.props;

    const {
      showchecked,
      subDisabled,
      basetimeidx,
      validtimeidx,
      contourchecked,
      hilochecked,
      frontchecked,
      basetimelist,
      bvtimeobj,
    } = hilofront;

    const basetimeItems = [];
    basetimelist.map((time, i) =>
      basetimeItems.push(<MenuItem key={i} value={i} primaryText={time} />));
    const validtimeItems = [];
    const sltbasetime = basetimelist[basetimeidx];
    const validtimelist = bvtimeobj[sltbasetime];
    if (validtimelist) {
      validtimelist.map((ts, i) =>
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    }
    return (
      <div>
        <CheckBox
          id="hilofront"
          checked={showchecked}
          onClick={e => actions.hilofrontShowClick(e.target.checked)}
          label={'Hi Lo Front'}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <div style={childWrapper(5, showchecked)}>
          <SelectField
            value={basetimeidx}
            floatingLabelText="basetime"
            {...subDisabled}
            style={styles.select.wrapper}
            onChange={(event, index, value) => actions.hilofrontBasetimeChange(value)}
          >
            {basetimeItems}
          </SelectField>
          <SelectField
            value={validtimeidx}
            floatingLabelText="validtime"
            {...subDisabled}
            style={styles.select.wrapper}
            onChange={(event, index, value) => actions.hilofrontValidtimeChange(value)}
          >
            {validtimeItems}
          </SelectField>
          <CheckBox
            checked={contourchecked}
            onClick={e => actions.hilofrontContourClick(e.target.checked)}
            disabled={subDisabled.disabled}
            label={'Contour'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <CheckBox
            checked={hilochecked}
            onClick={e => actions.hilofrontHiloClick(e.target.checked)}
            disabled={subDisabled.disabled}
            label={'Hi Lo'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <CheckBox
            checked={frontchecked}
            onClick={e => actions.hilofrontFrontClick(e.target.checked)}
            disabled={subDisabled.disabled}
            label={'Front'}
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
    hilofront: state.hilofront,
    isLoading: state.loading.isLoading,
    layerInitflags: state.layerInit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(hilofrontActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
