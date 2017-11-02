import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WrapUtils from '../../common/utils/WrapUtils';
import * as LegendActions from '../../actions/legend';
import * as GpvhourlyAnalysisActions from '../../actions/gpvhourlyAnalysis';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/gpvhourlyAnalysis/legend.css';

const propTypes = {
  gpvhourlyAnalysis: PropTypes.object.isRequired,
  actions: PropTypes.object,

};
class Legend extends Component {
  static closeClick(actions) {
    actions.hourlyanalysisClick(false);
    actions.deleteLegend('gpvhourlyAnalysis');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(350, 300);
  }

  render() {
    const { gpvhourlyAnalysis, actions } = this.props;
    const { basetime, basetimeidx, tsobj } = gpvhourlyAnalysis;
    let selectedvalidtime = '';

    if (basetime) {
      selectedvalidtime = WrapUtils.dateFormat(tsobj[basetime[basetimeidx]][0].basetime,
        'MM月DD日 hh時mm分', 9 * 3600);
    }

    return (
      <div className={css.basediv}>
        <div className={css.clddiv}>
          <div>上空寒気</div>
          <div>{selectedvalidtime}</div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#BA89C9' }} />
            <span className={css.legendtext}>-42℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#445B8E' }} />
            <span className={css.legendtext}>-36℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#7887AA' }} />
            <span className={css.legendtext}>-30℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#59D2F4' }} />
            <span className={css.legendtext}>-24℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#058E17' }} />
            <span className={css.legendtext}>-18℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#EDF811' }} />
            <span className={css.legendtext}>-12℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#F4AA18' }} />
            <span className={css.legendtext}>-6℃以下</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#E53B3A' }} />
            <span className={css.legendtext}>0℃以下</span>
          </div>
        </div>
        <div className={css.clddiv}>
          <div>上空風向風速</div>
          <div>{selectedvalidtime}</div>
          <div className={css.basediv}>
            <div className={css.legenditemwind}><span style={{ color: '#058E17' }}> →</span></div>
            <span className={css.legendtext}>5m/s未満</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditemwind}><span style={{ color: '#674FED' }}> →</span></div>
            <span className={css.legendtext}>5m/s以上</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditemwind}><span style={{ color: '#EDF811' }}> →</span></div>
            <span className={css.legendtext}>10m/s以上</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditemwind}><span style={{ color: '#F4AA18' }}> →</span></div>
            <span className={css.legendtext}>15m/s以上</span>
          </div>
          <div className={css.basediv}>
            <div className={css.legenditemwind}><span style={{ color: '#E53B3A' }}> →</span></div>
            <span className={css.legendtext}>20m/s以上</span>
          </div>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    gpvhourlyAnalysis: state.gpvhourlyAnalysis,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, GpvhourlyAnalysisActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
