import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArrowIcon from 'material-ui/svg-icons/navigation/arrow-back';
// import GoogleMap from 'WRAP/UI/GoogleMap';
import { hashHistory } from 'react-router';
import mapOption from '../constants/map/mapsetting-newest.json';
import MapConsole from '../components/catalyst/MapConsole';
import css from '../../style-mobile/main.css';
import GoogleMap from '../WRAP-UI/GoogleMap';

const propTypes = {
  checkedFunc: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
};

const mapId = 'map';
const gmapId = 'gmap';

class Main extends Component {
  /* eslint-disable */
  mapInitedCallback() {
    console.log('mapInitedCallback setgooglemap');
  }
  render() {
    if (!mapOption) {
      return (
        <div>Map Loading...</div>
      );
    }
    const { checkedFunc, themeColor } = this.props;
    return (
      <div className={css.wrapper}>
        <div id={mapId} style={{ height: 'calc(100% - 40px)', width: '100%', position: 'relative' }}>
          <GoogleMap
            mapSetting={mapOption.mapoption}
            mapId={gmapId}
            isHide={false}
            mapInitedCallback={this.mapInitedCallback}            
          />
        </div>
        <button className={css.back_button} onClick={() => hashHistory.push('app/top')}>
          <ArrowIcon />
          <div className={css.back_button_label}>Back</div>
        </button>
        <MapConsole tabList={checkedFunc} themeColor={themeColor} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const checkedFunc = state.functionList.list;
  return {
    checkedFunc,
  };
}

function mapDispatchToProps() {
  return {
    // actions: bindActionCreators(selectFuncActions, dispatch),
  };
}

Main.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);

