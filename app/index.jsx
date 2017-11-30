import React from 'react';
// import WRAP from 'WRAP';
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
    console.log(data);
    let url;
    if (process.NODE_ENV === 'production') {
      url = 'https://catalyst-push.glitch.me';
    } else {
      url = 'http://192.168.10.4:3000';
    }
    const method = 'POST';
    const body = {
      token: data.token,
      uuid: 456,
      platform: 'Android',
    };
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    fetch(`${url}/notification/regist`, { method, headers, body })
      .catch(alert('Push registration error'));
  });

  push.on('notification', (data) => {
    hashHistory.push('app/top');
    console.log(data);
  });

  push.on('error', (e) => {
    alert('error');
    console.error(e);
  });
};

// ���[�J���T�[�o�[�N���C�x���g
document.addEventListener('deviceready', () => {
  initPushNotification();
  window.cordova.plugins.CorHttpd.startServer(
    {
      www_root: '/data/data/com.wni.wrap/cache/',
      port: 50000,
    },
    {},
    () => alert('loadFS error'),
  );
  window.cordova.plugins.CorHttpd.startServer(
    {
      www_root: 'pri',
      port: 50001,
    },
    {},
    () => alert('loadFS error'),
  );
});


// document.addEventListener('cd', initPushNotification, false);
// WRAP.DH.set({ baseurl: 'http://localhost:50001' });

// document.addEventListener('offline', () => {
//   alert('offline');
//   WRAP.DH.set({ baseurl: 'http://localhost:50001' });
// }, false);
// document.addEventListener('online', () => {
//   alert('online');
//   WRAP.DH.set({ baseurl: 'https://pt-wrap01.wni.co.jp' });
// }, false);

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
