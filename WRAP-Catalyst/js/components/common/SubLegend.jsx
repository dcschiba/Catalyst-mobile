import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import '!!style-loader!css-loader!react-tabs/style/react-tabs.css';
import css from '../../../style/common/sublegend.css';


const propTypes = {
  contents: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  style: PropTypes.object.isRequired,
};
class SubLegend extends Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  render() {
    const { style, contents } = this.props;
    let divsty;
    let TabNmames = <Tab />;
    let TabContent = <TabPanel />;
    if (contents) {
      divsty = { ...style, opacity: 0.7, display: 'block', border: '1px solid transparent' };
      TabNmames = contents.map(content => <Tab key={content.name}>{content.tabname}</Tab>);
      TabContent = contents.map(content => <TabPanel
        key={content.name}
      >{content.content}</TabPanel>);
      const len = TabNmames.length;
      let idx = this.state.tabIndex;
      if (len !== SubLegend.bfShowContentNum) {
        idx = len - 1;
        SubLegend.bfShowContentNum = len;
        this.state.tabIndex = idx;
      }
      return (
        <div style={divsty} className={css.content}>
          <Tabs
            selectedIndex={this.state.tabIndex}
            onSelect={tabIndex => this.setState({ tabIndex })}
          >
            <TabList>
              {TabNmames}
            </TabList>
            {TabContent}
          </Tabs>
        </div>
      );
    }
    divsty = { ...style, display: 'none' };
    return (
      <div style={divsty} className={css.content} />
    );
  }
}

SubLegend.propTypes = propTypes;
SubLegend.bfShowContentNum = 0;
export default SubLegend;
