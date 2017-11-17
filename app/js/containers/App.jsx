import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import * as Actions from '../actions/catalyst';
import * as localeActions from '../actions/locale';
import { version } from '../data/appInfo.json';
import css from '../../style/app.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

const themeColor = {
  main: { backgroundColor: '#505050', color: '#ffffff' },
  second: { backgroundColor: '#707070', color: '#ffffff' },
  ground: { backgroundColor: '#ffffff', color: '#505050' },
  accent: '#ff7710',
};

const styles = {
  appBar: {
    ...themeColor.main,
    height: '40px',
  },
  title: {
    fontSize: '1.15em',
    textAlign: 'center',
    height: '40px',
    lineHeight: '40px',
  },
};

class App extends Component {
  componentWillMount() {
    // alert(navigator.userLanguage);
    // alert(navigator.browserLanguage);
    // alert(navigator.language);
  }
  render() {
    const { children, locale, actions } = this.props;
    console.log(locale, actions, version);
    return (
      <div style={{ ...themeColor.ground, height: '100vh' }} >
        <AppBar
          title="WRAP Catalyst mobile"
          titleStyle={styles.title}
          style={styles.appBar}
          showMenuIconButton={false}
        />
        <div className={css.contents}>
          {React.cloneElement(children, { themeColor })}
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
