import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as LidenActions from '../../actions/liden';

import css from '../../../style/liden/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  lidenChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      lidenChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="Liden"
          checked={lidenChecked}
          onClick={e => actions.lidenClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lidenChecked: state.liden.lidenChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LidenActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
