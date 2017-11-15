import React, { Component } from 'react';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { hashHistory } from 'react-router';
import css from '../../style-mobile/start.css';
import startImg from '../../img-mobile/start.png';


const propTypes = {

};

const styles = {
  start: {
    width: '90%',
    height: '40px',
    backgroundColor: '#0C419A',
    color: 'white',
  },
};

class Top extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className={css.wrapper}>
        <img src={startImg} className={css.background} alt="Hello WRAP Catalyst mobile" />
        <div className={css.start_button}><FlatButton label="START" style={styles.start} onClick={() => hashHistory.push('app')} /></div>
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
