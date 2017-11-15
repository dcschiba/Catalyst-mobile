import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames/bind';
import { Tabs, Tab } from 'material-ui/Tabs';
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
  handleChange(value) {
    this.setState({
      tabStatus: value,
    });
  }
  menuToggle() {
    this.setState({
      isMenuShown: !this.state.isMenuShown,
    });
  }
  menuOpen() {
    this.setState({
      isMenuShown: true,
    });
  }
  render() {
    const { tabList, themeColor } = this.props;
    const wrapper = this.cx({
      wrapper: true,
      hide: !this.state.isMenuShown,
    });
    return (
      <div className={wrapper}>
        <div className={css.buffer_area}>
          <button className={css.knob} onClick={() => this.menuToggle()} />
          <div className={css.locationIcon}>
            <LocationIcon color={blue500} />
            <div className={css.locationLabel}>現在地</div>
          </div>
        </div>
        <div className={css.menu} style={themeColor.ground}>
          <Tabs
            value={this.state.tabStatus}
            onChange={this.handleChange}
            onClick={() => this.menuOpen()}
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
                  <Checkbox
                    label={item}
                  />
                </Tab>
              ))
            }
          </Tabs>
        </div>
      </div>
    );
  }
}

MapConsole.propTypes = propTypes;
export default MapConsole;
