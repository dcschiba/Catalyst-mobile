import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import css from '../../../style/common/neonButton.css';

const propTypes = {
  isActive: PropTypes.bool,
};


class NeonButton extends Component {
  constructor(props) {
    super(props);
    this.cx = ClassNames.bind(css);
  }
  render() {
    const { isActive } = this.props;
    const buttonStyle = this.cx({
      neon: true,
      neon_light: isActive,
      neon_extinguish: !isActive,
    });
    const labelStyle = this.cx({
      neon_label: true,
      neon_label_light: isActive,
      neon_label_extinguish: !isActive,
    });
    return (
      <div className={buttonStyle}>
        <span className={labelStyle}>
          {isActive ? 'ON' : 'OFF'}
        </span>
      </div>
    );
  }
}

NeonButton.propTypes = propTypes;
export default NeonButton;
