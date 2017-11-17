import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import functionList from './functionList';
import locale from './locale';
import catalyst from './catalyst';
import map from './map';
import gpvgfs from './gpvgfs';
import jp10ten from './jp10ten';

const rootReducer = combineReducers({
  routing: routerReducer,
  functionList,
  locale,
  catalyst,
  map,
  gpvgfs,
  jp10ten,
});

export default rootReducer;
