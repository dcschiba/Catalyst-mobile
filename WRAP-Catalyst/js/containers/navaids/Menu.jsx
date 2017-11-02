/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as NavaidsActions from '../../actions/navaids';

import css from '../../../style/navaids/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  navaidsChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      navaidsChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="Navaids"
          checked={navaidsChecked}
          onClick={e => actions.navaidsClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navaidsChecked: state.navaids.navaidsChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(NavaidsActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
