import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import UpIcon from 'material-ui/svg-icons/navigation/expand-less';
import SlideLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import SlideRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import css from '../../../style/mapConsole.css';

const propTypes = {
  tabList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
};

const tabSize = '40%';
const tabSizeRate = 0.4;

class MapConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 0,
      isMenuShown: false,
    };
    this.menuForward = this.menuForward.bind(this);
    this.menuToggle = this.menuToggle.bind(this);
    this.cx = ClassNames.bind(css);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(value) {
    const tabSizePx = this.tabs.clientWidth * tabSizeRate;
    this.tabs.scrollTo(tabSizePx * ((value - 1) + 0.25), 0);
    this.setState({
      tabState: value,
    });
  }
  menuToggle(openFlag) {
    this.setState({
      isMenuShown: openFlag,
    });
  }
  menuForward(toForward) {
    if (toForward && this.state.tabState < this.props.tabList.length - 1) {
      const tabSizePx = this.tabs.clientWidth * tabSizeRate;
      this.tabs.scrollTo(tabSizePx * (this.state.tabState + 0.25), 0);
      this.setState({
        tabState: this.state.tabState + 1,
      });
    } else if (!toForward && this.state.tabState !== 0) {
      const tabSizePx = this.tabs.clientWidth * tabSizeRate;
      this.tabs.scrollTo(tabSizePx * ((this.state.tabState - 2) + 0.25), 0);
      this.setState({
        tabState: this.state.tabState - 1,
      });
    }
  }

  render() {
    const { tabList, themeColor } = this.props;
    const { isMenuShown, tabState } = this.state;
    const wrapper = this.cx({
      wrapper: true,
      hide: !isMenuShown,
    });
    const tabStyle = {
      wrapper: {
        width: '100%',
        overflowX: 'scroll',
        overflowY: 'hidden',
        backgroundColor: '#f5f5f5',
      },
      tabs: {
        position: 'relative',
        height: '60px',
        width: `calc(${tabSize} * ${tabList.length})`,
      },
      tab: {
        height: '60px',
        width: `calc(${tabSize} - 12px)`,
        padding: '0 6px',
        backgroundColor: '#f5f5f5',
        color: '#000000',
        overflow: 'hidden',
      },

      label: {
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    };
    const styles = {
      slide_button: {
        backgroundColor: '#f5f5f5',
      },
    };
    if (tabList.length <= 2) {
      tabStyle.tabs.width = '100%';
      tabStyle.tab.width = `${100 / tabList.length}%`;
      styles.slide_button = { display: 'none' };
    }
    return (
      <div>
        <div className={wrapper}>
          <div className={css.menu} style={themeColor.ground}>
            <div className={css.tab_area}>
              <button
                onClick={() => this.menuForward(false)}
                style={styles.slide_button}
                className={css.slide_button}
              >
                <SlideLeftIcon color={tabState !== 0 ? 'black' : '#f5f5f5'} />
              </button>
              <div style={tabStyle.wrapper} ref={(node) => { this.tabs = node; }}>
                <Tabs
                  value={tabState}
                  onChange={this.handleChange}
                  // onClick={() => this.menuToggle(true)}
                  inkBarStyle={{ backgroundColor: themeColor.accent }}
                  style={tabStyle.tabs}
                >
                  {tabList.map((item, index) => (
                    <Tab
                      key={index}
                      label={<div style={tabStyle.label}>{item.name}</div>}
                      value={Number(index)}
                      style={tabStyle.tab}
                      buttonStyle={tabStyle.button}
                      id={`${item.path}_tab`}
                    />
                  ))}
                </Tabs>
              </div>
              <button
                onClick={() => this.menuForward(true)}
                style={styles.slide_button}
                className={css.slide_button}
              >
                <SlideRightIcon color={tabState !== tabList.length - 1 ? 'black' : '#f5f5f5'} />
              </button>
            </div>
            <SwipeableViews
              index={tabState}
              onChangeIndex={this.handleChange}
            >
              {tabList.map((item, index) => {
                /* eslint-disable */
                const Menu = require(`../../containers/${item.path}/Menu`).default;
                return (
                  <div key={index} className={css.console_area}>
                    <Menu />
                  </div>
                );
              })}
            </SwipeableViews>
          </div>
          <button
            onClick={() => this.menuToggle(!isMenuShown)}
            className={css.spread_button}
          >
            {isMenuShown ? <div><CloseIcon /><div>close</div></div>
              : <div><UpIcon /><div>control</div></div>}
          </button>
        </div>
      </div>
    );
  }
}

MapConsole.propTypes = propTypes;
export default MapConsole;
