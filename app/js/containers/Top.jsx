import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { FormattedMessage } from 'react-intl';
import SwipeableViews from 'react-swipeable-views';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import FunctionList from '../components/catalyst/FunctionList';
import css from '../../style/top.css';
import * as selectFuncActions from '../actions/selectedFuncList';
import * as onlineActions from '../actions/online';

const propTypes = {
  themeColor: PropTypes.object.isRequired,
  funcMasterArray: PropTypes.array.isRequired,
  selectedFuncList: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  isOnline: PropTypes.bool.isRequired,
  messages: PropTypes.object.isRequired,
};

const styles = {
  tab: {
    height: '56px',
  },
  button: {
    width: '90%',
    height: '50px',
    margin: 'auto',
  },
  disabled: {
    backgroundColor: '#cccccc',
    color: '#999999',
  },
};

class Top extends Component {
  /* eslint-disable global-require,import/no-dynamic-require */
  constructor(props) {
    super(props);
    this.state = {
      tabStatus: 0,
      targetList: ['ALL', ...require('../locales/targetList.json')],
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectFunction = this.selectFunction.bind(this);
    this.onOnline = this.onOnline.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }
  componentWillMount() {
    if (navigator.connection.type === 'none') {
      this.props.actions.turnOffline();
    } else {
      // TODO this.props.actions.turnOnline();
      this.props.actions.turnOnline();
    }

    document.addEventListener('online', this.onOnline, false);
    document.addEventListener('offline', this.onOffline, false);
  }
  componentWillUnmount() {
    document.removeEventListener('online', this.onOnline);
    document.removeEventListener('offline', this.onOffline);
  }
  onOnline() {
    this.props.actions.turnOnline();
  }

  onOffline() {
    // TODO this.props.actions.turnOffline();
    this.props.actions.turnOnline();
  }
  handleChange(value) {
    this.setState({
      tabStatus: value,
    });
  }
  selectFunction(value, path) {
    if (value.target.checked) {
      this.props.actions.addFunction(path);
    } else {
      this.props.actions.removeFunction(path);
    }
  }
  render() {
    const { themeColor, selectedFuncList, funcMasterArray, isOnline, messages } = this.props;
    const { targetList } = this.state;
    return (
      <div className={css.wrapper}>
        <div className={css.title_wrapper} style={themeColor.main}>
          <FormattedMessage id="functionList.title" />
        </div>
        <div className={css.contents}>
          <Tabs
            value={this.state.tabStatus}
            onChange={this.handleChange}
            inkBarStyle={{ backgroundColor: themeColor.accent }}
          >
            {targetList.map((target, index) => (
              <Tab
                key={index}
                label={target}
                value={index}
                buttonStyle={{ ...themeColor.main, ...styles.tab }}
              />
            ))}
          </Tabs>
          <SwipeableViews
            index={this.state.tabStatus}
            onChangeIndex={this.handleChange}
          >
            {targetList.map((target, index) => (
              <div className={css.list} key={index}>
                <FunctionList
                  data={target === 'ALL' ? funcMasterArray :
                    funcMasterArray.filter(func => func.target.indexOf(target) !== -1)}
                  selectedFuncList={selectedFuncList}
                  itemClickAction={this.selectFunction}
                  isOnline={isOnline}
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
        <div className={css.button}>
          <FlatButton
            label={messages.ok_button_label}
            style={{
              ...styles.button,
              ...themeColor.second,
              ...selectedFuncList.length === 0 ? styles.disabled : {},
            }}
            onClick={() => hashHistory.push('app/main')}
            disabled={selectedFuncList.length === 0}
          />
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const selectedFuncList = state.selectedFuncList.list;
  const isOnline = state.online.isOnline;
  return {
    selectedFuncList,
    isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, selectFuncActions, onlineActions), dispatch),
  };
}

Top.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Top);
