import React from 'react';
import style from './styles/header';

/**
 * ヘッダーを表示する
 * @class Header
 **/

/**
 * @method props
 * @param title {string} ヘッダータイトル
 * @param leftItem {object} ヘッダー左部に表示する要素
 * @param rightItem {object} ヘッダー右部に表示する要素
 **/
const Header = props => (
  <div style={style.container}>
    <div style={style.leftItem}>{props.leftItem}</div>
    <div style={style.title}>{props.title}</div>
    <div style={style.rightItem}>{props.rightItem}</div>
  </div>
);

export default Header;
