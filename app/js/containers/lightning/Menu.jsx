import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as LightningActions from '../../actions/lightning';
import * as InitActions from '../../actions/layerInit';
import {
  LIGHTNING,
  LIGHTNING_KMA,
  LIGHTNING_LIDEN,
} from '../../constants/lightning/LabelText';
import { styles } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  lightningJpChecked: PropTypes.bool.isRequired,
  lightningKmaChecked: PropTypes.bool.isRequired,
  lightningLidenChecked: PropTypes.bool.isRequired,
  layerInitflags: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

class Menu extends Component {

  componentDidMount() {
    const { actions, layerInitflags } = this.props;
    if (!layerInitflags.lightning) {
      actions.layerInit({ lightning: true });
    }
    const waitForMapInitialize = setInterval(() => {
      if (!this.props.isLoading) {
        this.props.actions.lightningLidenClick(true);
        this.props.actions.lightningKmaClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }

  render() {
    const {
      actions,
      lightningJpChecked,
      lightningKmaChecked,
      lightningLidenChecked,
    } = this.props;

    return (
      <div>
        <Checkbox
          id="lightning"
          label={LIGHTNING_LIDEN}
          checked={lightningLidenChecked}
          onClick={e => actions.lightningLidenClick(e.target.checked)}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <Checkbox
          label={LIGHTNING}
          checked={lightningJpChecked}
          onClick={e => actions.lightningJpClick(e.target.checked)}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <Checkbox
          label={LIGHTNING_KMA}
          checked={lightningKmaChecked}
          onClick={e => actions.lightningKmaClick(e.target.checked)}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lightningJpChecked: state.lightning.lightningJpChecked,
    lightningKmaChecked: state.lightning.lightningKmaChecked,
    lightningLidenChecked: state.lightning.lightningLidenChecked,
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(LightningActions, InitActions),
      dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
