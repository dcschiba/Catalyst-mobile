import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import WrapController from 'WRAP/UI/WrapController';
import * as mapActions from '../../actions/map';
import * as tiledMapActions from '../../actions/tiledmap';
import css from '../../../style/mapswitch/menu.css';
import * as mapSource from '../../constants/map/mapSource';

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
      case 'google':
        actions.switchGMap(true);
        actions.switchOlMap(false);
        actions.switchWebGLMap(false);
        actions.blueMarbleClick(false);
        actions.worldCoastlineClick(false);
        WrapController.switchMap(WrapController.gmap_ins);
        break;
      case 'os':
        actions.switchGMap(false);
        actions.switchOlMap(true);
        actions.changeMapSource(mapSource.OPEN_STREET_MAP);
        actions.switchWebGLMap(false);
        actions.blueMarbleClick(false);
        actions.worldCoastlineClick(false);
        WrapController.switchMap(WrapController.olmap_ins);
        break;
      case 'gsi':
        actions.switchGMap(false);
        actions.switchOlMap(true);
        actions.changeMapSource(mapSource.GSI);
        actions.switchWebGLMap(false);
        actions.blueMarbleClick(false);
        actions.worldCoastlineClick(false);
        WrapController.switchMap(WrapController.olmap_ins);
        break;
      case 'webgl_blue_marble':
        actions.switchGMap(false);
        actions.switchOlMap(false);
        actions.switchWebGLMap(true);
        actions.blueMarbleClick(true);
        actions.worldCoastlineClick(false);
        if (WrapController.webglmap_ins !== WrapController.currentMap) {
          WrapController.switchMap(WrapController.webglmap_ins);
        }
        break;
      case 'webgl_coast_line':
        actions.switchGMap(false);
        actions.switchOlMap(false);
        actions.switchWebGLMap(true);
        actions.blueMarbleClick(false);
        actions.worldCoastlineClick(true);
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
        <RadioButtonGroup name="selectMap" defaultSelected={'google'} onChange={this.handleChange}>
          <RadioButton
            value="google"
            label="GoogleMap"
          />
          <RadioButton
            style={{ pointerEvents: 'none' }}
            iconStyle={{ display: 'none' }}
            inputStyle={{ pointerEvents: 'none' }}
            labelStyle={{ pointerEvents: 'none' }}
            label="OpenLayers"
          />
          <RadioButton
            style={{ paddingLeft: '1em' }}
            value="os"
            label="OpenStreetMap"
          />
          <RadioButton
            style={{ paddingLeft: '1em' }}
            value="gsi"
            label="国土地理院"
          />
          <RadioButton
            style={{ pointerEvents: 'none' }}
            iconStyle={{ display: 'none' }}
            inputStyle={{ pointerEvents: 'none' }}
            labelStyle={{ pointerEvents: 'none' }}
            label="WebGL Map"
          />
          <RadioButton
            value="webgl_blue_marble"
            label="NASA Blue Marble"
          />
          <RadioButton
            value="webgl_coast_line"
            label="World Coast Line"
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
