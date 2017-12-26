import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  Icon: PropTypes.any,
  label: PropTypes.any,
  onClick: PropTypes.func,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  className: PropTypes.any,
};

const defaultStyle = {
  button_style: {
    color: '#ffffff',
    backgroundColor: 'transparent',
    width: '96px',
    height: '40px',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    padding: '0 10px',
    fontSize: '0.9em',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
  },
  icon_style: {
    color: '#ffffff',
    marginRight: '10px',
  },
};

class IconButton extends Component {
  render() {
    const { label = '', onClick = {}, className = {}, Icon, iconStyle } = this.props;
    const style = { ...defaultStyle.button_style, ...this.props.style };
    return (
      <button onClick={() => onClick()} style={style} className={className}>
        {Icon ? <Icon style={{ ...defaultStyle.icon_style, ...iconStyle }} /> : null}
        {label}
      </button>
    );
  }
}

IconButton.propTypes = propTypes;
export default IconButton;
