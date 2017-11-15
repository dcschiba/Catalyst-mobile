import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Tabs, Tab } from 'material-ui/Tabs';
import Hammer from 'hammerjs';
import Checkbox from 'material-ui/Checkbox';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import { blue500 } from 'material-ui/styles/colors';


// import { List, ListItem } from 'material-ui/List';
// import Checkbox from 'material-ui/Checkbox';
import css from '../../../style-mobile/MapConsole.css';

const propTypes = {
  tabList: PropTypes.object.isRequired,
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
    const hammerObj = new Hammer(this.menu);
    hammerObj.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
    hammerObj.on('swipeup', () => this.menuToggle(true));
    hammerObj.on('swipedown', () => this.menuToggle(false));
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
              ref={(node) => { this.menu = node; }}
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
                tabList.map((item, index) => (
                  <Tab
                    key={index}
                    label={item}
                    value={item}
                    buttonStyle={{ ...themeColor.main, ...styles.tab }}
                  >
                    <Checkbox style={styles.item} label={item} />
                    <Checkbox style={styles.item} label="teat1" />
                    <Checkbox style={styles.item} label="teat2" />
                    <Checkbox style={styles.item} label="teat3" />
                  </Tab>
                ))
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
