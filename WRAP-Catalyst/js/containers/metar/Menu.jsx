import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as MetarActions from '../../actions/metar';
import {
  METAR,
} from '../../constants/metar/LabelText';
import css from '../../../style/metar/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  metarChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  componentWillUnmount() {
    const { actions } = this.props;
    actions.metarClick(false);
  }
  render() {
    const {
      actions,
      metarChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label={METAR}
          checked={metarChecked}
          onClick={e => actions.metarClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    metarChecked: state.metar.metarChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MetarActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
