import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckBox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import NumericInput from 'react-numeric-input';
import * as BasicTestActions from '../../actions/basictest';

import css from '../../../style/basictest/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  basictest: PropTypes.object.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      basictest,
    } = this.props;

    const {
      checked,
      element,
      offset,
      normalizeLon,
    } = basictest;

    return (
      <div className={css.ctrlpanel}>
        <CheckBox
          id="basictest_ckb"
          checked={checked}
          onClick={e => actions.basictestCheck(e.target.checked)}
          label={'BasicFunction Test'}
        />
        <SelectField
          id="basictest_element_select"
          floatingLabelText="Element"
          value={element}
          disabled={!checked}
          style={css.selectLevel}
          onChange={(event, index, value) => actions.basictestElementChange(value)}
        >
          <MenuItem value={'line'} primaryText="Line" />
          <MenuItem value={'polygon'} primaryText="Polygon" />
          <MenuItem value={'text'} primaryText="Text" />
          <MenuItem value={'image'} primaryText="Image" />
          <MenuItem value={'point'} primaryText="Point" />
          <MenuItem value={'option'} primaryText="Line Option" />
        </SelectField>
        <br />
        <div className={css.hordiv}>
          <span>Longitude Offset:</span>
          <NumericInput
            id="basictest_offset_input"
            disabled={!checked}
            style={{ input: { width: '70px' } }}
            precision={1}
            step={1.0}
            value={offset}
            min={-360}
            max={360}
            onChange={valueAsNumber => actions.basictestLonOffset(valueAsNumber)}
          />
        </div>
        <br />
        <CheckBox
          id="basictest_normalize_ckb"
          disabled={!checked}
          checked={normalizeLon}
          onClick={e => actions.basictestLonNormalize(e.target.checked)}
          label={'Normalize'}
        />
        <span> Longitude (-180〜+180)</span>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    basictest: state.basictest,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BasicTestActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
