import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Markdown from '../components/catalyst/Markdown';
import css from '../../style/description.css';

const propTypes = {
  params: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};
class Description extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { path } = this.props.params;
    const { locale } = this.props;
    /* eslint-disable import/no-dynamic-require, global-require */
    let html;
    try {
      html = require(`html-loader!markdown-loader!../../md/${locale}/${path}.md`);
    } catch (error) {
      if (error.message.indexOf('Cannot find module') !== -1) {
        html = require(`html-loader!markdown-loader!../../md/en/${path}.md`);
      } else {
        throw error;
      }
    }
    return (
      <div className={css.container}>
        <div className={css.content}>
          <Markdown html={html} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const locale = state.locale.locale;
  return {
    locale,
  };
}

Description.propTypes = propTypes;
export default connect(
  mapStateToProps,
  null,
)(Description);
