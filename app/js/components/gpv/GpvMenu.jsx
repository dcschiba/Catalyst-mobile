import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { styles, childWrapper } from '../../utils/menuStyle';

const propTypes = {
  actions: PropTypes.object.isRequired,
  gpvDisabled: PropTypes.object.isRequired,
  basetime: PropTypes.array.isRequired,
  tsarr: PropTypes.array.isRequired,
  gpvchecked: PropTypes.bool.isRequired,
  tempchecked: PropTypes.bool.isRequired,
  windchecked: PropTypes.bool.isRequired,
  isotachchecked: PropTypes.bool.isRequired,
  tmpcontourchecked: PropTypes.bool.isRequired,
  tmpflatchecked: PropTypes.bool.isRequired,
  tmpgradationchecked: PropTypes.bool.isRequired,
  tmpgridvaluechecked: PropTypes.bool.isRequired,
  gpvtmpgroupDisabled: PropTypes.object.isRequired,
  level: PropTypes.number.isRequired,
  validtimeidx: PropTypes.number.isRequired,
  basetimeidx: PropTypes.number.isRequired,
  modelName: PropTypes.string.isRequired,
  hgtchecked: PropTypes.bool.isRequired,
  hgtcontourchecked: PropTypes.bool.isRequired,
  hgtflatchecked: PropTypes.bool.isRequired,
  hgtgradationchecked: PropTypes.bool.isRequired,
  hgtgridvaluechecked: PropTypes.bool.isRequired,
  gpvhgtgroupDisabled: PropTypes.object.isRequired,
  rhchecked: PropTypes.bool.isRequired,
  rhcontourchecked: PropTypes.bool.isRequired,
  rhflatchecked: PropTypes.bool.isRequired,
  rhgradationchecked: PropTypes.bool.isRequired,
  rhgridvaluechecked: PropTypes.bool.isRequired,
  gpvrhgroupDisabled: PropTypes.object.isRequired,
  icingprobchecked: PropTypes.bool.isRequired,
};

