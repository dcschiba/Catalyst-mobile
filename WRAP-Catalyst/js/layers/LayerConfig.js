import CarGpsLayer from '../layers/CarGpsLayer';
import LiveCameraLayer from '../layers/LiveCameraLayer';
import LightningLayer from '../layers/LightningLayer';
import LidenLayer from '../layers/LidenLayer';
import METARLayer from '../layers/METARLayer';
import TAFLayer from '../layers/TAFLayer';
import DisasterReportLayer from '../layers/DisasterReportLayer';
import SigwxLayer from '../layers/sigwx/SigwxLayer';
import SigwxUkHighPastLayer from '../layers/sigwx/SigwxUkHighPastLayer';
import SigwxUkMiddlePastLayer from '../layers/sigwx/SigwxUkMiddlePastLayer';
import SigwxUsHighPastLayer from '../layers/sigwx/SigwxUsHighPastLayer';
import SigwxUsMiddlePastLayer from '../layers/sigwx/SigwxUsMiddlePastLayer';
import AirportLayer from '../layers/AirportLayer';
import VAALayer from '../layers/VAALayer';
import FixLayer from '../layers/FixLayer';
import AmedasLayer from '../layers/AmedasLayer';
import JPRadarLayer from '../layers/radar/JPRadarLayer';
import UsakRadarLayer from '../layers/radar/UsakRadarLayer';
import UsguRadarLayer from '../layers/radar/UsguRadarLayer';
import UshiRadarLayer from '../layers/radar/UshiRadarLayer';
import UsnaRadarLayer from '../layers/radar/UsnaRadarLayer';
import UsprRadarLayer from '../layers/radar/UsprRadarLayer';
import EURadarLayer from '../layers/radar/EURadarLayer';
import AURadarLayer from '../layers/radar/AURadarLayer';
import KRRadarLayer from '../layers/radar/KRRadarLayer';
import TWRadarLayer from '../layers/radar/TWRadarLayer';
import CARadarLayer from '../layers/radar/CARadarLayer';
import SatelliteLayer from '../layers/SatelliteLayer';
import JpIcdbRadarLayer from '../layers/radar/JpIcdbRadarLayer';
import JpEchotopRadarLayer from '../layers/radar/JpEchotopRadarLayer';
import NowcastRadarLayer from '../layers/radar/NowcastRadarLayer';
import AnlsisRadarLayer from '../layers/radar/AnlsisRadarLayer';
import AnlsisExtraRadarLayer from '../layers/radar/AnlsisExtraRadarLayer';
import GPVTmpContourLayer from '../layers/gpv/GPVTmpContourLayer';
import GPVTmpFillLayer from '../layers/gpv/GPVTmpFillLayer';
import GPVTmpGridValueLayer from '../layers/gpv/GPVTmpGridValueLayer';
import GPVHgtContourLayer from '../layers/gpv/GPVHgtContourLayer';
import GPVHgtFillLayer from '../layers/gpv/GPVHgtFillLayer';
import GPVHgtGridValueLayer from '../layers/gpv/GPVHgtGridValueLayer';
import GPVRhContourLayer from '../layers/gpv/GPVRhContourLayer';
import GPVRhFillLayer from '../layers/gpv/GPVRhFillLayer';
import GPVRhGridValueLayer from '../layers/gpv/GPVRhGridValueLayer';
import GPVIcingprobLayer from '../layers/gpv/GPVIcingprobLayer';
import GPVIsotachLayer from '../layers/gpv/GPVIsotachLayer';
import GPVWindLayer from '../layers/gpv/GPVWindLayer';
import GPVPrecipitationLayer from '../layers/gpv/GPVPrecipitationLayer';
import GPVSnowDepthLayer from '../layers/gpv/GPVSnowDepthLayer';
import GPVPressureMslLayer from '../layers/gpv/GPVPressureMslLayer';
import SurfacePressureLayer from '../layers/SurfacePressureLayer';
import FirLayer from '../layers/FirLayer';
import LatLonLayer from '../layers/LatLonLayer';
import NavaidsLayer from '../layers/NavaidsLayer';
import WorldBorderLayer from '../layers/WorldBorderLayer';
import WorldCoastlineLayer from '../layers/WorldCoastlineLayer';
import JapanBorderLayer from '../layers/JapanBorderLayer';
import BlueMarbleLayer from '../layers/BlueMarbleLayer';
import SigmetLayer from '../layers/SigmetLayer';
import RadarAmedasANLSISLayer from '../layers/RadarAmedasANLSISLayer';
import RadarAmedasNOWCASTLayer from '../layers/RadarAmedasNOWCASTLayer';
import AscLayer from '../layers/AscLayer';
import GASSLayer from '../layers/GASSLayer';
import CurrentLayer from '../layers/CurrentLayer';
import JmaseaforecastLayer from '../layers/jmawarn/JmaseaforecastLayer';
import JmaseawarnLayer from '../layers/jmawarn/JmaseawarnLayer';
import JmawarnBorderLayer from '../layers/jmawarn/JmawarnBorderLayer';
import JmawarnLayer from '../layers/jmawarn/JmawarnLayer';
import AcosGpvLayer from '../layers/acos/AcosGpvLayer';
import AcosRankLayer from '../layers/acos/AcosRankLayer';
import SurfaceAnalysisFrontLayer from '../layers/hilofront/SurfaceAnalysisFrontLayer';
import SurfacePressureContourLayer from '../layers/hilofront/SurfacePressureContourLayer';
import SurfacePressureHiroLayer from '../layers/hilofront/SurfacePressureHiroLayer';
import WindBarbsLayer from '../layers/WindBarbsLayer';
import SeaVisibilityLayer from '../layers/SeaVisibilityLayer';
import DashLayer from '../layers/DashLayer';
import IceConcentrationLayer from '../layers/IceConcentrationLayer';
import IceBergLayer from '../layers/IceBergLayer';
import SeaSprayIcingFlatLayer from '../layers/seaSprayIcing/SeaSprayIcingFlatLayer';
import SeaSprayIcingContourLayer from '../layers/seaSprayIcing/SeaSprayIcingContourLayer';
import WaveBlendLowresoArrowLayer from '../layers/waveblend/WaveBlendLowresoArrowLayer';
import WaveBlendLowresoContourLayer from '../layers/waveblend/WaveBlendLowresoContourLayer';
import WaveBlendLowresoFlatLayer from '../layers/waveblend/WaveBlendLowresoFlatLayer';
import WaveBlendNpacArrowLayer from '../layers/waveblend/WaveBlendNpacArrowLayer';
import WaveBlendNpacContourLayer from '../layers/waveblend/WaveBlendNpacContourLayer';
import WaveBlendNpacFlatLayer from '../layers/waveblend/WaveBlendNpacFlatLayer';
import WaveBlendNatlArrowLayer from '../layers/waveblend/WaveBlendNatlArrowLayer';
import WaveBlendNatlContourLayer from '../layers/waveblend/WaveBlendNatlContourLayer';
import WaveBlendNatlFlatLayer from '../layers/waveblend/WaveBlendNatlFlatLayer';
import WaveBlendSeasiaArrowLayer from '../layers/waveblend/WaveBlendSeasiaArrowLayer';
import WaveBlendSeasiaContourLayer from '../layers/waveblend/WaveBlendSeasiaContourLayer';
import WaveBlendSeasiaFlatLayer from '../layers/waveblend/WaveBlendSeasiaFlatLayer';
import GPVMsmGroundWindLayer from '../layers/msmground/GPVMsmGroundWindLayer';
import GPVMsmGroundContourLayer from '../layers/msmground/GPVMsmGroundContourLayer';
import GPVMsmGroundPrecipitationLayer from '../layers/msmground/GPVMsmGroundPrecipitationLayer';
import WniTropicalStormLayer from '../layers/tropicalstorm/WniTropicalStormLayer';
import JmaTropicalStormLayer from '../layers/tropicalstorm/JmaTropicalStormLayer';
import Jma5dayTropicalStormLayer from '../layers/tropicalstorm/Jma5dayTropicalStormLayer';
import JtwcTropicalStormLayer from '../layers/tropicalstorm/JtwcTropicalStormLayer';
import TSRelationLayer from '../layers/tropicalstorm/TSRelationLayer';
import AnalogousBaseLayer from '../layers/tropicalstorm/AnalogousBaseLayer';
import AnalogousTropicalStormLayer from '../layers/tropicalstorm/AnalogousTropicalStormLayer';
import Jp10tenLayer from '../layers/Jp10tenLayer';
import GpvhourlyAnalysisTmpLayer from '../layers/gpvhourlyAnalysis/GpvhourlyAnalysisTmpLayer';
import GpvhourlyAnalysisWindLayer from '../layers/gpvhourlyAnalysis/GpvhourlyAnalysisWindLayer';
import BasicFunctionTestLayer from '../layers/BasicFunctionTestLayer';
import CompassHourTmpContourLayer from '../layers/compasshour/CompassHourTmpContourLayer';
import CompassHourTmpGridValueLayer from '../layers/compasshour/CompassHourTmpGridValueLayer';
import CompassHourTmpFillLayer from '../layers/compasshour/CompassHourTmpFillLayer';
import CompassHourPresContourLayer from '../layers/compasshour/CompassHourPresContourLayer';
import CompassHourPresGridValueLayer from '../layers/compasshour/CompassHourPresGridValueLayer';
import CompassHourPresFillLayer from '../layers/compasshour/CompassHourPresFillLayer';
import CompassHourRhContourLayer from '../layers/compasshour/CompassHourRhContourLayer';
import CompassHourRhGridValueLayer from '../layers/compasshour/CompassHourRhGridValueLayer';
import CompassHourRhFillLayer from '../layers/compasshour/CompassHourRhFillLayer';
import CompassHourAsnowContourLayer from '../layers/compasshour/CompassHourAsnowContourLayer';
import CompassHourAsnowGridValueLayer from '../layers/compasshour/CompassHourAsnowGridValueLayer';
import CompassHourAsnowFillLayer from '../layers/compasshour/CompassHourAsnowFillLayer';
import CompassHourApcpContourLayer from '../layers/compasshour/CompassHourApcpContourLayer';
import CompassHourApcpGridValueLayer from '../layers/compasshour/CompassHourApcpGridValueLayer';
import CompassHourApcpFillLayer from '../layers/compasshour/CompassHourApcpFillLayer';
import CompassHourPopContourLayer from '../layers/compasshour/CompassHourPopContourLayer';
import CompassHourPopGridValueLayer from '../layers/compasshour/CompassHourPopGridValueLayer';
import CompassHourPopFillLayer from '../layers/compasshour/CompassHourPopFillLayer';
import CompassHourUgrdvgrdBarbsLayer from '../layers/compasshour/CompassHourUgrdvgrdBarbsLayer';
import CompassHourUgrdGridValueLayer from '../layers/compasshour/CompassHourUgrdGridValueLayer';
import CompassHourVgrdGridValueLayer from '../layers/compasshour/CompassHourVgrdGridValueLayer';

