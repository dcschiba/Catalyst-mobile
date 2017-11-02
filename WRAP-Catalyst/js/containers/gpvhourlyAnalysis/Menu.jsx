import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as GpvhourlyAnalysisActions from '../../actions/gpvhourlyAnalysis';
import * as LegendActions from '../../actions/legend';

import css from '../../../style/gpvhourlyAnalysis/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  gpvhourlyAnalysis: PropTypes.object.isRequired,
};

class Menu extends Component {
  static showClick(e, actions) {
    actions.hourlyanalysisClick(e.target.checked);
    if (e.target.checked) {
      actions.addLegend('gpvhourlyAnalysis');
    } else {
      actions.deleteLegend('gpvhourlyAnalysis');
    }
  }
  render() {
    const {
      actions, gpvhourlyAnalysis,
    } = this.props;

    const {
      hourlyAnalysisChecked,
      subDisabled,
      windChecked,
      tmpChecked,
      basetime,
      level,
      validtimeidx,
      basetimeidx,
      tsobj,
    } = gpvhourlyAnalysis;

    const basetimeItems = [];
    basetime.map((time, i) =>
      basetimeItems.push(<MenuItem key={i} value={i} primaryText={time} />));
    const validtimeItems = [];
    const sltbasetime = basetime[basetimeidx];
    const tsarr = tsobj[sltbasetime];
    if (tsarr) {
      tsarr.map((ts, i) =>
        validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    }
    return (
      <div>
        <CheckBox
          value={basetimeidx}
          checked={hourlyAnalysisChecked}
          onClick={e => Menu.showClick(e, actions)}
          label={'毎時大気解析'}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText="basetime"
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.hourlyanalysisBasetimeChange(value)}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={validtimeidx}
          {...subDisabled}
          style={css.selectTime}
          onChange={(event, index, value) => actions.hourlyanalysisValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="level"
          value={level}
          {...subDisabled}
          onChange={(event, index, value) => actions.hourlyanalysisLevelChange(value)}
        >
          <MenuItem value={'000'} primaryText="000" />
          <MenuItem value={'100'} primaryText="100" />
          <MenuItem value={'150'} primaryText="150" />
          <MenuItem value={'200'} primaryText="200" />
          <MenuItem value={'250'} primaryText="250" />
          <MenuItem value={'300'} primaryText="300" />
          <MenuItem value={'400'} primaryText="400" />
          <MenuItem value={'500'} primaryText="500" />
          <MenuItem value={'600'} primaryText="600" />
          <MenuItem value={'700'} primaryText="700" />
          <MenuItem value={'800'} primaryText="800" />
          <MenuItem value={'850'} primaryText="850" />
          <MenuItem value={'900'} primaryText="900" />
          <MenuItem value={'925'} primaryText="925" />
          <MenuItem value={'950'} primaryText="950" />
          <MenuItem value={'975'} primaryText="975" />
          <MenuItem value={'1000'} primaryText="1000" />
        </SelectField>
        <div className={css.subcheckbox}>
          <CheckBox
            value={basetimeidx}
            {...subDisabled}
            checked={tmpChecked}
            onClick={e => actions.hourlyanalysisTmpClick(e.target.checked)}
            label={'上空寒気'}
          />
        </div>
        <div className={css.subcheckbox}>
          <CheckBox
            value={basetimeidx}
            {...subDisabled}
            checked={windChecked}
            onClick={e => actions.hourlyanalysisWindClick(e.target.checked)}
            label={'上空風向風速'}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gpvhourlyAnalysis: state.gpvhourlyAnalysis,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, GpvhourlyAnalysisActions), dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
