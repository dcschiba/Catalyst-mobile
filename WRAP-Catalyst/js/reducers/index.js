import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import gpvgsm from './gpvgsm';
import gpvukmet from './gpvukmet';
import gpvgfs from './gpvgfs';
import gpvmsm from './gpvmsm';
import metar from './metar';
import cargps from './cargps';
import taf from './taf';
import livecamera from './livecamera';
import lightning from './lightning';
import locale from './locale';
import map from './map';
import radar from './radar';
import metartaf from './metartaf';
import radaramedas from './radaramedas';
import satellite from './satellite';
import sigwx from './sigwx';
import sigmet from './sigmet';
import airport from './airport';
import vaa from './vaa';
import fir from './fir';
import fix from './fix';
import navaids from './navaids';
import latlon from './latlon';
import tiledmap from './tiledmap';
import multiLanguage from './multiLanguage';
import asc from './asc';
import asclatlon from './asclatlon';
import gass from './gass';
import liden from './liden';
import disasterreport from './disasterreport';
import msmground from './msmground';
import surfacepressure from './surfacepressure';
import iceconcentration from './iceconcentration';
import iceberg from './iceberg';
import seasprayicing from './seasprayicing';
import waveblend from './waveblend';
import seavisibility from './seavisibility';
import dash from './dash';
import current from './current';
import amedas from './amedas';
import playback from './playback';
import legend from './legend';
import catalyst from './catalyst';
import acos from './acos';
import jmawarn from './jmawarn';
import jmaseawarn from './jmaseawarn';
import hilofront from './hilofront';
import windbarbs from './windbarbs';
import graph from './graph';
import tropicalstorm from './tropicalstorm';
import jp10ten from './jp10ten';
import gpvhourlyAnalysis from './gpvhourlyAnalysis';
import basictest from './basictest';
import compasshour from './compasshour';

const rootReducer = combineReducers({
  routing: routerReducer,
  gpvgsm,
  gpvukmet,
  gpvgfs,
  gpvmsm,
  metar,
  cargps,
  taf,
  livecamera,
  lightning,
  locale,
  map,
  radar,
  metartaf,
  satellite,
  radaramedas,
  sigwx,
  sigmet,
  airport,
  vaa,
  fir,
  fix,
  navaids,
  latlon,
  tiledmap,
  multiLanguage,
  asc,
  asclatlon,
  gass,
  liden,
  disasterreport,
  msmground,
  surfacepressure,
  iceconcentration,
  iceberg,
  seasprayicing,
  waveblend,
  seavisibility,
  dash,
  current,
  playback,
  legend,
  catalyst,
  amedas,
  acos,
  jmawarn,
  jmaseawarn,
  hilofront,
  windbarbs,
  graph,
  tropicalstorm,
  jp10ten,
  gpvhourlyAnalysis,
  basictest,
  compasshour,
});

export default rootReducer;
