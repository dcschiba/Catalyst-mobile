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
    width: '120px',
    height: '70px',
    color: 'rgb(0, 109, 185)',
  },
  labelStyle: {
    fontSize: '1.3em',
  },
};

class Launch extends Component {
  componentWillMount() {

  }
  render() {
    return (
      <div className={css.wrapper}>
        <button
          className={css.wrapper_button}
          onClick={() => hashHistory.push('start')}
        />
        <div>
          <img src={Logo} className={css.logo} alt="weathernews-logo" />
          <img src={ConceptImg} className={css.message} alt="Services Concept" />
        </div>
        <div className={css.skip}>
          <FlatButton
            label="Skip"
            onClick={() => {}}
            style={styles.skip}
            labelStyle={styles.labelStyle}
          />
        </div>
      </div>
    );
  }

}


Launch.propTypes = propTypes;
export default Launch;