/* eslint-disable camelcase */
export const CarGPS = { layerClass: CarGpsLayer, layerName: 'CarGPS' };
export const LiveCamera = { layerClass: LiveCameraLayer, layerName: 'LiveCamera' };
export const LightningJapan = { layerClass: LightningLayer, layerName: 'LightningJapan' };
export const LightningKorea = { layerClass: LightningLayer, layerName: 'LightningKorea' };
export const LIDEN = { layerClass: LidenLayer, layerName: 'LIDEN' };
export const METAR = { layerClass: METARLayer, layerName: 'METAR' };
export const TAF = { layerClass: TAFLayer, layerName: 'TAF' };
export const Airport = { layerClass: AirportLayer, layerName: 'Airport' };
export const VAA = { layerClass: VAALayer, layerName: 'VAA' };
export const FIX_COMPULSORY = { layerClass: FixLayer, layerName: 'FIX_COMPULSORY' };
export const FIXN = { layerClass: FixLayer, layerName: 'FIXN' };
export const FIX_RNAV = { layerClass: FixLayer, layerName: 'FIX_RNAV' };
export const WX_JMA_Amedas = { layerClass: AmedasLayer, layerName: 'WX_JMA_Amedas' };
export const FIR = { layerClass: FirLayer, layerName: 'FIR' };
export const DisasterReport = { layerClass: DisasterReportLayer, layerName: 'DisasterReport' };
export const LatLon = { layerClass: LatLonLayer, layerName: 'LatLon' };
export const Navaids = { layerClass: NavaidsLayer, layerName: 'Navaids' };
export const WorldBorder = { layerClass: WorldBorderLayer, layerName: 'WorldBorder' };
export const WorldCoastLine = { layerClass: WorldCoastlineLayer, layerName: 'WorldCoastLine' };
export const JapanBorder = { layerClass: JapanBorderLayer, layerName: 'JapanBorder' };
export const BlueMarble = { layerClass: BlueMarbleLayer, layerName: 'BlueMarble' };
export const SIGMET = { layerClass: SigmetLayer, layerName: 'SIGMET' };
export const RadarAmedas_ANLSIS = { layerClass: RadarAmedasANLSISLayer, layerName: 'RadarAmedas_ANLSIS' };
export const RadarAmedas_NOWCAST = { layerClass: RadarAmedasNOWCASTLayer, layerName: 'RadarAmedas_NOWCAST' };
export const ASCLayer = { layerClass: AscLayer, layerName: 'ASCLayer' };
export const GASS = { layerClass: GASSLayer, layerName: 'GASS' };
export const Current = { layerClass: CurrentLayer, layerName: 'Current' };
export const VolcanicRank = { layerClass: AcosRankLayer, layerName: 'VolcanicRank' };
export const VolcanicAsh_GPV = { layerClass: AcosGpvLayer, layerName: 'VolcanicAsh_GPV' };
export const WX_WNI_JP_10Ten_Report = { layerClass: Jp10tenLayer, layerName: 'WX_WNI_JP_10Ten_Report' };

