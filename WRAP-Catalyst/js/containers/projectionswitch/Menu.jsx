import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import WrapController from 'WRAP/UI/WrapController';
import * as mapActions from '../../actions/map';
import * as tiledMapActions from '../../actions/tiledmap';
import css from '../../../style/mapswitch/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
};

class Menu extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, value) {
    const { actions } = this.props;
    switch (value) {
      case 'ol':
        actions.switchOlMap(true);
        actions.switchWebGLMap(false);
        actions.blueMarbleClick(false);
        WrapController.switchMap(WrapController.olmap_ins);
        break;
      case 'webgl':
        actions.switchOlMap(false);
        actions.switchWebGLMap(true);
        actions.blueMarbleClick(true);
        if (WrapController.webglmap_ins !== WrapController.currentMap) {
          WrapController.switchMap(WrapController.webglmap_ins);
        }
        break;
      default:
    }
  }

  render() {
    return (
      <div className={css.container}>
        <span>Select Map</span>
        <RadioButtonGroup name="selectMap" defaultSelected={'ol'} onChange={this.handleChange}>
          <RadioButton
            value="ol"
            label="OpenLayers(Polarstereographics)"
          />
          <RadioButton
            value="webgl"
            label="WebGLMap(Polarstereographics)"
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

// function mapStateToProps(state) {
// }

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(mapActions, tiledMapActions), dispatch),
  };
}

Menu.propTypes = propTypes;
export default connect(
  null,
  mapDispatchToProps,
)(Menu);
