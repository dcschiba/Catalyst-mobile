import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import functionList from './functionList';
import locale from './locale';
import catalyst from './catalyst';
import map from './map';
import gpvgfs from './gpvgfs';
import jp10ten from './jp10ten';
import radar from './radar';
import waveblend from './waveblend';
import hilofront from './hilofront';
import disasterreport from './disasterreport';
import livecamera from './livecamera';
import jmawarn from './jmawarn';
import jmaseawarn from './jmaseawarn';
import lightning from './lightning';
import amedas from './amedas';
import compasshour from './compasshour';

const rootReducer = combineReducers({
  routing: routerReducer,
  functionList,
  locale,
  catalyst,
  map,
  gpvgfs,
  jp10ten,
  radar,
  waveblend,
  hilofront,
  disasterreport,
  livecamera,
  jmawarn,
  jmaseawarn,
  lightning,
  amedas,
  compasshour,
});

export default rootReducer;
