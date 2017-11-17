import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import FunctionList from '../components/catalyst/FunctionList';
import css from '../../style/top.css';
import * as selectFuncActions from '../actions/functionList';

const propTypes = {
  locale: PropTypes.string.isRequired,
  checkedFunc: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  themeColor: PropTypes.object.isRequired,
};

const styles = {
  tab: {
    height: '40px',
  },
  button: {
    width: '90%',
    height: '40px',
    margin: 'auto',
  },
  disabled: {
    backgroundColor: '#cccccc',
    color: '999999',
  },
};

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabStatus: 'ALL',
    };
    this.handleChange = this.handleChange.bind(this);
    this.selectFunction = this.selectFunction.bind(this);
  }
  handleChange(value) {
    this.setState({
      value,
    });
  }
  selectFunction(value, name) {
    if (value.target.checked) {
      this.props.actions.addFunction(name);
      // this.props.actions.removeFunction(name);
    } else {
      this.props.actions.removeFunction(name);
      // this.props.actions.addFunction(name);
    }
  }
  render() {
    const { themeColor, locale, checkedFunc } = this.props;
    /* eslint-disable global-require,import/no-dynamic-require */
    let functionList;
    let targetList;
    try {
      targetList = require(`../locales/${locale}/targetList.json`);
      functionList = require(`../locales/${locale}/functionList.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        functionList = require('../locales/en/functionList.json');
      } else {
        throw error;
      }
    }

    return (
      <div className={css.wrapper}>
        <div className={css.title} style={themeColor.main}>コンテンツ一覧</div>
        <div className={css.contents}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            inkBarStyle={{ backgroundColor: themeColor.accent }}
          >
            <Tab
              label="ALL"
              value="ALL"
              buttonStyle={{ ...themeColor.main, ...styles.tab }}
            >
              <div className={css.list}>
                <FunctionList
                  data={functionList}
                  flags={checkedFunc}
                  itemClickAction={this.selectFunction}
                />
              </div>
            </Tab>
            {
            targetList.map((target, index) => (
              <Tab
                key={index}
                label={target}
                value={target}
                buttonStyle={{ ...themeColor.main, ...styles.tab }}
              >
                <div className={css.list}>
                  <FunctionList
                    data={functionList.filter(item => item.target.indexOf(target) !== -1)}
                    flags={checkedFunc}
                    itemClickAction={this.selectFunction}
                  />
                </div>
              </Tab>
            ))
          }
          </Tabs>
        </div>
        <div className={css.button}>
          <FlatButton
            label="決定"
            style={{ ...styles.button, ...themeColor.second }}
            onClick={() => hashHistory.push('app/main')}
            disabled={checkedFunc.length === 0}
          />
          {/* TODO disabled style */}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  const locale = state.locale.locale;
  const checkedFunc = state.functionList.list;
  return {
    locale,
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
