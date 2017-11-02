import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Slider from 'material-ui/Slider';
import WrapUtils from '../../common/utils/WrapUtils';
import css from '../../../style/acos/legend.css';
import * as AcosActions from '../../actions/acos';
import * as LegendActions from '../../actions/legend';


const propTypes = {
  actions: PropTypes.object,
  acos: PropTypes.object.isRequired,
};
class Legend extends Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(400, 340);
    /* eslint no-console: ["error", { allow: ["log"] }] */
    // console.log('acos Legend --- componentWillMount');
  }
  render() {
    const { actions, acos } = this.props;
    const {
      beforeDisabled,
      nextDisabled,
      ctrlDisabled,
      targetPoint,
      validtimelist,
      valididx,
      basetime,
      validall,
      fl,
    } = acos;
   // console.log('acos Legend --- render');
    const ftarr = ['03', '06', '09', '12', '15', '18', '21', '24'];
    let validtime = '';
    const otherft = ftarr[valididx];

    if (validtimelist && validtimelist.length > 0) {
      validtime = validtimelist[valididx];
    }

    const btallsty = validall ? css.time_button_select : css.time_button;

    let timeshow = '';

    if (validall) {
      if (basetime !== '') {
        timeshow = WrapUtils.dateFormat(basetime);
      }
    } else if (validtime !== '') {
      timeshow = `${fl === 'ALL' ? '' : fl} Valid: ${WrapUtils.dateFormat(validtime)}`;
    }

    return (
      <div className={css.basediv}>
        <div className={css.leftdiv}>
          <div>{`${targetPoint} ${timeshow}`}</div>
          <div>{`Ohter FT:${otherft}`}</div>
          <div className={css.btdiv}>
            <button
              className={css.time_button}
              {...beforeDisabled}
              onClick={() => actions.acosShowLatest()}
            >{'|<<'}
            </button>
            <button
              className={css.time_button}
              {...beforeDisabled}
              onClick={() => actions.acosShowBefore()}
            >{'<|'}
            </button>
            <button
              className={css.time_button}
              {...nextDisabled}
              onClick={() => actions.acosShowNext()}
            >{'|>'}
            </button>
            <button
              className={css.time_button}
              {...nextDisabled}
              onClick={() => actions.acosShowNewest()}
            >{'>>|'}
            </button>
            <button
              className={btallsty}
              {...ctrlDisabled}
              onClick={() => actions.acosShowAll()}
            >ALL
            </button>
          </div>
          <div className={css.legendbasediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#ff7f50' }} />
            <span className={css.legendtext}>FT 03H　　</span>
            <div className={css.legenditem} style={{ backgroundColor: '#f0e68c' }} />
            <span className={css.legendtext}>FT 12H</span>
          </div>
          <div className={css.legendbasediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#ff1493' }} />
            <span className={css.legendtext}>FT 06H　　</span>
            <div className={css.legenditem} style={{ backgroundColor: '#4169e1' }} />
            <span className={css.legendtext}>FT 18H</span>
          </div>
          <div className={css.legendbasediv}>
            <div className={css.legenditem} style={{ backgroundColor: '#008000' }} />
            <span className={css.legendtext}>FT 09H　　</span>
            <div className={css.legenditem} style={{ backgroundColor: '#4b0082' }} />
            <span className={css.legendtext}>FT 24H</span>
          </div>
          <div style={{ paddingTop: '13px' }}>
            <div className={css.legenditem} style={{ borderColor: '#ffa500', color: '#ffa500' }}>
              {'//////'}
            </div>
            Detached VA from previous eruption
          </div>
          <div>
            ACOS Monitored Volcanoes
          </div>
          <div>
            <img src="img/acos/green.png" alt="" />
            <img src="img/acos/yellow.png" alt="" />
            <img src="img/acos/orange.png" alt="" />
            <img src="img/acos/red.png" alt="" />
          </div>
          <div style={{ paddingTop: '13px' }}>
            The volcaic rank or ACOS does not mean volcanic activity
            but the impact for avitation.
          </div>
        </div>

        <div>
          <Slider
            className={css.silder}
            {...ctrlDisabled}
            axis="y"
            min={0}
            max={430}
            step={10}
            defaultValue={0}
            onChange={(e, value) => actions.acosFlChange(value)}
          />
          <span style={{ bottom: '20px' }} className={css.sliderlabel}>ALL</span>
          <span style={{ bottom: '78px' }} className={css.sliderlabel}>FL100</span>
          <span style={{ bottom: '124px' }} className={css.sliderlabel}>FL180</span>
          <span style={{ bottom: '177px' }} className={css.sliderlabel}>FL270</span>
          <span style={{ bottom: '211px' }} className={css.sliderlabel}>FL330</span>
          <span style={{ bottom: '235px' }} className={css.sliderlabel}>FL370</span>
          <span style={{ bottom: '270px' }} className={css.sliderlabel}>FL430</span>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    acos: state.acos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(AcosActions, LegendActions), dispatch),
  };
}

Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