export const JP_GPV_HourlyAnalysis_Wind = { layerClass: GpvhourlyAnalysisWindLayer, layerName: 'JP_GPV_HourlyAnalysis_Wind' };
export const JP_GPV_HourlyAnalysis_Tmp = { layerClass: GpvhourlyAnalysisTmpLayer, layerName: 'JP_GPV_HourlyAnalysis_Tmp' };

export const BasicFunctionTest = { layerClass: BasicFunctionTestLayer, layerName: 'BasicFunctionTest' };

// jmawarn start
export const WX_JMA_Warn_Border = { layerClass: JmawarnBorderLayer, layerName: 'WX_JMA_Warn_Border' };
export const WX_JMA_Warn = { layerClass: JmawarnLayer, layerName: 'WX_JMA_Warn' };
export const WX_JMA_SeaWarn = { layerClass: JmaseawarnLayer, layerName: 'WX_JMA_SeaWarn' };
export const WX_JMA_SeaForecast = { layerClass: JmaseaforecastLayer, layerName: 'WX_JMA_SeaForecast' };
// jmawarn end

// hirofront start
export const SurfaceAnalysisFront = { layerClass: SurfaceAnalysisFrontLayer, layerName: 'SurfaceAnalysisFront' };
export const SurfacePressureContour = { layerClass: SurfacePressureContourLayer, layerName: 'SurfacePressureContour' };
export const SurfacePressureHiro = { layerClass: SurfacePressureHiroLayer, layerName: 'SurfacePressureHiro' };
// hirofront end

