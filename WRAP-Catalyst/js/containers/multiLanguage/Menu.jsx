import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import * as localeActions from '../../actions/multiLanguage';

const propTypes = {
  actions: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

class Menu extends Component {
  render() {
    const { actions, locale } = this.props;
    return (
      <DropDownMenu
        value={locale}
        onChange={(event, index, value) => actions.changeSampleLocale(value)}
      >
        <MenuItem value={'en'} primaryText="English" />
        <MenuItem value={'ja'} primaryText="Japanese" />
        <MenuItem value={'it'} primaryText="Italian" />
      </DropDownMenu>
    );
  }
}

function mapStateToProps(state) {
  const locale = state.multiLanguage.sampleLocale;
  return {
    locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(localeActions, dispatch),
  };
}

Menu.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
