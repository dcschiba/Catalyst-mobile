import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import * as Actions from '../actions/catalyst';
import * as localeActions from '../actions/locale';
// import { version } from '../data/appInfo.json';
import css from '../../style/app.css';

const propTypes = {
  children: PropTypes.object.isRequired,
//  actions: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const themeColor = {
  main: { backgroundColor: '#333333', color: '#ffffff' },
  second: { backgroundColor: '#707070', color: '#ffffff' },
  ground: { backgroundColor: '#ffffff', color: '#505050' },
  accent: '#ff7710',
};

const styles = {
  appBar: {
    ...themeColor.main,
    height: '50px',
    boxShadow: '0px 1px 8px #333333',
  },
  title: {
    fontSize: '1.15em',
    lineHeight: '50px',
  },
  settingButton: {
    padding: '6px 14px 6px 14px',
    margin: '0px',
  },
};

class App extends Component {
  render() {
    const { children, locale } = this.props;
    return (
      <div style={{ ...themeColor.ground }} >
        <AppBar
          title="WRAP Catalyst"
          titleStyle={styles.title}
          style={styles.appBar}
          showMenuIconButton={false}
          iconElementRight={
            <SettingIcon color={themeColor.main.color} style={styles.settingButton} />
          }
        />
        <div className={css.contents}>
          {React.cloneElement(children, { themeColor, locale })}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const locale = state.locale.locale;
  const title = state.catalyst.title;
  return {
    locale,
    title,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, Actions, localeActions), dispatch),
  };
}

App.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
