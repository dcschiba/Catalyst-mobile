import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as ASCActions from '../../actions/asc';

import css from '../../../style/asc/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  asc: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      asc,
    } = this.props;

    const {
      ascDisabled,
      issuetime,
      tsarr,
      turbulenceChecked,
      convectionChecked,
      icingChecked,
    } = asc;

    return (
      <div className={css.navcontents}>
        <Checkbox
          label="ASC Scale"
          onClick={e => actions.ascClick(e.target.checked)}
        />
        <span>issuetime : </span>
        <select className={css.navselects} {...ascDisabled}>
          {issuetime.map((time, i) =>
            <option key={i} value="+0+">{time}</option>,
          )};
        </select>
        <br />
        <span>validtime : </span>
        <select
          className={css.navselects}
          {...ascDisabled}
          onChange={e => actions.ascValidtimeChange(e.target.value)}
        >
          {tsarr.map((ts, i) =>
            <option key={i} value={i}>{ts.ts}</option>,
          )};
        </select>
        <div className={css.hordiv}>
          <span>level : </span>
          <select
            defaultValue="850"
            className={css.navselects}
            {...ascDisabled}
            onChange={e => actions.ascLevelStartChange(e.target.value)}
          >
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="700">700</option>
            <option value="850">850</option>
          </select>
          <span>〜</span>
          <select
            defaultValue="850"
            className={css.navselects}
            {...ascDisabled}
            onChange={e => actions.ascLevelEndChange(e.target.value)}
          >
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
            <option value="250">250</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="700">700</option>
            <option value="850">850</option>
          </select>
        </div>
        <Checkbox
          {...ascDisabled}
          label="Turbulence"
          checked={turbulenceChecked}
          className={css.ckpaddleft}
          onClick={e => actions.ascTurbulenceClick(e.target.checked)}
        />
        <Checkbox
          {...ascDisabled}
          label="Convection"
          checked={convectionChecked}
          className={css.ckpaddleft}
          onClick={e => actions.ascConvectionClick(e.target.checked)}
        />
        <Checkbox
          {...ascDisabled}
          label="Icing"
          checked={icingChecked}
          className={css.ckpaddleft}
          onClick={e => actions.ascIcingClick(e.target.checked)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    asc: state.asc.asc,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ASCActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
