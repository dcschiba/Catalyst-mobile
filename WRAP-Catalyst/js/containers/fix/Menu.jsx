import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as FixActions from '../../actions/fix';
import * as LegendActions from '../../actions/legend';
import css from '../../../style/fix/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  fixChecked: PropTypes.bool.isRequired,
  fixCompulsoryChecked: PropTypes.bool.isRequired,
  fixNChecked: PropTypes.bool.isRequired,
  fixRNAVChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.fixClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('fix');
    } else {
      actions.deleteLegend('fix');
    }
  }
  render() {
    const {
      actions,
      fixChecked,
      fixCompulsoryChecked,
      fixNChecked,
      fixRNAVChecked,
    } = this.props;

    return (
      <div className={css.hordiv}>
        <Checkbox
          label="FIX"
          checked={fixChecked}
          onClick={e => Menu.showClick(e, actions)}
        />
        <div className={css.hordiv2}>
          <Checkbox
            label="Compulsory Reporting Point"
            checked={fixCompulsoryChecked}
            disabled={!fixChecked}
            onClick={e => actions.fixCompulsoryClick(e.target.checked)}
          />
          <Checkbox
            label="Non-compulsory Reporting Point"
            checked={fixNChecked}
            disabled={!fixChecked}
            onClick={e => actions.fixNClick(e.target.checked)}
          />
          <Checkbox
            label="RNAV Waypoint"
            checked={fixRNAVChecked}
            disabled={!fixChecked}
            onClick={e => actions.fixRNAVClick(e.target.checked)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fixChecked: state.fix.fixChecked,
    fixCompulsoryChecked: state.fix.fixCompulsoryChecked,
    fixNChecked: state.fix.fixNChecked,
    fixRNAVChecked: state.fix.fixRNAVChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(FixActions, LegendActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
