import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as GASSActions from '../../actions/gass';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/gass/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.gassClick(false);
    actions.deleteLegend('gass');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 120);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF6400' }} />
          <span className={css.legendtext}>Scale 3</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FFFF64' }} />
          <span className={css.legendtext}>Scale 2</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#0064FF' }} />
          <span className={css.legendtext}>Scale 1</span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gass: state.gass,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, GASSActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
