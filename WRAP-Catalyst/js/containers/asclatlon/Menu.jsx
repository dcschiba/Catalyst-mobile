import React, { Component } from 'react';
import ASCMenu from '../asc/Menu';
import LatLonMenu from '../latlon/Menu';

class Menu extends Component {
  render() {
    return (
      <div>
        <ASCMenu />
        <LatLonMenu />
      </div>
    );
  }
}

export default Menu;
