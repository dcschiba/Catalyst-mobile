import React, { Component } from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
/* eslint-disable import/no-webpack-loader-syntax, import/no-unresolved */
import '!!style-loader!css-loader!highlight.js/styles/foundation.css';
import css from '../../../style/common/markdown.css';

const propTypes = {
  html: PropTypes.string.isRequired,
};

class Markdown extends Component {

  componentDidMount() {
    // コンテンツ内にhighlight.jsの適用
    const nodes = this.md.querySelectorAll('pre code');
    Array.from(nodes).forEach(node =>
      hljs.highlightBlock(node),
    );
    // コンテンツ内のaタグ全てに「target=_blank」を設定
    const elements = this.md.getElementsByTagName('a');
    Array.from(elements).forEach(element =>
      element.setAttribute('target', '_blank'),
    );
  }

  render() {
    const { html } = this.props;
    /* eslint-disable react/no-danger */
    return (
      <div
        className={css.textArea}
        ref={ref => (this.md = ref)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

Markdown.propTypes = propTypes;
export default Markdown;
