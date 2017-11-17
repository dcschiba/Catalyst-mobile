import React, { Component } from 'react';
import style from './styles/sideMenu';


/**
 * 左メニューを表示する
 * @class SideMenu
 **/

/**
 * @method props
 * @param content {object} 内部に表示する要素
 **/
class SideMenu extends Component {
  render() {
    return (
      <div style={style.menu}>
        <div style={style.content}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default SideMenu;
