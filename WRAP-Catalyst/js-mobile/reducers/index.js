import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import functionList from './functionList';
import locale from './locale';
import catalyst from './catalyst';
import map from './map';

const rootReducer = combineReducers({
  routing: routerReducer,
  functionList,
  locale,
  catalyst,
  map,
});

export default rootReducer;
