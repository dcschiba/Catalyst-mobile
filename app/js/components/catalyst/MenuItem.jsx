import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import css from '../../../style/common/menuItem.css';

const propTypes = {
  children: PropTypes.object,
  leftItem: PropTypes.object,
  rightItem: PropTypes.object,
  showChildFlag: PropTypes.bool,
};

class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.cx = ClassNames.bind(css);
  }
  render() {
    const { children = [], leftItem, rightItem, showChildFlag = false } = this.props;
    const childStyle = {
      height: `calc(${children ? children.length : 0} * 56px)`,
    };
    return (
      <div className={css.wrapper}>
        <div className={css.line}>
          <div className={css.leftItem}>{leftItem}</div>
          <div className={css.rightItem}>{rightItem}</div>
        </div>
        <div className={css.childrenWrapper} style={showChildFlag ? childStyle : {}}>
          {children}
        </div>
      </div>
    );
  }
}

MenuItem.propTypes = propTypes;
export default MenuItem;
