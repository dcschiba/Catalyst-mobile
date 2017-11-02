import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ClassNames from 'classnames/bind';
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import '!!style-loader!css-loader!react-tabs/style/react-tabs.css';
import css from '../../../style/common/subContent.css';


const propTypes = {
  contents: PropTypes.array,
};

class SubContent extends Component {
  constructor(props) {
    super(props);
    this.state = { isSpread: false, tabIndex: 0 };
    this.handleClick = this.handleClick.bind(this);
    this.cx = ClassNames.bind(css);
  }
  handleClick(isSpread) {
    this.setState({ isSpread });
  }
  render() {
    const { isSpread } = this.state;
    const { contents } = this.props;
    const container = this.cx({
      container: true,
      hide: !this.state.isSpread,
      spread: this.state.isSpread,
    });

    const label = this.state.isSpread ? ('▼') : ('▲');

    const tabNames = contents.map(content => <Tab key={content.tabname}>{content.tabname}</Tab>);
    const tabContents = contents.map(content => <TabPanel
      key={content.tabname}
    >{content.content}</TabPanel>);
    const item = (<Tabs
      selectedIndex={this.state.tabIndex}
      onSelect={tabIndex => this.setState({ tabIndex })}
    >
      <TabList>
        {tabNames}
      </TabList>
      {tabContents}
    </Tabs>);
    return (
      <div className={container}>
        <button
          className={css.button}
          onClick={() => { this.handleClick(!isSpread); }}
        >{label}</button>
        <div className={css.contentArea}>{item}</div>
      </div>
    );
  }
}

SubContent.propTypes = propTypes;
export default SubContent;