class GpvMenu extends Component {
  render() {
    const {
      actions,
      gpvDisabled,
      basetime,
      tsarr,
      gpvchecked,
      tempchecked,
      windchecked,
      isotachchecked,
      tmpcontourchecked,
      tmpflatchecked,
      tmpgradationchecked,
      tmpgridvaluechecked,
      gpvtmpgroupDisabled,
      level,
      validtimeidx,
      basetimeidx,
      modelName,
      hgtchecked,
      hgtcontourchecked,
      hgtflatchecked,
      hgtgradationchecked,
      hgtgridvaluechecked,
      gpvhgtgroupDisabled,
      rhchecked,
      rhcontourchecked,
      rhflatchecked,
      rhgradationchecked,
      rhgridvaluechecked,
      gpvrhgroupDisabled,
      icingprobchecked,
    } = this.props;

    const basetimeItems = [];
    basetime.map((time, i) =>
      basetimeItems.push(<MenuItem key={i} value={i} primaryText={time} />));
    const validtimeItems = [];
    tsarr.map((ts, i) =>
      validtimeItems.push(<MenuItem key={i} value={i} primaryText={ts.ts} />));
    return (
      <div>
        <CheckBox
          id="gfs"
          value={basetimeidx}
          checked={gpvchecked}
          onClick={e => actions.gpvClick(e.target.checked)}
          label={modelName}
          iconStyle={styles.checkbox.icon}
          labelStyle={styles.checkbox.label}
        />
        <SelectField
          value={basetimeidx}
          floatingLabelText="basetime"
          {...gpvDisabled}
          style={styles.select.wrapper}
        >
          {basetimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="validtime"
          value={validtimeidx}
          {...gpvDisabled}
          style={styles.select.wrapper}
          onChange={(event, index, value) => actions.gpvValidtimeChange(value)}
        >
          {validtimeItems}
        </SelectField>
        <SelectField
          floatingLabelText="level"
          value={level}
          style={styles.select.wrapper}
          {...gpvDisabled}
          onChange={(event, index, value) => actions.gpvLevelChange(value)}
        >
          <MenuItem value={100} primaryText="100" />
          <MenuItem value={150} primaryText="150" />
          <MenuItem value={200} primaryText="200" />
          <MenuItem value={250} primaryText="250" />
          <MenuItem value={300} primaryText="300" />
          <MenuItem value={400} primaryText="400" />
          <MenuItem value={500} primaryText="500" />
          <MenuItem value={600} primaryText="600" />
          <MenuItem value={700} primaryText="700" />
          <MenuItem value={850} primaryText="850" />
          <MenuItem value={925} primaryText="925" />
          <MenuItem value={1000} primaryText="1000" />
        </SelectField>
        <div>
          <CheckBox
            checked={windchecked}
            onClick={e => actions.gpvWindClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'Wind'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <CheckBox
            checked={isotachchecked}
            onClick={e => actions.gpvIsotachClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'Isotach'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <CheckBox
            checked={tempchecked}
            onClick={e => actions.gpvTempClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'Temp'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(4, tempchecked)}>
            <CheckBox
              checked={tmpcontourchecked}
              onClick={e => actions.gpvTmpContourClick(e.target.checked)}
              disabled={gpvtmpgroupDisabled.disabled}
              label={'Contour'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={tmpflatchecked}
              onClick={e => actions.gpvTmpFlatClick(e.target.checked)}
              disabled={gpvtmpgroupDisabled.disabled}
              label={'Flat'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={tmpgradationchecked}
              onClick={e => actions.gpvTmpGradationClick(e.target.checked)}
              disabled={gpvtmpgroupDisabled.disabled}
              label={'Gradation'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={tmpgridvaluechecked}
              onClick={e => actions.gpvTmpGridvalueClick(e.target.checked)}
              disabled={gpvtmpgroupDisabled.disabled}
              label={'Grid Value'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          <CheckBox
            checked={hgtchecked}
            onClick={e => actions.gpvHgtClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'HGT'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(4, hgtchecked)}>
            <CheckBox
              checked={hgtcontourchecked}
              onClick={e => actions.gpvHgtContourClick(e.target.checked)}
              disabled={gpvhgtgroupDisabled.disabled}
              label={'Contour'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={hgtflatchecked}
              onClick={e => actions.gpvHgtFlatClick(e.target.checked)}
              disabled={gpvhgtgroupDisabled.disabled}
              label={'Flat'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={hgtgradationchecked}
              onClick={e => actions.gpvHgtGradationClick(e.target.checked)}
              disabled={gpvhgtgroupDisabled.disabled}
              label={'Gradation'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={hgtgridvaluechecked}
              onClick={e => actions.gpvHgtGridvalueClick(e.target.checked)}
              disabled={gpvhgtgroupDisabled.disabled}
              label={'Grid Value'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          <CheckBox
            checked={rhchecked}
            onClick={e => actions.gpvRhClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'RH'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
          <div style={childWrapper(4, rhchecked)}>
            <CheckBox
              checked={rhcontourchecked}
              onClick={e => actions.gpvRhContourClick(e.target.checked)}
              disabled={gpvrhgroupDisabled.disabled}
              label={'Contour'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={rhflatchecked}
              onClick={e => actions.gpvRhFlatClick(e.target.checked)}
              disabled={gpvrhgroupDisabled.disabled}
              label={'Flat'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={rhgradationchecked}
              onClick={e => actions.gpvRhGradationClick(e.target.checked)}
              disabled={gpvrhgroupDisabled.disabled}
              label={'Gradation'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
            <CheckBox
              checked={rhgridvaluechecked}
              onClick={e => actions.gpvRhGridvalueClick(e.target.checked)}
              disabled={gpvrhgroupDisabled.disabled}
              label={'Grid Value'}
              iconStyle={styles.checkbox.icon}
              labelStyle={styles.checkbox.label}
            />
          </div>
          <CheckBox
            checked={icingprobchecked}
            onClick={e => actions.gpvIcingProbClick(e.target.checked)}
            disabled={gpvDisabled.disabled}
            label={'IcingProb'}
            iconStyle={styles.checkbox.icon}
            labelStyle={styles.checkbox.label}
          />
        </div>
      </div>
    );
  }
}

GpvMenu.propTypes = propTypes;
export default GpvMenu;
