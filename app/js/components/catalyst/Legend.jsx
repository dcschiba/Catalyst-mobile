import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import SpreadIcon from 'material-ui/svg-icons/navigation/chevron-left';
import css from '../../../style/legend.css';

const propTypes = {
  tabList: PropTypes.array.isRequired,
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
    /* eslint-disable global-require,import/no-dynamic-require */
    const legendList = [];
    props.tabList.forEach((item) => {
      if (item.legend) {
        const LegendItem = require(`../../containers/${item.path}/Legend`).default;
        legendList.push({
          name: item.name,
          content: <LegendItem key={item.path} />,
        });
      }
    });
    this.state = {
      legendList,
    };
  }
  render() {
    const { toggle, flag, moreHidden } = this.props;
    const wrapper = this.cx({
      wrapper: true,
      hidden: !flag,
      moreHidden,
    });
    if (this.state.legendList.length === 0) {
      return null;
    }
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
          {this.state.legendList.map((legend, index) => (
            <div
              className={css.item}
              key={index}
              style={index === this.state.legendList.length - 1 ? { border: 'none' } : {}}
            >
              <div>{legend.name}</div>
              <div>{legend.content}</div>
            </div>
          ),
          )}
        </div>
      </div>
    );
  }
}

Legend.propTypes = propTypes;
export default Legend;
