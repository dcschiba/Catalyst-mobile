import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WRAP from 'WRAP';
import css from '../../../style/webgl/zoomcontrol.css';

const propTypes = {
  mapins: PropTypes.object,
};
class ZoomControl extends Component {
  static zoomin() {
    WRAP.Geo.setZoom(WRAP.Geo.getZoom() + 1);
  }
  static zoomout() {
    WRAP.Geo.setZoom(WRAP.Geo.getZoom() - 1);
  }
  render() {
    return (
      <div className={css.webglzoom}>
        <button
          id="webglzoominbt"
          className={css.webglzoombt}
          type="button"
          title="Zoom in"
          onClick={ZoomControl.zoomin}
        >+</button>
        <button
          id="webglzoomoutbt"
          className={css.webglzoombt}
          type="button"
          title="Zoom in"
          onClick={ZoomControl.zoomout}
        >-</button>
      </div>
    );
  }
}

ZoomControl.propTypes = propTypes;
export default ZoomControl;
