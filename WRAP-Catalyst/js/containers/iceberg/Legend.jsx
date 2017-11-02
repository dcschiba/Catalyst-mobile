import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { bindActionCreators } from 'redux';
import * as LegendActions from '../../actions/legend';
import * as IceBergActions from '../../actions/iceberg';
import comcss from '../../../style/common/legend.css';
import css from '../../../style/iceberg/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.iceBergClick(false);
    actions.deleteLegend('iceberg');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(130, 160);
  }

  render() {
    const { actions } = this.props;

    return (
      <div className={css.basediv}>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF0000' }} />
          <span className={css.legendtext}>{<FormattedMessage id="common.level" />} 5</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF4000' }} />
          <span className={css.legendtext}>{<FormattedMessage id="common.level" />} 4</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FF8000' }} />
          <span className={css.legendtext}>{<FormattedMessage id="common.level" />} 3</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FFBF00' }} />
          <span className={css.legendtext}>{<FormattedMessage id="common.level" />} 2</span>
        </div>
        <div className={css.basediv}>
          <div className={css.legenditem} style={{ backgroundColor: '#FFFF00' }} />
          <span className={css.legendtext}>{<FormattedMessage id="common.level" />} 1</span>
        </div>
        <button className={comcss.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    iceBerg: state.iceBerg,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, IceBergActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
