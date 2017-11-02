/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as JmaseawarnActions from '../../actions/jmaseawarn';
import * as LegendActions from '../../actions/legend';

import css from '../../../style/jmaseawarn/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  jmaseawarnChecked: PropTypes.bool.isRequired,
  showtype: PropTypes.string.isRequired,
};

class Menu extends Component {
  static showClick(e, showtype, actions) {
    actions.jmaseawarnClick(e.target.checked);
    if (e.target.checked && showtype === 'warning') {
      actions.addLegend('jmaseawarn');
    } else {
      actions.deleteLegend('jmaseawarn');
    }
  }
  render() {
    const {
      actions,
      showtype,
      jmaseawarnChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="JMA SeaWarn"
          checked={jmaseawarnChecked}
          onClick={e => Menu.showClick(e, showtype, actions)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jmaseawarnChecked: state.jmaseawarn.jmaseawarnChecked,
    showtype: state.jmaseawarn.showtype,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(JmaseawarnActions, LegendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
