import React from 'react';
import style from './styles/mainContent';

/**
 * メインコンテンツを表示する
 * @class MainContent
 **/

/**
 * @method props
 * @param content {object} 内部に表示する要素
 **/
const MainContent = props => (
  <div style={style.container}>
    {props.content}
  </div>
);

export default MainContent;
