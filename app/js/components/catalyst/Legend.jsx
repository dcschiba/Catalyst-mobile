import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import SpreadIcon from 'material-ui/svg-icons/navigation/chevron-left';
import css from '../../../style/legend.css';

const propTypes = {
  // tabList: PropTypes.array.isRequired,
  toggle: PropTypes.func.isRequired,
  flag: PropTypes.bool.isRequired,
  moreHidden: PropTypes.bool.isRequired,
};

const styles = {
  icon: {
    color: '#dddddd',
  },
};

class Legend extends Component {
  constructor(props) {
    super(props);
    this.cx = ClassNames.bind(css);
  }
  render() {
    const { toggle, flag, moreHidden } = this.props;
    const wrapper = this.cx({
      wrapper: true,
      hidden: !flag,
      moreHidden,
    });
    return (
      <div className={wrapper}>
        <button
          onClick={() => toggle(!flag)}
          className={css.spread_button}
        >
          {flag ? <div><CloseIcon style={styles.icon} /><div>close</div></div>
            : <div><SpreadIcon style={styles.icon} /><div>Legend</div></div>}
        </button>
        <div className={css.contents}>
        aaa
        </div>
      </div>
    );
  }
}

Legend.propTypes = propTypes;
export default Legend;
