import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { addLocaleData } from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ja from 'react-intl/locale-data/ja';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import vi from 'react-intl/locale-data/vi';
import Top from './js/containers/Top';
import App from './js/containers/App';
import Launch from './js/containers/Launch';
import Start from './js/containers/Start';
import Main from './js/containers/Main';
import configureStore from './js/store/configureStore';
import './style/index.css';

const initPushNotification = () => {
  const push = window.PushNotification.init({
    android: { vibrate: true, forceShow: true },
    ios: { alert: true, badge: true, sound: true },
  });

  push.on('registration', (data) => {
    alert('registration');
    let url;
    if (process.NODE_ENV === 'production') {
      url = 'http://192.168.10.4:3000';
    } else {
      url = 'http://192.168.10.4:3000';
    }
    const method = 'POST';
    const body = JSON.stringify(data);
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(`${url}/notification/regist`, { method, headers, body })
      .catch(alert('Push registration error'));
  });

  push.on('notification', (data) => {
    alert('notification');
    console.log(data);
  });

  push.on('error', (e) => {
    alert('error');
    console.error(e);
  });
};

document.addEventListener('deviceready', initPushNotification, false);

const muiTheme = getMuiTheme({
  palette: {
    fontFamily: 'Noto Sans Japanese, sans-serif',
    primary1Color: '#505050',
    primary2Color: '#707070',
    accent1Color: '#ff7710',
  },
});

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

const rootElement = document.getElementById('root');

addLocaleData([...ja, ...en, ...fr, ...vi]);
if (!global.Intl) {
  /* eslint-disable global-require */
  require('intl');
  require('intl/locale-data/jsonp/ja.js');
  require('intl/locale-data/jsonp/en.js');
  require('intl/locale-data/jsonp/fr.js');
  require('intl/locale-data/jsonp/vi.js');
}

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Route path="/" component={Launch} />
        <Route path="start" component={Start} />
        <Route path="app" component={App}>
          <IndexRoute component={Top} />
          <Route path="top" component={Top} />
          <Route path="main" component={Main} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  rootElement,
);
