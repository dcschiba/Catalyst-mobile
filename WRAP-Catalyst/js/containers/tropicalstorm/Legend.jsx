import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toggle from 'material-ui/Toggle';
import * as LegendActions from '../../actions/legend';
import * as TropLegendActions from '../../actions/tropicalstorm';

const propTypes = {
  actions: PropTypes.object,
  tropicalstorm: PropTypes.object.isRequired,
};

class Legend extends Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(320, 40);
    actions.tropicalstormLegendToggle(false);
  }

  showHide(event, checked) {
    const { actions } = this.props;
    actions.tropicalstormLegendToggle(event.target.checked);
    if (checked) {
      actions.legendChangeSize(320, 450);
    } else {
      actions.legendChangeSize(320, 40);
    }
  }
  render() {
    const scrollbox = {
      paddingTop: '10pt',
      paddingLeft: '10pt',
      fontSize: '10pt',
      overflowY: 'auto',
      overflowX: 'visible',
      width: '310px',
      height: '400px',
      whiteSpace: 'pre-wrap',
    };
    const bottom = {
      position: 'absolute',
      left: '260px',
      bottom: '8px',
      width: '200px',
    };
    const { tropicalstorm } = this.props;
    const {
      jmaInfo,
      jmaInfoHistory,
      jma5daysInfo,
      jmatyphoonidx,
      tropChecked,
      tsContent,
      jmaChecked,
      // wniChecked,
      // jtwcChecked,
      legendToggle,
    } = tropicalstorm;

    const tsallChecked = (tsContent === 'tsAll');
    const tsHistoryChecked = (tsContent === 'tsHistory');
    const ts5daysChecked = (tsContent === 'ts5days');
    let infolist = '';
    let showinfo = {};
    if (tropChecked && tsallChecked && jmaChecked) {
      showinfo = jmaInfo;
    } else if (tropChecked && tsHistoryChecked) {
      showinfo = jmaInfoHistory;
    } else if (tropChecked && ts5daysChecked) {
      showinfo = jma5daysInfo;
    }
    if (showinfo) {
      const idlist = Object.keys(showinfo);
      for (let i = 0; i < idlist.length; i += 1) {
        if (jmatyphoonidx === 'ALL' || jmatyphoonidx === idlist[i]) {
          infolist += `${showinfo[idlist[i]]}\n`;
        }

        if (idlist.length === 0) {
          infolist += '気象庁台風情報は発表されていません\n';
        }
      }
    }
    return (
      <div>
        <div>
          <Toggle
            style={bottom}
            toggled={legendToggle}
            onToggle={(e, c) => this.showHide(e, c)}
          />
        </div>
        <div style={scrollbox}>
          {legendToggle ? infolist : ''}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tropicalstorm: state.tropicalstorm,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, TropLegendActions), dispatch),
  };
}

Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
