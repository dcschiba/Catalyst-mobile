import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as LatLonActions from '../../actions/latlon';

import css from '../../../style/latlon/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  latlonChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      latlonChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="LatLon"
          checked={latlonChecked}
          onClick={e => actions.latlonClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    latlonChecked: state.latlon.latlonChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LatLonActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
