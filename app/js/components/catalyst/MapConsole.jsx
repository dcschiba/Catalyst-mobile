import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
// import Hammer from 'hammerjs';
// import Checkbox from 'material-ui/Checkbox';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import IconButton from 'material-ui/IconButton';
import DownButton from 'material-ui/svg-icons/navigation/expand-more';
import UpButton from 'material-ui/svg-icons/navigation/expand-less';
import SlideLeftButton from 'material-ui/svg-icons/navigation/chevron-left';
import SlideRightButton from 'material-ui/svg-icons/navigation/chevron-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import css from '../../../style/mapConsole.css';


// import { List, ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';

const propTypes = {
  tabList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
};

const tabSize = '40%';
const tabSizeRate = 0.4;
const styles = {
  locationButton: {
    margin: '0 14px 30px 0',
  },
  spread_button: {
    height: '100%',
    width: '90px',
    border: 'solid 1px #666666',
  },
  slide_button: {
    height: '100%',
    width: '50px',
    padding: 0,
    border: 'solid 1px #666666',
  },
};

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
  componentDidMount() {
    // // material UIにrefが効かないのでclassNameでしていする
    // const tabObj = new Hammer(document.getElementsByClassName('mapconsole_tab')[0].parentNode);
    // const konbObj = new Hammer(this.konb);
    // konbObj.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    // konbObj.on('swipeup', () => this.menuToggle(true));
    // konbObj.on('swipedown', () => this.menuToggle(false));
    // tabObj.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    // tabObj.on('swipeup', () => this.menuToggle(true));
    // tabObj.on('swipedown', () => this.menuToggle(false));
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
        ...themeColor.main,
      },
      tabs: {
        position: 'relative',
        height: '50px',
        width: `calc(${tabSize} * ${tabList.length})`,
      },
      tab: {
        height: '50px',
        width: tabSize,
        overflow: 'hidden',
      },
    };
    // TODO 変数化、共通化
    if (tabList.length === 1) {
      tabStyle.tabs = '100%';
      tabStyle.tab.width = '100%';
    } else if (tabList.length === 2) {
      tabStyle.tabs = '100%';
      tabStyle.tab.width = '50%';
    }
    return (
      <div>
        <div className={wrapper}>
          <div className={css.baffer_area}>
            <FloatingActionButton backgroundColor="white" style={styles.locationButton}>
              <LocationIcon style={{ fill: '#4285f4' }} />
            </FloatingActionButton>
          </div>
          <div>
            {tabList.map(contents => (
              <button onClick={() => document.getElementById(contents).click()}>{contents}</button>
            ))}
          </div>
          <div className={css.menu} style={themeColor.ground}>
            <div className={css.tab_area}>
              <IconButton
                onClick={() => this.menuToggle(!isMenuShown)}
                style={{ ...themeColor.main, ...styles.spread_button }}
                className={css.spread_button}
              >
                {isMenuShown ? <DownButton color={themeColor.main.color} />
                  : <UpButton color={themeColor.main.color} />}
              </IconButton>
              <IconButton
                onClick={() => this.menuForward(false)}
                style={{ ...themeColor.main, ...styles.slide_button }}
              >
                <SlideLeftButton
                  color={tabState !== 0 ? themeColor.main.color : themeColor.main.backgroundColor}
                />
              </IconButton>
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
              <IconButton
                onClick={() => this.menuForward(true)}
                style={{ ...themeColor.main, ...styles.slide_button }}
              >
                <SlideRightButton
                  color={tabState !== tabList.length - 1 ?
                    themeColor.main.color : themeColor.main.backgroundColor}
                />
              </IconButton>
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
        </div>
      </div>
    );
  }
}

MapConsole.propTypes = propTypes;
export default MapConsole;
