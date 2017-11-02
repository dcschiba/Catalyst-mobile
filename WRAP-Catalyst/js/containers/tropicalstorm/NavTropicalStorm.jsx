import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import css from '../../../style/tropicalstorm/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  tsContent: PropTypes.string.isRequired,
  tropChecked: PropTypes.bool.isRequired,
  jmaChecked: PropTypes.bool.isRequired,
  wniChecked: PropTypes.bool.isRequired,
  jtwcChecked: PropTypes.bool.isRequired,
  WX_JMA_Typhoon: PropTypes.array.isRequired,
  jmatyphoonidx: PropTypes.string.isRequired,
  jmaTrackChecked: PropTypes.bool.isRequired,
  jmaLowChecked: PropTypes.bool.isRequired,
  jmaEstChecked: PropTypes.bool.isRequired,
  jmaFTrackChecked: PropTypes.bool.isRequired,
  jmaFCircleChecked: PropTypes.bool.isRequired,
  jmaWindChecked: PropTypes.bool.isRequired,
  jmaFWindChecked: PropTypes.bool.isRequired,
  wniTrackChecked: PropTypes.bool.isRequired,
  wniFTrackChecked: PropTypes.bool.isRequired,
  wniWindChecked: PropTypes.bool.isRequired,
  wniFWindChecked: PropTypes.bool.isRequired,
  jtwcTrackChecked: PropTypes.bool.isRequired,
  jtwcFTrackChecked: PropTypes.bool.isRequired,
  jtwcWindChecked: PropTypes.bool.isRequired,
  jtwcFWindChecked: PropTypes.bool.isRequired,
  WX_WNI_TropicalStorm: PropTypes.array.isRequired,
  wnityphoonidx: PropTypes.string.isRequired,
  WX_JTWC_Typhoon: PropTypes.array.isRequired,
  jtwctyphoonidx: PropTypes.string.isRequired,
};

class NavTropicalStorm extends Component {

  render() {
    const {
      actions,
      tsContent,
      tropChecked,
      jmaChecked,
      wniChecked,
      jtwcChecked,
      WX_JMA_Typhoon,
      jmatyphoonidx,
      jmaTrackChecked,
      jmaLowChecked,
      jmaEstChecked,
      jmaFTrackChecked,
      jmaFCircleChecked,
      jmaWindChecked,
      jmaFWindChecked,
      wniTrackChecked,
      wniFTrackChecked,
      wniWindChecked,
      wniFWindChecked,
      jtwcTrackChecked,
      jtwcFTrackChecked,
      jtwcWindChecked,
      jtwcFWindChecked,
      WX_WNI_TropicalStorm,
      wnityphoonidx,
      WX_JTWC_Typhoon,
      jtwctyphoonidx,
    } = this.props;
    const tsallChecked = (tsContent === 'tsAll');
    const allJma = (!tsallChecked || !jmaChecked || !tropChecked);
    const allWni = (!tsallChecked || !wniChecked || !tropChecked);
    const allJtwc = (!tsallChecked || !jtwcChecked || !tropChecked);
    return (
      <div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="JMA"
              disabled={!tsallChecked || !tropChecked}
              onClick={e => actions.jmaClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={allJma}
              value={jmatyphoonidx}
              onChange={e => actions.jmaChange(e.target.value)}
            >
              {WX_JMA_Typhoon.map(obj =>
                <option key={obj.typhid} value={obj.typhid}>{obj.name}</option>,
              )};
            </select>
          </div>
        </div>
        <div className={css.hordiv3}>
          <Checkbox
            disabled={allJma}
            label="track"
            onClick={e => actions.jmaTrackClick(e.target.checked)}
            checked={jmaTrackChecked}
          />
        </div>
        <div className={css.hordiv3}>
          <Checkbox
            disabled={allJma || !jmaTrackChecked}
            label="TD/LOW"
            onClick={e => actions.jmaLowClick(e.target.checked)}
            checked={jmaLowChecked}
          />
        </div>
        <div>
          <div className={css.hordiv3}>
            <Checkbox
              disabled={allJma || !jmaTrackChecked}
              label="estimate"
              onClick={e => actions.jmaEstimateClick(e.target.checked)}
              checked={jmaEstChecked}
            />
            <Checkbox
              disabled={allJma}
              label="forecast_Track"
              onClick={e => actions.jmaFTrackClick(e.target.checked)}
              checked={jmaFTrackChecked}
            />
            <Checkbox
              disabled={allJma}
              label="forecast_Circle"
              onClick={e => actions.jmaFCircleClick(e.target.checked)}
              checked={jmaFCircleChecked}
            />
            <Checkbox
              disabled={allJma}
              label="analysis_Wind"
              onClick={e => actions.jmaWindClick(e.target.checked)}
              checked={jmaWindChecked}
            />
            <Checkbox
              disabled={allJma}
              label="forecast_Wind"
              onClick={e => actions.jmaFWindClick(e.target.checked)}
              checked={jmaFWindChecked}
            />
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="WNI"
              disabled={!tsallChecked || !tropChecked}
              onClick={e => actions.wniClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={allWni}
              value={wnityphoonidx}
              onChange={e => actions.wniChange(e.target.value)}
            >
              {WX_WNI_TropicalStorm.map(obj =>
                <option key={obj.typhid} value={obj.typhid}>{obj.name}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv3}>
            <Checkbox
              disabled={allWni}
              label="track"
              onClick={e => actions.wniTrackClick(e.target.checked)}
              checked={wniTrackChecked}
            />
            <Checkbox
              disabled={allWni}
              label="forecast_Track"
              onClick={e => actions.wniFTrackClick(e.target.checked)}
              checked={wniFTrackChecked}
            />
            <Checkbox
              disabled={allWni}
              label="analysis_Wind"
              onClick={e => actions.wniWindClick(e.target.checked)}
              checked={wniWindChecked}
            />
            <Checkbox
              disabled={allWni}
              label="forecast_Wind"
              onClick={e => actions.wniFWindClick(e.target.checked)}
              checked={wniFWindChecked}
            />
          </div>
        </div>
        <div>
          <div className={css.hordiv2}>
            <Checkbox
              label="JTWC"
              disabled={!tsallChecked || !tropChecked}
              onClick={e => actions.jtwcClick(e.target.checked)}
            />
          </div>
          <div className={css.hordiv2}>
            <select
              disabled={allJtwc}
              value={jtwctyphoonidx}
              onChange={e => actions.jtwcChange(e.target.value)}
            >
              {WX_JTWC_Typhoon.map(obj =>
                <option key={obj.typhid} value={obj.typhid}>{obj.name}</option>,
              )};
            </select>
          </div>
        </div>
        <div>
          <div className={css.hordiv3}>
            <Checkbox
              disabled={allJtwc}
              label="track"
              onClick={e => actions.jtwcTrackClick(e.target.checked)}
              checked={jtwcTrackChecked}
            />
            <Checkbox
              disabled={allJtwc}
              label="forecast_Track"
              onClick={e => actions.jtwcFTrackClick(e.target.checked)}
              checked={jtwcFTrackChecked}
            />
            <Checkbox
              disabled={allJtwc}
              label="analysis_Wind"
              onClick={e => actions.jtwcWindClick(e.target.checked)}
              checked={jtwcWindChecked}
            />
            <Checkbox
              disabled={allJtwc}
              label="forecast_Wind"
              onClick={e => actions.jtwcFWindClick(e.target.checked)}
              checked={jtwcFWindChecked}
            />
          </div>
        </div>
      </div>
    );
  }
}

NavTropicalStorm.propTypes = propTypes;

export default NavTropicalStorm;
