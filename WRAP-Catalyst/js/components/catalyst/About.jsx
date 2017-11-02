import React from 'react';
import { FormattedMessage } from 'react-intl';
import css from '../../../style/about.css';

const About = () => (
  <div>
    <div className={css.titleArea}>
      <h2 className={css.title}><FormattedMessage id="about.title" /></h2>
    </div>
    <div className={css.content}>
      <div><FormattedMessage id="about.content" /></div>
    </div>
  </div>
);

export default About;
