/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as LiveCameraActions from '../../actions/livecamera';
import {
  LIVE_CAMERA,
} from '../../constants/livecamera/LabelText';
import css from '../../../style/livecamera/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  liveCmChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentWillUnmount() {
    const { actions } = this.props;
  }
  render() {
    const {
      actions,
      liveCmChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          id="livecamera"
          label={LIVE_CAMERA}
          checked={liveCmChecked}
          onClick={e => actions.liveCameraClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    liveCmChecked: state.livecamera.liveCmChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LiveCameraActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