export const WindBarbs = { layerClass: WindBarbsLayer, layerName: 'WindBarbs' };
export const SeaVisibility = { layerClass: SeaVisibilityLayer, layerName: 'SeaVisibility' };
export const Dash = { layerClass: DashLayer, layerName: 'Dash' };
export const IceConcentration = { layerClass: IceConcentrationLayer, layerName: 'IceConcentration' };
export const IceBerg = { layerClass: IceBergLayer, layerName: 'IceBerg' };
export const SeaSprayIcing_Flat = { layerClass: SeaSprayIcingFlatLayer, layerName: 'SeaSprayIcing_Flat' };
export const SeaSprayIcing_Contour = { layerClass: SeaSprayIcingContourLayer, layerName: 'SeaSprayIcing_Contour' };

// wave blend start
export const WaveBlendLowreso_Arrow = { layerClass: WaveBlendLowresoArrowLayer, layerName: 'WaveBlendLowreso_Arrow' };
export const WaveBlendLowreso_Contour = { layerClass: WaveBlendLowresoContourLayer, layerName: 'WaveBlendLowreso_Contour' };
export const WaveBlendLowreso_Flat = { layerClass: WaveBlendLowresoFlatLayer, layerName: 'WaveBlendLowreso_Flat' };
export const WaveBlendNpac_Arrow = { layerClass: WaveBlendNpacArrowLayer, layerName: 'WaveBlendNpac_Arrow' };
export const WaveBlendNpac_Contour = { layerClass: WaveBlendNpacContourLayer, layerName: 'WaveBlendNpac_Contour' };
export const WaveBlendNpac_Flat = { layerClass: WaveBlendNpacFlatLayer, layerName: 'WaveBlendNpac_Flat' };
export const WaveBlendNatl_Arrow = { layerClass: WaveBlendNatlArrowLayer, layerName: 'WaveBlendNatl_Arrow' };
export const WaveBlendNatl_Contour = { layerClass: WaveBlendNatlContourLayer, layerName: 'WaveBlendNatl_Contour' };
export const WaveBlendNatl_Flat = { layerClass: WaveBlendNatlFlatLayer, layerName: 'WaveBlendNatl_Flat' };
export const WaveBlendSeasia_Arrow = { layerClass: WaveBlendSeasiaArrowLayer, layerName: 'WaveBlendSeasia_Arrow' };
export const WaveBlendSeasia_Contour = { layerClass: WaveBlendSeasiaContourLayer, layerName: 'WaveBlendSeasia_Contour' };
export const WaveBlendSeasia_Flat = { layerClass: WaveBlendSeasiaFlatLayer, layerName: 'WaveBlendSeasia_Flat' };
// wave blend end

