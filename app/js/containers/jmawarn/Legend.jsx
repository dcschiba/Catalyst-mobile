import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as JmawarnActions from '../../actions/jmawarn';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/jmawarn/legend.css';
import legendcss from '../../../style/common/legend.css';


const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.jmawarnClick(false);
    actions.deleteLegend('jmawarn');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 140);
  }
  render() {
    const { actions } = this.props;
    return (
      <div className={css.container}>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#800080' }} />
          <div className={css.hordiv}> {'特別警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#ff0000' }} />
          <div className={css.hordiv}> {'警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#ffff00' }} />
          <div className={css.hordiv}> {'注意報'} </div>
        </div>
        <button
          className={legendcss.closeButton}
          onClick={() => Legend.closeClick(actions)}
        >✖</button>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(JmawarnActions, LegendActions), dispatch),
  };
}

Legend.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps,
)(Legend);
