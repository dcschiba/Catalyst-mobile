import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as LightningActions from '../../actions/lightning';
import {
  LIGHTNING,
  LIGHTNING_KMA,
  LIGHTNING_LIDEN,
} from '../../constants/lightning/LabelText';
import css from '../../../style/lightning/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  lightningJpChecked: PropTypes.bool.isRequired,
  lightningKmaChecked: PropTypes.bool.isRequired,
  lightningLidenChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentWillUnmount() {
    const { actions } = this.props;
    actions.lightningJpClick(false);
    actions.lightningKmaClick(false);
    actions.lightningLidenClick(false);
  }
  render() {
    const {
      actions,
      lightningJpChecked,
      lightningKmaChecked,
      lightningLidenChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label={LIGHTNING}
          checked={lightningJpChecked}
          onClick={e => actions.lightningJpClick(e.target.checked)}
        />
        <Checkbox
          label={LIGHTNING_KMA}
          checked={lightningKmaChecked}
          onClick={e => actions.lightningKmaClick(e.target.checked)}
        />
        <Checkbox
          label={LIGHTNING_LIDEN}
          checked={lightningLidenChecked}
          onClick={e => actions.lightningLidenClick(e.target.checked)}
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LightningActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
