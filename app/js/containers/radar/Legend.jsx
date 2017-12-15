import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as RadarActions from '../../actions/radar';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.jpRadarClick(false);
    actions.deleteLegend('radar');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 200);
    /* eslint no-console: ["error", { allow: ["log"] }] */
    // console.log('acos Legend --- componentWillMount');
  }
  render() {
    const fontsize = {
      paddingTop: '5pt',
      paddingLeft: '5pt',
      fontSize: '8pt',
    };
    return (
      <div style={fontsize}>
        <div>灰色</div>
        <div> 　電文受信なし(status:0)</div>
        <div> 　No Operation(status:3)</div>
        <div>青色</div>
        <div> 　エコーあり(status:1)</div>
        <div> 　No Echo(status:2)</div>
      </div>
    );
  }
}
function mapStateToProps() {
  return {
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, RadarActions), dispatch),
  };
}

Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