// sigwx start
export const SIGWX_UK_High = { layerClass: SigwxLayer, layerName: 'SIGWX_UK_High' };
export const SIGWX_UK_Medium = { layerClass: SigwxLayer, layerName: 'SIGWX_UK_Medium' };
export const SIGWX_US_High = { layerClass: SigwxLayer, layerName: 'SIGWX_US_High' };
export const SIGWX_US_Medium = { layerClass: SigwxLayer, layerName: 'SIGWX_US_Medium' };
export const SIGWX_UK_High_past = { layerClass: SigwxUkHighPastLayer, layerName: 'SIGWX_UK_High_past' };
export const SIGWX_UK_Middle_past = { layerClass: SigwxUkMiddlePastLayer, layerName: 'SIGWX_UK_Middle_past' };
export const SIGWX_US_High_past = { layerClass: SigwxUsHighPastLayer, layerName: 'SIGWX_US_High_past' };
export const SIGWX_US_Middle_past = { layerClass: SigwxUsMiddlePastLayer, layerName: 'SIGWX_US_Middle_past' };
// sigwx end

// Radar start
export const WX_JP_Radar = { layerClass: JPRadarLayer, layerName: 'WX_JP_Radar' };
export const WX_US_AK_Radar = { layerClass: UsakRadarLayer, layerName: 'WX_US_AK_Radar' };
export const WX_US_GU_Radar = { layerClass: UsguRadarLayer, layerName: 'WX_US_GU_Radar' };
export const WX_US_HI_Radar = { layerClass: UshiRadarLayer, layerName: 'WX_US_HI_Radar' };
export const WX_US_NA_Radar = { layerClass: UsnaRadarLayer, layerName: 'WX_US_NA_Radar' };
export const WX_US_PR_Radar = { layerClass: UsprRadarLayer, layerName: 'WX_US_PR_Radar' };
export const WX_EU_Radar = { layerClass: EURadarLayer, layerName: 'WX_EU_Radar' };
export const WX_AU_Radar = { layerClass: AURadarLayer, layerName: 'WX_AU_Radar' };
export const WX_KR_Radar = { layerClass: KRRadarLayer, layerName: 'WX_KR_Radar' };
export const WX_TW_Radar = { layerClass: TWRadarLayer, layerName: 'WX_TW_Radar' };
export const JMA_OBS_RADAR_ECHINT_JP_5min = { layerClass: JpIcdbRadarLayer, layerName: 'JMA_OBS_RADAR_ECHINT_JP_5min' };
export const JMA_OBS_RADAR_ECHTOP_JP = { layerClass: JpEchotopRadarLayer, layerName: 'JMA_OBS_RADAR_ECHTOP_JP' };
export const JMA_NOWCAS_PRCRIN = { layerClass: NowcastRadarLayer, layerName: 'JMA_NOWCAS_PRCRIN' };
export const JMA_ANLSIS_PRCRIN = { layerClass: AnlsisRadarLayer, layerName: 'JMA_ANLSIS_PRCRIN' };
export const JMA_ANLSIS_PRCRIN_EXTRA = { layerClass: AnlsisExtraRadarLayer, layerName: 'JMA_ANLSIS_PRCRIN_EXTRA' };
export const EC_OBS_RADAR_ECHINT_CA = { layerClass: CARadarLayer, layerName: 'EC_OBS_RADAR_ECHINT_CA' };

// Radar end

// satellite start
export const SAT_WORLD_WV = { layerClass: SatelliteLayer, layerName: 'SAT_WORLD_WV' };
export const SAT_WORLD_IR = { layerClass: SatelliteLayer, layerName: 'SAT_WORLD_IR' };
export const SAT_WORLD_CLDTOP = { layerClass: SatelliteLayer, layerName: 'SAT_WORLD_CLDTOP' };
export const HIMA8_JP_WV = { layerClass: SatelliteLayer, layerName: 'HIMA8_JP_WV' };
export const HIMA8_JP_VIS = { layerClass: SatelliteLayer, layerName: 'HIMA8_JP_VIS' };
export const HIMA8_JP_IR = { layerClass: SatelliteLayer, layerName: 'HIMA8_JP_IR' };
export const HIMA8_JP_CLDTOP = { layerClass: SatelliteLayer, layerName: 'HIMA8_JP_CLDTOP' };
export const MSG_FD_VIS = { layerClass: SatelliteLayer, layerName: 'MSG_FD_VIS' };
export const MSG_FD_IR = { layerClass: SatelliteLayer, layerName: 'MSG_FD_IR' };
export const MSG_FD_WV = { layerClass: SatelliteLayer, layerName: 'MSG_FD_WV' };
export const MSG_FD_CLDTOP = { layerClass: SatelliteLayer, layerName: 'MSG_FD_CLDTOP' };
export const MSG_IODC_FD_VIS = { layerClass: SatelliteLayer, layerName: 'MSG_IODC_FD_VIS' };
export const MSG_IODC_FD_IR = { layerClass: SatelliteLayer, layerName: 'MSG_IODC_FD_IR' };
export const MSG_IODC_FD_WV = { layerClass: SatelliteLayer, layerName: 'MSG_IODC_FD_WV' };
export const MSG_IODC_FD_CLDTOP = { layerClass: SatelliteLayer, layerName: 'MSG_IODC_FD_CLDTOP' };
// satellite end

