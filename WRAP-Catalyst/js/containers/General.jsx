import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../../style/general.css';

const propTypes = {
  params: PropTypes.object.isRequired,
};

class General extends Component {
  render() {
    const { path } = this.props.params;
    /* eslint-disable import/no-dynamic-require, global-require */
    const Content = require(`./${path}/Content`).default;

    return (
      <div className={css.container}>
        <Content />
      </div>
    );
  }
}

General.propTypes = propTypes;
export default General;
