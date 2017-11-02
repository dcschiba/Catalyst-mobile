import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as FirActions from '../../actions/fir';

import css from '../../../style/fir/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  firChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      firChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="FIR"
          checked={firChecked}
          onClick={e => actions.firClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    firChecked: state.fir.firChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FirActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
