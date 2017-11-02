import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import { IntlProvider } from 'react-intl';
import SideMenuDrawer from 'WRAP/UI/SideMenuDrawer';
import MainContent from 'WRAP/UI/MainContent';
import SubContent from '../components/common/SubContent';
import Markdown from '../components/catalyst/Markdown';
import css from '../../style/introduction.css';
import SubLegend from '../components/common/SubLegend';
import WrapMessages from '../common/messages/WrapMessages';
import Main from './Main';
import MainAutoTest from './MainAutoTest';
import MainProjection from './MainProjection';
import * as Actions from '../actions/catalyst';
import * as LegendActions from '../actions/legend';
// import functionList from '../locales/ja/functionList.json';

const propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  catalyst: PropTypes.object.isRequired,
  legend: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
};

/* eslint-disable import/no-dynamic-require, global-require */
class Introduction extends Component {
  componentWillMount() {
    const { actions } = this.props;
    const { path } = this.props.params;
    if (path) {
      actions.changeShowContents([path]);
    }
  }

  render() {
    const { path } = this.props.params;
    const { showContents } = this.props.catalyst;
    const { testmap, eventid } = this.props.location.query;
    const { legends, legendwidth, legendheight, legendleft } = this.props.legend;
    const { actions, locale } = this.props;
    const lengdsty = {
      width: legendwidth,
      height: legendheight,
      left: legendleft,
    };

    if (showContents.length === 0 && !path) {
      // トップ画面へ飛ばす
      hashHistory.push('/');
      return null;
    }
    /* eslint-disable global-require,import/no-dynamic-require */
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

    const Menu = showContents.map((showContent) => {
      const MenuItem = require(`./${showContent}/Menu`).default;
      return (
        <div className={css.menu} key={showContent}>
          <MenuItem />
        </div>
      );
    });

    const LegendContent = (() => {
      if (legends.length) {
        return legends.map((legend) => {
          const target = functionList.filter(element => element.path === legend);
          if (target[0].legend === true) {
            const LegendContentItem = require(`./${legend}/Legend`).default;
            return {
              name: legend,
              tabname: target[0].legendtab ? target[0].legendtab : legend,
              content: <LegendContentItem key={legend} />,
            };
          }
          return { name: legend, tabname: legend, content: <div>no content</div> };
        });
      }
      return null;
    })();

    const subContent = showContents.map((showContent) => {
      let html;
      try {
        html = require(`html-loader!markdown-loader!../../md/${locale}/${showContent}.md`);
      } catch (error) {
        if (error.message.indexOf('Cannot find module') !== -1) {
          html = 'No Content';
        } else {
          throw error;
        }
      }
      return {
        tabname: showContent,
        content: <Markdown html={html} />,
      };
    });

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

    WrapMessages.setMessagesJson(messages);

    let main;
    if (showContents.indexOf('projectionswitch') !== -1) {
      main = <MainProjection eventid={eventid} />;
    } else if (eventid) {
      main = <MainAutoTest testmap={testmap} eventid={eventid} />;
    } else {
      main = <Main />;
    }

    return (
      <div>
        <div className={css.container}>
          <IntlProvider locale={locale} messages={messages}>
            <div className={css.sideMenu}>
              <SideMenuDrawer
                content={Menu}
                onClick={(isOpen) => {
                  if (isOpen) {
                    actions.legendChangeLeft(220);
                  } else {
                    actions.legendChangeLeft(0);
                  }
                }}
              />
            </div>
          </IntlProvider>
          <div className={css.contents}>
            <MainContent
              content={main}
            />
            <SubContent contents={subContent} />
            <IntlProvider locale={locale} messages={messages}>
              <SubLegend
                style={lengdsty}
                contents={LegendContent}
              />
            </IntlProvider>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    catalyst: state.catalyst,
    legend: state.legend,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign({}, Actions, LegendActions), dispatch),
  };
}

Introduction.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Introduction);
