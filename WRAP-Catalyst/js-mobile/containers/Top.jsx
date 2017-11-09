// TODO チューニング

import React, { Component } from 'react';
import { connect } from 'react-redux';
import css from '../../style-mobile/top.css';
import MessageImg from '../../img-mobile/message.png';
// import Logo from '../../img-mobile/wni_logo.svg';

const propTypes = {

};

const launch = (
  <div className={css.launch}>
    <img src={MessageImg} className={css.message} alt="message" />
  </div>
);

class Top extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className={css.wrapper}>
        {launch}
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
