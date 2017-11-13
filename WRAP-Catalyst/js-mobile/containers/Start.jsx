// TODO チューニング

import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../style-mobile/start.css';
// import Logo from '../../img-mobile/wni_logo.svg';

const propTypes = {

};

const Start = (
  <div className={css.Start}>
  a
  </div>
);

class Top extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className={css.wrapper}>
        {Start}
      </div>
    );
  }

}

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps() {
  return {
    // actions: bindActionCreators(Actions, dispatch),
  };
}

Top.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Top);
