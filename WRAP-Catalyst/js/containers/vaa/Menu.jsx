import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as VAAActions from '../../actions/vaa';

import css from '../../../style/vaa/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  vaaChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      vaaChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="VAA"
          checked={vaaChecked}
          onClick={e => actions.vaaClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    vaaChecked: state.vaa.vaaChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(VAAActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
