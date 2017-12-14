import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import GpvMenu from '../../components/gpv/GpvMenu';
import * as InitActions from '../../actions/layerInit';
import * as GsmActions from '../../actions/gpvgfs';

const propTypes = {
  actions: PropTypes.object.isRequired,
  gpv: PropTypes.object.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentDidMount() {
    const waitForlayerInitialize = setInterval(() => {
      const { actions, layerInitflags, isLoading, gpv } = this.props;
      if (!layerInitflags.gfs && isLoading
        && gpv.basetime.length !== 0
        && gpv.tsarr.length !== 0
      ) {
        actions.layerInit({ gfs: true });
        clearInterval(waitForlayerInitialize);
      }
    }, 1000);

    const waitForMapInitialize = setInterval(() => {
      const { actions, isLoading } = this.props;
      if (!isLoading) {
        actions.gpvClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions,
      gpv,
    } = this.props;

    return (
      <GpvMenu {...gpv} modelName={'GFS'} precipitationShow snowdepthShow pressuremslShow actions={actions} />
    );
  }
}

function mapStateToProps(state) {
  return {
    gpv: state.gpvgfs.gpv,
    locale: state.locale.locale,
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, GsmActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
