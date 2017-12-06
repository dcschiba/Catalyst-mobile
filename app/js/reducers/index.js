import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { STORE_INITIALIZE } from '../constants/ActionTypes';
import layerInit from './layerInit';
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
import loading from './loading';

const appReducer = combineReducers({
  routing: routerReducer,
  layerInit,
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
  loading,
});

const rootReducer = (state, action) => {
  let newState = state;
  if (action.type === STORE_INITIALIZE) {
    newState = {
      ...state,
      layerInit: undefined,
      gpvgfs: undefined,
      jp10ten: undefined,
      radar: undefined,
      waveblend: undefined,
      hilofront: undefined,
      disasterreport: undefined,
      livecamera: undefined,
      jmawarn: undefined,
      jmaseawarn: undefined,
      lightning: undefined,
      amedas: undefined,
      compasshour: undefined,
      loading: undefined,
    };
  }
  return appReducer(newState, action);
};

export default rootReducer;
