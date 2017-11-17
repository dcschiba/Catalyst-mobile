import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import wrapApi from '../middleware/api/wrap';
import layerMiddleware from '../middleware/layerMiddleware';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(wrapApi, layerMiddleware, routerMiddleware(hashHistory)),
  );
}
