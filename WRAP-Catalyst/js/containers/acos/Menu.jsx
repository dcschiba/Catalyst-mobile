import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as AcosActions from '../../actions/acos';
import * as LegendActions from '../../actions/legend';

import css from '../../../style/acos/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  acos: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.acosShowClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('acos');
    } else {
      actions.deleteLegend('acos');
    }
  }
  render() {
    const {
      actions,
      acos,
    } = this.props;

    const {
      showchecked,
    } = acos;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="ACOSforVA"
          checked={showchecked}
          onClick={e => Menu.showClick(e, actions)}
        />
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

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
