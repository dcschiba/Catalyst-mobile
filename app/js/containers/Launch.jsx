import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import css from '../../style/launch.css';
import ConceptImg from '../../img/concept.png';
import Logo from '../../img/wni_logo.png';

const propTypes = {

};

const styles = {
  skip: {
    color: 'rgb(0, 109, 185)',
  },
};

class Launch extends Component {
  componentWillMount() {

  }

  render() {
    return (
      <div className={css.wrapper}>
        <img src={Logo} className={css.logo} alt="weathernews-logo" />
        <img src={ConceptImg} className={css.message} alt="Services Concept" />
        <div className={css.skip}><FlatButton label="Skip" style={styles.skip} onClick={() => hashHistory.push('start')} /></div>
      </div>
    );
  }

}


Launch.propTypes = propTypes;
export default Launch;
