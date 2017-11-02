/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as CarGPSActions from '../../actions/cargps';
import {
  CAR_GPS,
} from '../../constants/cargps/LabelText';
import css from '../../../style/cargps/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  carGpsChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      carGpsChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label={CAR_GPS}
          checked={carGpsChecked}
          onClick={e => actions.carGpsClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    carGpsChecked: state.cargps.carGpsChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CarGPSActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
