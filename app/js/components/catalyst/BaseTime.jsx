import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import SpreadIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import WrapUtils from '../../common/utils/WrapUtils';
import css from '../../../style/baseTime.css';

const propTypes = {
  timeList: PropTypes.array,
  spreadtoggle: PropTypes.func.isRequired,
  spreadFlag: PropTypes.bool.isRequired,
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
    const { timeList, spreadFlag } = this.props;
    if (timeList.length === 0) {
      return null;
    }
    const styles = {
      spread: {
        height: `calc(${timeList.length} * 20px + 12px )`,
        minWidth: 'calc(100% - 20px)',
        width: `calc(${Math.max(...timeList.map(item => item.name.length))} * 0.7em + 80px)`,
        padding: '6px',
        margin: '0 8px',
      },
      normal: {
        height: timeList.length > 3 ? '72px' : `calc(${timeList.length} * 20px + 12px)`,
        minWidth: 'calc(100% - 20px)',
        width: 'calc(100% - 20px)',
        padding: '6px 6px 8px 6px',
        margin: '0 8px',
      },
    };

    return (
      <button
        onClick={() => this.props.spreadtoggle(!spreadFlag)}
        className={css.wrapper}
        style={spreadFlag ? styles.spread : styles.normal}
      >
        {timeList.map((line, index) =>
          <div className={css.line} key={index}>
            <div className={css.name}>
              {line.name.toUpperCase()}
            </div>
            <div className={css.base_time}>{
              WrapUtils.dateFormat(line.basetime, 'MM/DD hh:mm', 9 * 3600)
            }</div>
          </div>,
        )}
        {spreadFlag ? null : <SpreadIcon style={iconStyle} />}
      </button>
    );
  }
}

BaseTime.propTypes = propTypes;
export default BaseTime;
