import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  show: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool,
  blurStyle: PropTypes.object,
  iconStyle: PropTypes.object,
  iconWrapperStyle: PropTypes.object,
};

const styles = {
  blur: {
    position: 'relative',
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',
    backgroundColor: '#888888',
    opacity: '0.6',
  },
  blur_full_screan: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    backgroundColor: '#888888',
    opacity: 1,
    zIndex: 2000,
    margin: 'auto',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  iconWrapper: {
    width: '40px',
    height: '40px',
    margin: 'auto',
    backgroundColor: '#ffffff',
  },
};

class Loading extends Component {
  render() {
    if (!this.props.show) { return null; }

    const {
      fullScreen = true,
      blurStyle,
      iconStyle,
      iconWrapperStyle,
    } = this.props;

    const blur = {
      ...fullScreen ? styles.blur_full_screan : styles.blur_full_screan,
      ...blurStyle,
    };
    const iconWrapper = {
      ...styles.iconWrapper,
      ...iconWrapperStyle,
    };
    const icon = {
      ...styles.iconStyle,
      ...iconStyle,
    };
    return (
      <div style={blur}>
        <div style={iconWrapper}>
          <img alt="Now Loading..." style={icon} />
        </div>
      </div>
    );
  }
}

Loading.propTypes = propTypes;
export default Loading;
