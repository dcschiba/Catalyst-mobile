/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as JmawarnActions from '../../actions/jmawarn';
import * as LegendActions from '../../actions/legend';
import * as InitActions from '../../actions/layerInit';
import { styles } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  jmawarnChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentDidMount() {
    const { actions, layerInitflags, isLoading } = this.props;
    if (!layerInitflags.jmawarn && isLoading) {
      actions.layerInit({ jmawarn: true });
    }
    const waitForMapInitialize = setInterval(() => {
      if (!this.props.isLoading) {
        actions.jmawarnClick(true);
        clearInterval(waitForMapInitialize);
      }
    }, 1000);
  }
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
      <div>
          <Checkbox
            id="jmawarn"
            label="JMA Warn"
            checked={jmawarnChecked}
            onClick={e => Menu.showClick(e, actions)}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jmawarnChecked: state.jmawarn.jmawarnChecked,
    layerInitflags: state.layerInit,
    isLoading: state.loading.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(JmawarnActions, LegendActions, InitActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