// tropicalstorm start
export const JMA_Typhoon = { layerClass: JmaTropicalStormLayer, layerName: 'JMA_Typhoon' };
export const JMA_Typhoon_5days = { layerClass: Jma5dayTropicalStormLayer, layerName: 'JMA_Typhoon_5days' };
export const JTWC_Typhoon = { layerClass: JtwcTropicalStormLayer, layerName: 'JTWC_Typhoon' };
export const WNI_TropicalStorm = { layerClass: WniTropicalStormLayer, layerName: 'WNI_TropicalStorm' };
export const TS_Relation_WNI = { layerClass: TSRelationLayer, layerName: 'TS_Relation_WNI' };
export const TS_Relation_JTWC = { layerClass: TSRelationLayer, layerName: 'TS_Relation_JTWC' };
export const AnalogousTropicalStorm = { layerClass: AnalogousBaseLayer, layerName: 'AnalogousTropicalStorm' };
export const AnalogousTropicalStorm_0 = { layerClass: AnalogousTropicalStormLayer, layerName: 'AnalogousTropicalStorm_0' };
export const AnalogousTropicalStorm_1 = { layerClass: AnalogousTropicalStormLayer, layerName: 'AnalogousTropicalStorm_1' };
export const AnalogousTropicalStorm_2 = { layerClass: AnalogousTropicalStormLayer, layerName: 'AnalogousTropicalStorm_2' };
// tropicalstorm end

// GPV GSM start
export const GPVTmpContourSample_GSM = { layerClass: GPVTmpContourLayer, layerName: 'GPVTmpContourSample_GSM' };
export const TmpGridValue_GSM = { layerClass: GPVTmpGridValueLayer, layerName: 'TmpGridValue_GSM' };
export const GPVTmpFillStyleSamples_GSM = { layerClass: GPVTmpFillLayer, layerName: 'GPVTmpFillStyleSamples_GSM' };
export const GPVHgtContourSample_GSM = { layerClass: GPVHgtContourLayer, layerName: 'GPVHgtContourSample_GSM' };
export const GPVHgtFillStyleSamples_GSM = { layerClass: GPVHgtFillLayer, layerName: 'GPVHgtFillStyleSamples_GSM' };
export const HgtGridValue_GSM = { layerClass: GPVHgtGridValueLayer, layerName: 'HgtGridValue_GSM' };
export const GPVRhContourSample_GSM = { layerClass: GPVRhContourLayer, layerName: 'GPVRhContourSample_GSM' };
export const RhGridValue_GSM = { layerClass: GPVRhGridValueLayer, layerName: 'RhGridValue_GSM' };
export const GPVRhFillStyleSamples_GSM = { layerClass: GPVRhFillLayer, layerName: 'GPVRhFillStyleSamples_GSM' };
export const GPVWindLayer_GSM = { layerClass: GPVWindLayer, layerName: 'GPVWindLayer_GSM' };
export const GPVIsotachLayer_GSM = { layerClass: GPVIsotachLayer, layerName: 'GPVIsotachLayer_GSM' };
export const GPVIcingprobLayer_GSM = { layerClass: GPVIcingprobLayer, layerName: 'GPVIcingprobLayer_GSM' };
export const GPVPrecipitationLayer_GSM = { layerClass: GPVPrecipitationLayer, layerName: 'GPVPrecipitationLayer_GSM' };
// GPV GSM end

