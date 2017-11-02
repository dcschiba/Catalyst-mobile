import React, { Component } from 'react';
import MetarMenu from '../metar/Menu';
import TafMenu from '../taf/Menu';

class Menu extends Component {
  render() {
    return (
      <div>
        <MetarMenu />
        <TafMenu />
      </div>
    );
  }
}

export default Menu;
