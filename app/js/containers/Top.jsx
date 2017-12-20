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
import * as selectFuncActions from '../actions/functionList';

const propTypes = {
  themeColor: PropTypes.object.isRequired,
  functionList: PropTypes.array.isRequired,
  checkedFunc: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
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
  constructor(props) {
    super(props);
    this.state = {
      tabStatus: 0,
      targetList: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectFunction = this.selectFunction.bind(this);

    /* eslint-disable global-require,import/no-dynamic-require */
    try {
      const targetNames = [...require('../locales/targetList.json')];
      this.state.targetList.push({
        name: 'ALL',
        data: props.functionList,
      });
      targetNames.forEach((target) => {
        this.state.targetList.push({
          name: target,
          data: props.functionList.filter(func => func.target.indexOf(target) !== -1),
        });
      });
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        this.setState({ functionList: ['ALL'] });
      } else { throw error; }
    }
  }
  handleChange(value) {
    this.setState({
      tabStatus: value,
    });
  }
  selectFunction(value, item) {
    if (value.target.checked) {
      this.props.actions.addFunction(item);
    } else {
      this.props.actions.removeFunction(item.path);
    }
  }
  render() {
    const { themeColor, checkedFunc } = this.props;
    const { targetList } = this.state;
    const onFlags = checkedFunc.map(func => func.path);
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
                label={target.name}
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
                  data={target.data}
                  flags={onFlags}
                  itemClickAction={this.selectFunction}
                />
              </div>
            ))}
          </SwipeableViews>
        </div>
        <div className={css.button}>
          <FlatButton
            label="決定"
            style={{
              ...styles.button,
              ...themeColor.second,
              ...checkedFunc.length === 0 ? styles.disabled : {},
            }}
            onClick={() => hashHistory.push('app/main')}
            disabled={checkedFunc.length === 0}
          />
        </div>
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

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(selectFuncActions, dispatch),
  };
}

Top.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Top);