// GPV UKMET start
export const GPVTmpContourSample_UKMET = { layerClass: GPVTmpContourLayer, layerName: 'GPVTmpContourSample_UKMET' };
export const TmpGridValue_UKMET = { layerClass: GPVTmpGridValueLayer, layerName: 'TmpGridValue_UKMET' };
export const GPVTmpFillStyleSamples_UKMET = { layerClass: GPVTmpFillLayer, layerName: 'GPVTmpFillStyleSamples_UKMET' };
export const GPVHgtContourSample_UKMET = { layerClass: GPVHgtContourLayer, layerName: 'GPVHgtContourSample_UKMET' };
export const GPVHgtFillStyleSamples_UKMET = { layerClass: GPVHgtFillLayer, layerName: 'GPVHgtFillStyleSamples_UKMET' };
export const HgtGridValue_UKMET = { layerClass: GPVHgtGridValueLayer, layerName: 'HgtGridValue_UKMET' };
export const GPVRhContourSample_UKMET = { layerClass: GPVRhContourLayer, layerName: 'GPVRhContourSample_UKMET' };
export const RhGridValue_UKMET = { layerClass: GPVRhGridValueLayer, layerName: 'RhGridValue_UKMET' };
export const GPVRhFillStyleSamples_UKMET = { layerClass: GPVRhFillLayer, layerName: 'GPVRhFillStyleSamples_UKMET' };
export const GPVWindLayer_UKMET = { layerClass: GPVWindLayer, layerName: 'GPVWindLayer_UKMET' };
export const GPVIsotachLayer_UKMET = { layerClass: GPVIsotachLayer, layerName: 'GPVIsotachLayer_UKMET' };
export const GPVIcingprobLayer_UKMET = { layerClass: GPVIcingprobLayer, layerName: 'GPVIcingprobLayer_UKMET' };
// GPV UKMET end

// GPV GFS start
export const GPVTmpContourSample_GFS = { layerClass: GPVTmpContourLayer, layerName: 'GPVTmpContourSample_GFS' };
export const TmpGridValue_GFS = { layerClass: GPVTmpGridValueLayer, layerName: 'TmpGridValue_GFS' };
export const GPVTmpFillStyleSamples_GFS = { layerClass: GPVTmpFillLayer, layerName: 'GPVTmpFillStyleSamples_GFS' };
export const GPVHgtContourSample_GFS = { layerClass: GPVHgtContourLayer, layerName: 'GPVHgtContourSample_GFS' };
export const GPVHgtFillStyleSamples_GFS = { layerClass: GPVHgtFillLayer, layerName: 'GPVHgtFillStyleSamples_GFS' };
export const HgtGridValue_GFS = { layerClass: GPVHgtGridValueLayer, layerName: 'HgtGridValue_GFS' };
export const GPVRhContourSample_GFS = { layerClass: GPVRhContourLayer, layerName: 'GPVRhContourSample_GFS' };
export const RhGridValue_GFS = { layerClass: GPVRhGridValueLayer, layerName: 'RhGridValue_GFS' };
export const GPVRhFillStyleSamples_GFS = { layerClass: GPVRhFillLayer, layerName: 'GPVRhFillStyleSamples_GFS' };
export const GPVWindLayer_GFS = { layerClass: GPVWindLayer, layerName: 'GPVWindLayer_GFS' };
export const GPVIsotachLayer_GFS = { layerClass: GPVIsotachLayer, layerName: 'GPVIsotachLayer_GFS' };
export const GPVIcingprobLayer_GFS = { layerClass: GPVIcingprobLayer, layerName: 'GPVIcingprobLayer_GFS' };
export const GPVPrecipitationLayer_GFS = { layerClass: GPVPrecipitationLayer, layerName: 'GPVPrecipitationLayer_GFS' };
export const GPVSnowDepthLayer_GFS = { layerClass: GPVSnowDepthLayer, layerName: 'GPVSnowDepthLayer_GFS' };
export const GPVPressureMslLayer_GFS = { layerClass: GPVPressureMslLayer, layerName: 'GPVPressureMslLayer_GFS' };
// GPV GFS end

