import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Header from 'WRAP/UI/Header';
import MultilingualPullDown from '../components/catalyst/MultilingualPullDown';
import * as Actions from '../actions/catalyst';
import * as localeActions from '../actions/locale';
import logo from '../../img/logo.png';
import { version } from '../data/appInfo.json';

const propTypes = {
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

class App extends Component {
  componentWillMount() {
    // alert(navigator.userLanguage);
    // alert(navigator.browserLanguage);
    // alert(navigator.language);
  }
  render() {
    const { children, locale, actions } = this.props;

    return (
      <div>
        <Header
          title={<span>WRAP-Catalyst<span style={{ fontSize: '0.7em' }}>　　ver {version}</span></span>}
          leftItem={<Link to="/"><img src={logo} alt="weathernew" /></Link>}
          rightItem={<MultilingualPullDown locale={locale} onChange={actions.changeLocale} />}
        />
        <div>{children}</div>
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
