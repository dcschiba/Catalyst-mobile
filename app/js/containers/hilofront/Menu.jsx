import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as hilofrontActions from '../../actions/hilofront';

import css from '../../../style/hilofront/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  hilofront: PropTypes.object.isRequired,
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
          style={styles.main_button}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText="basetime"
          {...subDisabled}
          style={{ ...css.selectTime, ...styles.padding }}
          onChange={(event, index, value) => actions.hilofrontBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          value={validtimeidx}
          floatingLabelText="validtime"
          {...subDisabled}
          style={{ ...css.selectTime, ...styles.padding }}
          onChange={(event, index, value) => actions.hilofrontValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <div>
          <CheckBox
            checked={contourchecked}
            onClick={e => actions.hilofrontContourClick(e.target.checked)}
            disabled={subDisabled.disabled}
            label={'Contour'}
            style={styles.padding}
          />
          <CheckBox
            checked={hilochecked}
            onClick={e => actions.hilofrontHiloClick(e.target.checked)}
            disabled={subDisabled.disabled}
            label={'Hi Lo'}
            style={styles.padding}
          />
          <CheckBox
            checked={frontchecked}
            onClick={e => actions.hilofrontFrontClick(e.target.checked)}
            disabled={subDisabled.disabled}
            label={'Front'}
            style={styles.padding}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hilofront: state.hilofront,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(hilofrontActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