// GPV MSM start
export const GPVTmpContourSample_MSM = { layerClass: GPVTmpContourLayer, layerName: 'GPVTmpContourSample_MSM' };
export const TmpGridValue_MSM = { layerClass: GPVTmpGridValueLayer, layerName: 'TmpGridValue_MSM' };
export const GPVTmpFillStyleSamples_MSM = { layerClass: GPVTmpFillLayer, layerName: 'GPVTmpFillStyleSamples_MSM' };
export const GPVHgtContourSample_MSM = { layerClass: GPVHgtContourLayer, layerName: 'GPVHgtContourSample_MSM' };
export const GPVHgtFillStyleSamples_MSM = { layerClass: GPVHgtFillLayer, layerName: 'GPVHgtFillStyleSamples_MSM' };
export const HgtGridValue_MSM = { layerClass: GPVHgtGridValueLayer, layerName: 'HgtGridValue_MSM' };
export const GPVRhContourSample_MSM = { layerClass: GPVRhContourLayer, layerName: 'GPVRhContourSample_MSM' };
export const RhGridValue_MSM = { layerClass: GPVRhGridValueLayer, layerName: 'RhGridValue_MSM' };
export const GPVRhFillStyleSamples_MSM = { layerClass: GPVRhFillLayer, layerName: 'GPVRhFillStyleSamples_MSM' };
export const GPVWindLayer_MSM = { layerClass: GPVWindLayer, layerName: 'GPVWindLayer_MSM' };
export const GPVIsotachLayer_MSM = { layerClass: GPVIsotachLayer, layerName: 'GPVIsotachLayer_MSM' };
export const GPVIcingprobLayer_MSM = { layerClass: GPVIcingprobLayer, layerName: 'GPVIcingprobLayer_MSM' };
// GPV MSM end
// GPV MSMGROUND start
export const GPVWindLayer_MSM_Ground = { layerClass: GPVMsmGroundWindLayer, layerName: 'GPVWindLayer_MSM_Ground' };
export const GPVContourLayer_MSM_Ground = { layerClass: GPVMsmGroundContourLayer, layerName: 'GPVContourLayer_MSM_Ground' };
export const GPVPrecipitationLayer_MSM_Ground = { layerClass: GPVMsmGroundPrecipitationLayer, layerName: 'GPVPrecipitationLayer_MSM_Ground' };
// GPV MSM end

// Surface Pressure (NOAA Ensemble)
export const SurfacePressure = { layerClass: SurfacePressureLayer, layerName: 'SurfacePressure' };

// COMPASS HOUR
export const CompassHourTmpFill = { layerClass: CompassHourTmpFillLayer, layerName: 'CompassHourTmpFill' };
export const CompassHourTmpContour = { layerClass: CompassHourTmpContourLayer, layerName: 'CompassHourTmpContour' };
export const CompassHourTmpGridValue = { layerClass: CompassHourTmpGridValueLayer, layerName: 'CompassHourTmpGridValue' };
export const CompassHourPresFill = { layerClass: CompassHourPresFillLayer, layerName: 'CompassHourPresFill' };
export const CompassHourPresContour = { layerClass: CompassHourPresContourLayer, layerName: 'CompassHourPresContour' };
export const CompassHourPresGridValue = { layerClass: CompassHourPresGridValueLayer, layerName: 'CompassHourPresGridValue' };
export const CompassHourRhFill = { layerClass: CompassHourRhFillLayer, layerName: 'CompassHourRhFill' };
export const CompassHourRhContour = { layerClass: CompassHourRhContourLayer, layerName: 'CompassHourRhContour' };
export const CompassHourRhGridValue = { layerClass: CompassHourRhGridValueLayer, layerName: 'CompassHourRhGridValue' };
export const CompassHourAsnowFill = { layerClass: CompassHourAsnowFillLayer, layerName: 'CompassHourAsnowFill' };
export const CompassHourAsnowContour = { layerClass: CompassHourAsnowContourLayer, layerName: 'CompassHourAsnowContour' };
export const CompassHourAsnowGridValue = { layerClass: CompassHourAsnowGridValueLayer, layerName: 'CompassHourAsnowGridValue' };
export const CompassHourApcpFill = { layerClass: CompassHourApcpFillLayer, layerName: 'CompassHourApcpFill' };
export const CompassHourApcpContour = { layerClass: CompassHourApcpContourLayer, layerName: 'CompassHourApcpContour' };
export const CompassHourApcpGridValue = { layerClass: CompassHourApcpGridValueLayer, layerName: 'CompassHourApcpGridValue' };
export const CompassHourPopFill = { layerClass: CompassHourPopFillLayer, layerName: 'CompassHourPopFill' };
export const CompassHourPopContour = { layerClass: CompassHourPopContourLayer, layerName: 'CompassHourPopContour' };
export const CompassHourPopGridValue = { layerClass: CompassHourPopGridValueLayer, layerName: 'CompassHourPopGridValue' };
export const CompassHourUgrdvgrdBarbs = { layerClass: CompassHourUgrdvgrdBarbsLayer, layerName: 'CompassHourUgrdvgrdBarbs' };
export const CompassHourUgrdGridValue = { layerClass: CompassHourUgrdGridValueLayer, layerName: 'CompassHourUgrdGridValue' };
export const CompassHourVgrdGridValue = { layerClass: CompassHourVgrdGridValueLayer, layerName: 'CompassHourVgrdGridValue' };
