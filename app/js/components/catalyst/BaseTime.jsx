import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import SpreadIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import css from '../../../style/baseTime.css';


const propTypes = {
  timeList: PropTypes.array,
  toggle: PropTypes.func.isRequired,
  flag: PropTypes.bool.isRequired,
};

const iconStyle = {
  position: 'absolute',
  bottom: '-7px',
  color: '#ffffff',
  width: '20px',
  left: 'calc(50% - 12px)',
};

class BaseTime extends Component {
  constructor(props) {
    super(props);
    this.cx = ClassNames.bind(css);
  }
  render() {
    const { timeList, flag } = this.props;
    const styles = {
      spread: {
        height: `calc(${timeList.length} * 20px + 12px )`,
        width: `calc(${Math.max(...timeList.map(item => item.name.length))} * 0.7em + 80px)`,
        padding: '6px',
        margin: '0 8px',
      },
      normal: {
        height: `calc(${timeList.length} * 20px + 10px )`,
        width: 'calc(100% - 20px)',
        padding: '6px 6px 12px 6px',
        margin: '0 8px',
      },
    };
    if (timeList.length > 3) {
      styles.normal.height = '72px';
    }

    return (
      <button
        onClick={() => this.props.toggle(!flag)}
        className={css.wrapper}
        style={flag ? styles.spread : styles.normal}
      >
        {timeList.map((line, index) =>
          <div className={css.line} key={index}>
            <div className={css.name}>
              {line.name.toUpperCase()}
            </div>
            <div className={css.base_time}>{line.baseTime}</div>
          </div>,
        )}
        {flag ? null : <SpreadIcon style={iconStyle} />}
      </button>
    );
  }
}

BaseTime.propTypes = propTypes;
export default BaseTime;
