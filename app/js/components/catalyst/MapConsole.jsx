import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
// import Hammer from 'hammerjs';
// import Checkbox from 'material-ui/Checkbox';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
// import DownIcon from 'material-ui/svg-icons/navigation/expand-more';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import UpIcon from 'material-ui/svg-icons/navigation/expand-less';
import SlideLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import SlideRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import css from '../../../style/mapConsole.css';
import NeonButton from './NeonButton';


// import { List, ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';

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
      isActive: {},
    };
    this.props.tabList.forEach((content) => {
      this.state.isActive[content] = false;
    });
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
  turnActive(contents, flag) {
    this.setState({
      isActive: { ...this.state.isActive, [contents]: flag },
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
        width: tabSize,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
        color: '#000000',
      },
    };
    const styles = {
      slide_button: {
        height: '100%',
        width: '30px',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 0,
        ...themeColor.main,
      },
      trigger_wrapper: {
        width: `calc(${tabList.length} * 60px)`,
      },
    };
    if (tabList.length <= 2) {
      tabStyle.tabs.width = '100%';
      tabStyle.tab.width = `${100 / tabList.length}%`;
    }
    return (
      <div>
        <div className={css.location_button}>
          <FloatingActionButton backgroundColor="white">
            <LocationIcon style={{ fill: '#4285f4' }} />
          </FloatingActionButton>
        </div>
        <div className={css.footer}>
          <SlideLeftIcon style={styles.slide_button} />
          <div className={css.contents_trigger_area}>
            <div className={css.contents_trigger_wrapper} style={styles.trigger_wrapper}>
              {tabList.map(contents => (
                <button
                  onClick={() => {
                    document.getElementById(contents).click();
                    this.turnActive(contents, !this.state.isActive[contents]);
                  }}
                  className={css.contents_trigger} style={themeColor.main}
                >{contents.slice(0, 4).toUpperCase()}..
              <NeonButton isActive={this.state.isActive[contents]} />
                </button>
              ))}
            </div>
          </div>
          <SlideRightIcon style={styles.slide_button} />
        </div>
        <div className={wrapper}>
          <div className={css.menu} style={themeColor.ground}>
            <div className={css.tab_area}>
              <button
                onClick={() => this.menuForward(false)}
                style={{ backgroundColor: '#f5f5f5' }}
                className={css.slide_button}
              >
                <SlideLeftIcon
                  color={tabState !== 0 ? 'black' : '#f5f5f5'}
                />
              </button>
              <div style={tabStyle.wrapper} ref={(node) => { this.tabs = node; }}>
                <Tabs
                  value={tabState}
                  onChange={this.handleChange}
                  // onClick={() => this.menuToggle(true)}
                  inkBarStyle={{ backgroundColor: themeColor.accent }}
                  className={css.tabs}
                  style={tabStyle.tabs}
                >
                  {tabList.map((item, index) => (
                    <Tab
                      key={index}
                      label={item}
                      value={Number(index)}
                      style={tabStyle.tab}
                    />
                  ))}
                </Tabs>
              </div>
              <button
                onClick={() => this.menuForward(true)}
                style={{ backgroundColor: '#f5f5f5' }}
                className={css.slide_button}
              >
                <SlideRightIcon
                  color={tabState !== 0 ? 'black' : '#f5f5f5'}
                />
              </button>
            </div>
            <SwipeableViews
              index={tabState}
              onChangeIndex={this.handleChange}
            >
              {tabList.map((item, index) => {
                /* eslint-disable */
                const Menu = require(`../../containers/${item}/Menu`).default;
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
