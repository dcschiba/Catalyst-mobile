/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as LiveCameraActions from '../../actions/livecamera';
import * as InitActions from '../../actions/layerInit';
import { LIVE_CAMERA } from '../../constants/livecamera/LabelText';
import { styles } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  liveCmChecked: PropTypes.bool.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
class Menu extends Component {
  componentWillUnmount() {
    const { actions } = this.props;
  }
  componentDidMount() {
    const { actions, layerInitflags, isLoading } = this.props;
    if (!layerInitflags.livecamera && isLoading) {
      actions.layerInit({ livecamera: true });
    }
    const waitForMapInitialize = setInterval(() => {
      if (!this.props.isLoading) {
        actions.liveCameraClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
  render() {
    const {
      actions,
      liveCmChecked,
    } = this.props;

    return (
      <div>
        <Checkbox
          id="livecamera"
          label={LIVE_CAMERA}
          checked={liveCmChecked}
          onClick={e => actions.liveCameraClick(e.target.checked)}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    liveCmChecked: state.livecamera.liveCmChecked,
    isLoading: state.loading.isLoading,
    layerInitflags: state.layerInit,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(LiveCameraActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
