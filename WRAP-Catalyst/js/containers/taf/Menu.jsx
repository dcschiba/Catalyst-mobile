import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as TAFActions from '../../actions/taf';
import {
  TAF,
} from '../../constants/taf/LabelText';
import css from '../../../style/taf/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  tafChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentWillUnmount() {
    const { actions } = this.props;
    actions.tafClick(false);
  }
  render() {
    const {
      actions,
      tafChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label={TAF}
          checked={tafChecked}
          onClick={e => actions.tafClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tafChecked: state.taf.tafChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TAFActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
