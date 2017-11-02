import React from 'react';
import PropTypes from 'prop-types';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

const propTypes = {
  locale: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const MultilingualPullDown = props => (
  <DropDownMenu value={props.locale} onChange={(event, index, value) => props.onChange(value)}>
    <MenuItem value={'ja'} primaryText="Japanese" />
    <MenuItem value={'en'} primaryText="English" />
    <MenuItem value={'vi'} primaryText="Vietnamese" />
    <MenuItem value={'fr'} primaryText="French" />
  </DropDownMenu>
);

MultilingualPullDown.propTypes = propTypes;
export default MultilingualPullDown;
