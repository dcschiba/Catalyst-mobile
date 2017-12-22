import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import css from '../../style/start.css';
import startImg from '../../img/start.png';

const propTypes = {

};

const styles = {
  start: {
    width: '84%',
    height: '50px',
    backgroundColor: '#0C419A',
    color: 'white',
  },
};

class Top extends Component {
  render() {
    return (
      <div className={css.wrapper}>
        <button
          className={css.wrapper_button}
          onClick={() => hashHistory.push('app')}
        />
        <img src={startImg} className={css.background} alt="Hello WRAP Catalyst mobile" />
        <div className={css.start_button}>
          <FlatButton label="START" style={styles.start} />
        </div>
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
