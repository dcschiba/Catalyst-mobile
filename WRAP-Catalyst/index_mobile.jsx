import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { pinkA200 } from 'material-ui/styles/colors';
import App from './js/containers/App';
import Launch from './js-mobile/containers/Launch';
import Start from './js-mobile/containers/Start';
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

render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={history}>
        <Route path="/" component={Launch} />
        <Route path="start" component={Start} />
        <Route path="app" component={App}>
          <IndexRoute component={Launch} />
          <Route path="introduction" component={Introduction} />
          <Route path="introduction/:path" component={Introduction} />
          <Route path="description/:path" component={Description} />
          <Route path="general/:path" component={General} />
          <Route path="*" component={Launch} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,
  rootElement,
);
