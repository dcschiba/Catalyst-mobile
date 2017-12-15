import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as JmaseawarnActions from '../../actions/jmaseawarn';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/jmaseawarn/legend.css';

const propTypes = {
  actions: PropTypes.object,
};

class Legend extends Component {
  static closeClick(actions) {
    actions.jmaseawarnClick(false);
    actions.deleteLegend('jmaseawarn');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 240);
  }
  render() {
    return (
      <div className={css.container}>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#9932cc' }} />
          <div className={css.hordiv}> {'台風警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#ff0000' }} />
          <div className={css.hordiv}> {'暴風警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#faf500' }} />
          <div className={css.hordiv}> {'強風警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2} style={{ backgroundColor: '#adff2f' }} />
          <div className={css.hordiv}> {'風警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2}>
            <img src="img/seawarn/uneri.png" width="20" height="20" alt="uneri" />
          </div>
          <div className={css.hordiv}> {'うねり警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2}>
            <img src="img/seawarn/ice.png" width="20" height="20" alt="ice" />
          </div>
          <div className={css.hordiv}> {'着氷警報'} </div>
        </div>
        <div className={css.legendpadding}>
          <div className={css.hordiv2}>
            <img src="img/seawarn/mist.png" width="20" height="20" alt="mist" />
          </div>
          <div className={css.hordiv}> {'濃霧警報'} </div>
        </div>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(JmaseawarnActions, LegendActions), dispatch),
  };
}

Legend.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps,
)(Legend);
