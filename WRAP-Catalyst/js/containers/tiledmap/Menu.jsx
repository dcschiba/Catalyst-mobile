import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import * as TiledMapActions from '../../actions/tiledmap';

import css from '../../../style/tiledmap/menu.css';

const propTypes = {
  actions: PropTypes.object.isRequired,
  worldborderChecked: PropTypes.bool.isRequired,
  worldcoastlineChecked: PropTypes.bool.isRequired,
  japanborderChecked: PropTypes.bool.isRequired,
};

class Menu extends Component {
  render() {
    const {
      actions,
      worldborderChecked,
      worldcoastlineChecked,
      japanborderChecked,
    } = this.props;

    return (
      <div className={css.ctrlpanel}>
        <div className={css.navcontents}>
          <span>Tiled Map Data Sample</span>
          <Checkbox
            label="World Border"
            checked={worldborderChecked}
            onClick={e => actions.worldBorderClick(e.target.checked)}
          />
          <Checkbox
            label="World Coastline"
            checked={worldcoastlineChecked}
            onClick={e => actions.worldCoastlineClick(e.target.checked)}
          />
          <Checkbox
            label="Japan Border(拡大時)"
            checked={japanborderChecked}
            onClick={e => actions.japanBorderClick(e.target.checked)}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    worldborderChecked: state.tiledmap.worldborderChecked,
    worldcoastlineChecked: state.tiledmap.worldcoastlineChecked,
    japanborderChecked: state.tiledmap.japanborderChecked,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TiledMapActions, dispatch),
  };
}

Menu.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
