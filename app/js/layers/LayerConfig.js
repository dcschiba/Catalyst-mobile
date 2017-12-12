import LocationLayer from '../layers/LocationLayer';
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
import GPVSnowdepthContourLayer from '../layers/gpv/GPVSnowdepthContourLayer';
import GPVSnowdepthGradationLayer from '../layers/gpv/GPVSnowdepthGradationLayer';
import GPVSnowdepthGridValueLayer from '../layers/gpv/GPVSnowdepthGridValueLayer';
import GPVPressuremslContourLayer from '../layers/gpv/GPVPressuremslContourLayer';
import GPVPressuremslGradationLayer from '../layers/gpv/GPVPressuremslGradationLayer';
import GPVPressuremslGridValueLayer from '../layers/gpv/GPVPressuremslGridValueLayer';
import Jp10tenLayer from '../layers/Jp10tenLayer';
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
import JpIcdbRadarLayer from '../layers/radar/JpIcdbRadarLayer';
import JpEchotopRadarLayer from '../layers/radar/JpEchotopRadarLayer';
import NowcastRadarLayer from '../layers/radar/NowcastRadarLayer';
import AnlsisRadarLayer from '../layers/radar/AnlsisRadarLayer';
import AnlsisExtraRadarLayer from '../layers/radar/AnlsisExtraRadarLayer';
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
import SurfaceAnalysisFrontLayer from '../layers/hilofront/SurfaceAnalysisFrontLayer';
import SurfacePressureContourLayer from '../layers/hilofront/SurfacePressureContourLayer';
import SurfacePressureHiroLayer from '../layers/hilofront/SurfacePressureHiroLayer';
import DisasterReportLayer from '../layers/DisasterReportLayer';
import LiveCameraLayer from '../layers/LiveCameraLayer';
import JmaseaforecastLayer from '../layers/jmawarn/JmaseaforecastLayer';
import JmaseawarnLayer from '../layers/jmawarn/JmaseawarnLayer';
import JmawarnBorderLayer from '../layers/jmawarn/JmawarnBorderLayer';
import JmawarnLayer from '../layers/jmawarn/JmawarnLayer';
import LightningLayer from '../layers/LightningLayer';
import LidenLayer from '../layers/LidenLayer';
import AmedasLayer from '../layers/AmedasLayer';
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
import CompassHourWindFlowLayer from '../layers/compasshour/CompassHourWindFlowLayer';
import CompassHourVisContourLayer from '../layers/compasshour/CompassHourVisContourLayer';
import CompassHourVisGridValueLayer from '../layers/compasshour/CompassHourVisGridValueLayer';
import CompassHourVisFillLayer from '../layers/compasshour/CompassHourVisFillLayer';
import CompassHourWiwwContourLayer from '../layers/compasshour/CompassHourWiwwContourLayer';
import CompassHourWiwwGridValueLayer from '../layers/compasshour/CompassHourWiwwGridValueLayer';
import CompassHourWiwwFillLayer from '../layers/compasshour/CompassHourWiwwFillLayer';


export const Location = { layerClass: LocationLayer, layerName: 'Location' };

/* eslint-disable camelcase */
export const WX_WNI_JP_10Ten_Report = { layerClass: Jp10tenLayer, layerName: 'WX_WNI_JP_10Ten_Report' };
export const DisasterReport = { layerClass: DisasterReportLayer, layerName: 'DisasterReport' };
export const LiveCamera = { layerClass: LiveCameraLayer, layerName: 'LiveCamera' };
export const LightningJapan = { layerClass: LightningLayer, layerName: 'LightningJapan' };
export const LightningKorea = { layerClass: LightningLayer, layerName: 'LightningKorea' };
export const LIDEN = { layerClass: LidenLayer, layerName: 'LIDEN' };
export const WX_JMA_Amedas = { layerClass: AmedasLayer, layerName: 'WX_JMA_Amedas' };

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
export const GPVSnowdepthContourLayer_GFS = { layerClass: GPVSnowdepthContourLayer, layerName: 'GPVSnowdepthContourLayer_GFS' };
export const GPVSnowdepthGridValueLayer_GFS = { layerClass: GPVSnowdepthGridValueLayer, layerName: 'GPVSnowdepthGridValueLayer_GFS' };
export const GPVSnowdepthGradationLayer_GFS = { layerClass: GPVSnowdepthGradationLayer, layerName: 'GPVSnowdepthGradationLayer_GFS' };
export const GPVPressuremslContourLayer_GFS = { layerClass: GPVPressuremslContourLayer, layerName: 'GPVPressuremslContourLayer_GFS' };
export const GPVPressuremslGridValueLayer_GFS = { layerClass: GPVPressuremslGridValueLayer, layerName: 'GPVPressuremslGridValueLayer_GFS' };
export const GPVPressuremslGradationLayer_GFS = { layerClass: GPVPressuremslGradationLayer, layerName: 'GPVPressuremslGradationLayer_GFS' };
// GPV GFS end

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

// hirofront start
export const SurfaceAnalysisFront = { layerClass: SurfaceAnalysisFrontLayer, layerName: 'SurfaceAnalysisFront' };
export const SurfacePressureContour = { layerClass: SurfacePressureContourLayer, layerName: 'SurfacePressureContour' };
export const SurfacePressureHiro = { layerClass: SurfacePressureHiroLayer, layerName: 'SurfacePressureHiro' };
// hirofront end

// jmawarn start
export const WX_JMA_Warn_Border = { layerClass: JmawarnBorderLayer, layerName: 'WX_JMA_Warn_Border' };
export const WX_JMA_Warn = { layerClass: JmawarnLayer, layerName: 'WX_JMA_Warn' };
export const WX_JMA_SeaWarn = { layerClass: JmaseawarnLayer, layerName: 'WX_JMA_SeaWarn' };
export const WX_JMA_SeaForecast = { layerClass: JmaseaforecastLayer, layerName: 'WX_JMA_SeaForecast' };
// jmawarn end

// COMPASS HOUR start
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
export const CompassHourWindFlow = { layerClass: CompassHourWindFlowLayer, layerName: 'CompassHourWindFlow' };
export const CompassHourVisFill = { layerClass: CompassHourVisFillLayer, layerName: 'CompassHourVisFill' };
export const CompassHourVisContour = { layerClass: CompassHourVisContourLayer, layerName: 'CompassHourVisContour' };
export const CompassHourVisGridValue = { layerClass: CompassHourVisGridValueLayer, layerName: 'CompassHourVisGridValue' };
export const CompassHourWiwwFill = { layerClass: CompassHourWiwwFillLayer, layerName: 'CompassHourWiwwFill' };
export const CompassHourWiwwContour = { layerClass: CompassHourWiwwContourLayer, layerName: 'CompassHourWiwwContour' };
export const CompassHourWiwwGridValue = { layerClass: CompassHourWiwwGridValueLayer, layerName: 'CompassHourWiwwGridValue' };
// COMPASS HOUR end
