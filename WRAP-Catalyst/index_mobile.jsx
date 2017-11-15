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
import Top from './js-mobile/containers/Top';
import App from './js-mobile/containers/App';
import Launch from './js-mobile/containers/Launch';
import Start from './js-mobile/containers/Start';
import Main from './js-mobile/containers/Main';
import configureStore from './js-mobile/store/configureStore';
import './style/index.css';

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
