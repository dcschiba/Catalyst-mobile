import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { pinkA200 } from 'material-ui/styles/colors';
import { addLocaleData } from 'react-intl';
import ja from 'react-intl/locale-data/ja';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import vi from 'react-intl/locale-data/vi';
import App from './js/containers/App';
import Top from './js-mobile/containers/Top';
import Introduction from './js/containers/Introduction';
import Description from './js/containers/Description';
import General from './js/containers/General';
import configureStore from './js/store/configureStore';
import './style/index.css';

const muiTheme = getMuiTheme({
  palette: {
    fontFamily: 'Noto Sans Japanese, sans-serif',
    primary1Color: '#0b419a',
    primary2Color: '#00cae4',
    accent1Color: pinkA200,
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
        <Route path="/" component={App}>
          <IndexRoute component={Top} />
          <Route path="top" component={Top} />
          <Route path="introduction" component={Introduction} />
          <Route path="introduction/:path" component={Introduction} />
          <Route path="description/:path" component={Description} />
          <Route path="general/:path" component={General} />
          <Route path="*" component={Top} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  rootElement,
);
