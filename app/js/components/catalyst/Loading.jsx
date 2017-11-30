import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const propTypes = {
  show: PropTypes.bool.isRequired,
  fullScreen: PropTypes.bool,
  blurStyle: PropTypes.object,
  iconStyle: PropTypes.object,
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
    margin: 0,
    padding: 0,
  },
  iconStyle: {
    margin: 'calc(50% - 16px)',
  },

};

class Loading extends Component {
  render() {
    if (!this.props.show) { return null; }
    const {
      fullScreen = true,
      blurStyle,
      iconStyle,
    } = this.props;

    const blur = {
      ...fullScreen ? styles.blur_full_screan : styles.blur_full_screan,
      ...blurStyle,
    };
    const icon = {
      ...styles.iconStyle,
      ...iconStyle,
    };
    return (
      <div style={blur}>
        <RefreshIndicator
          status="loading"
          size={40}
          left={0}
          top={0}
          style={icon}
        />
      </div>
    );
  }
}

Loading.propTypes = propTypes;
export default Loading;
