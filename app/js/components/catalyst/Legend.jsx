import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
const muiTheme = getMuiTheme({
  palette: {
    fontFamily: 'Noto Sans Japanese, sans-serif',
    primary1Color: '#4285f4',
    accent1Color: '#ff7710',
  },
});
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={wrapper}>
          <button
            onClick={() => toggle(!flag)}
            className={css.spread_button}
          >
            {flag ?
              <div>
                <CloseIcon style={styles.icon} />
                <div><FormattedMessage id="close_label" /></div>
              </div>
              : <div>
                <SpreadIcon style={styles.icon} />
                <div><FormattedMessage id="legend_label" /></div>
              </div>
            }
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
      </MuiThemeProvider>
    );
  }
}

Legend.propTypes = propTypes;
export default Legend;
