import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as AirportActions from '../../actions/airport';

import css from '../../../style/airport/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  airport: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      airport,
    } = this.props;

    const {
      airportChecked,
      airportAllChecked,
      airportCumChecked,
    } = airport;

    return (
      <div className={css.ctrlpanel}>
        <Checkbox
          label="Airports"
          checked={airportChecked}
          onClick={e => actions.airportClick(e.target.checked)}
        />
        <div>
          <Checkbox
            className={css.ckpaddleft}
            disabled={!airportChecked}
            checked={airportAllChecked}
            label="ALL"
            onClick={e => actions.airportAllClick(e.target.checked)}
          />
          <Checkbox
            className={css.ckpaddleft}
            disabled={!airportChecked}
            checked={airportCumChecked}
            label="USA"
            onClick={e => actions.airportCumClick(e.target.checked)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    airport: state.airport.airport,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AirportActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
