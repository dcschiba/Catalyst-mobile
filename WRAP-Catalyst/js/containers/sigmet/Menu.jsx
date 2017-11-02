/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as SigmetActions from '../../actions/sigmet';

import css from '../../../style/sigmet/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  sigmetChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      sigmetChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="SIGMET"
          checked={sigmetChecked}
          onClick={e => actions.sigmetClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    sigmetChecked: state.sigmet.sigmetChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SigmetActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
