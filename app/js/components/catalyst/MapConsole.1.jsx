import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Tabs, Tab } from 'material-ui/Tabs';
import Hammer from 'hammerjs';
// import Checkbox from 'material-ui/Checkbox';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import { blue500 } from 'material-ui/styles/colors';
import css from '../../../style/MapConsole.css';


// import { List, ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';

const propTypes = {
  tabList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
};

const styles = {
  tab: {
    height: '40px',
  },
  item: {
    height: '40px',
    padding: '6px',
  },
};

class MapConsole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabStatus: this.props.tabList[0],
      isMenuShown: true,
    };
    this.menuToggle = this.menuToggle.bind(this);
    this.cx = ClassNames.bind(css);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    // material UIにrefが効かないのでclassNameでしていする
    const menuObj = new Hammer(document.getElementsByClassName('menu')[0].parentNode);
    const konbObj = new Hammer(this.konb);
    konbObj.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    konbObj.on('swipeup', () => this.menuToggle(true));
    konbObj.on('swipedown', () => this.menuToggle(false));
    menuObj.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    menuObj.on('swipeup', () => this.menuToggle(true));
    menuObj.on('swipedown', () => this.menuToggle(false));
  }
  handleChange(value) {
    this.setState({
      tabStatus: value,
    });
  }
  menuToggle(openFlag) {
    this.setState({
      isMenuShown: openFlag,
    });
  }
  render() {
    const { tabList, themeColor } = this.props;
    const { isMenuShown } = this.state;
    const wrapper = this.cx({
      wrapper: true,
      hide: !isMenuShown,
    });
    return (
      <div>
        <div className={wrapper}>
          <div className={css.baffer_area}>
            <div />
            <div
              className={css.konb_wrapper}
              ref={(node) => { this.konb = node; }}
            >
              <button className={css.knob} onClick={() => this.menuToggle(!isMenuShown)} />
            </div>
            <div className={css.locationIcon}>
              <LocationIcon color={blue500} />
              <div className={css.locationLabel}>現在地</div>
            </div>
          </div>
          <div className={css.menu} style={themeColor.ground}>
            <Tabs
              value={this.state.tabStatus}
              onChange={this.handleChange}
              onClick={() => this.menuToggle(true)}
              inkBarStyle={{ backgroundColor: themeColor.accent }}
            >
              {
                tabList.map((item, index) => {
                  /* eslint-disable */
                  const Menu = require(`../../containers/${item}/Menu`).default;
                  return (
                    <Tab
                      key={index}
                      label={item}
                      value={item}
                      buttonStyle={{ ...themeColor.main, ...styles.tab }}
                      className="menu"
                    >
                      <div className={css.console_area}>
                        <Menu />
                      </div>
                    </Tab>
                  );
                })
              }
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

MapConsole.propTypes = propTypes;
export default MapConsole;
