import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import wrapApi from '../middleware/api/wrap';
import layerMiddleware from '../middleware/layerMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(wrapApi, layerMiddleware, routerMiddleware(hashHistory), createLogger()),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
