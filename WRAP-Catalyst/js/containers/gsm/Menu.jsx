import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GpvMenu from '../gpv/GpvMenu';
import * as Actions from '../../actions/gpvgsm';
import css from '../../../style/gpv/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  gpv: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      gpv,
    } = this.props;

    return (
      <div className={css.ctrlPanel}>
        <GpvMenu {...gpv} modelName={'GSM'} precipitationShow actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gpv: state.gpvgsm.gpv,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
