/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as JmawarnActions from '../../actions/jmawarn';
import * as LegendActions from '../../actions/legend';
import { styles } from '../../utils/menuStyle';
import css from '../../../style/jmawarn/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  jmawarnChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.jmawarnClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('jmawarn');
    } else {
      actions.deleteLegend('jmawarn');
    }
  }
  render() {
    const {
      actions,
      jmawarnChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <div style={styles.line}>
          <Checkbox
            id="jmawarn"
            label="JMA Warn"
            checked={jmawarnChecked}
            onClick={e => Menu.showClick(e, actions)}
            style={styles.checkbox}
            labelStyle={styles.label}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jmawarnChecked: state.jmawarn.jmawarnChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(JmawarnActions, LegendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
