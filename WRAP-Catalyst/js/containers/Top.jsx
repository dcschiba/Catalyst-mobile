import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import WrapController from 'WRAP/UI/WrapController';
import FunctionList from '../components/catalyst/FunctionList';
import ContentList from '../components/catalyst/ContentList';
import ChangeLog from '../components/catalyst/ChangeLog';
import About from '../components/catalyst/About';
import * as Actions from '../actions/catalyst';
import css from '../../style/top.css';

const propTypes = {
  locale: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      functionListDataNotReactRedux: null,
    };
  }
  componentWillMount() {
    // 既にmapオブジェクトが存在する場合、画面をリフレッシュする(WRAP Geoのツールチップ問題暫定対応)
    if (WrapController.currentMap) {
      location.reload();
    }
    // fetch(`./sample/locales/ja/functionList.json?t=${new Date().getTime()}`)
    //   .then((response) => {
    //     if (response.ok) { // ステータスがokならば
    //       return response.json();
    //     }
    //     return 'error';
    //   })
    //   .then((json) => {
    //     this.setState({ functionListDataNotReactRedux: json });
    //   });
    this.setState({ functionListDataNotReactRedux: 'error' });
  }

  render() {
    const { functionListDataNotReactRedux } = this.state;
    if (!functionListDataNotReactRedux) {
      return <div />;
    }

    const { locale, actions } = this.props;
    /* eslint-disable global-require,import/no-dynamic-require */
    let messages;
    try {
      messages = require(`../locales/${locale}/messages.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        messages = require('../locales/en/messages.json');
      } else {
        throw error;
      }
    }

    let functionList;
    try {
      functionList = require(`../locales/${locale}/functionList.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        functionList = require('../locales/en/functionList.json');
      } else {
        throw error;
      }
    }

    let contentList;
    try {
      contentList = require(`../locales/${locale}/contentList.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        contentList = require('../locales/en/contentList.json');
      } else {
        throw error;
      }
    }

    let changeLog;
    try {
      changeLog = require(`../locales/${locale}/changeLog.json`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        changeLog = require('../locales/en/changeLog.json');
      } else {
        throw error;
      }
    }

    let FunctionListNotRR = <div />;
    if (functionListDataNotReactRedux !== 'error') {
      FunctionListNotRR = (<div>
        <FunctionList
          data={functionListDataNotReactRedux}
          changeShowContents={actions.changeShowContents}
        />
      </div>);
    }

    return (
      <IntlProvider locale={locale} messages={messages}>
        <div className={css.container}>
          <div className={css.functionList}>
            <FunctionList
              isreactredux
              data={functionList}
              changeShowContents={actions.changeShowContents}
            />
          </div>
          {FunctionListNotRR}
          <ContentList
            data={contentList}
            changeShowContents={actions.changeShowContents}
          />
          <ChangeLog data={changeLog} />
          <About />
        </div>
      </IntlProvider>
    );
  }

}

function mapStateToProps(state) {
  const locale = state.locale.locale;
  return {
    locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

Top.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Top);
