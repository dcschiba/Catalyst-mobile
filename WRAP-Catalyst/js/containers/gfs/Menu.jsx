import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GpvMenu from '../gpv/GpvMenu';
import * as GsmActions from '../../actions/gpvgfs';
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
        <GpvMenu {...gpv} modelName={'GFS'} precipitationShow snowdepthShow pressuremslShow actions={actions} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gpv: state.gpvgfs.gpv,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GsmActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
