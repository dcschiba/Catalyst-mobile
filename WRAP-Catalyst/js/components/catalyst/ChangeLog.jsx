import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import css from '../../../style/changeLog.css';

const propTypes = {
  data: PropTypes.array.isRequired,
};

const ChangeLog = (props) => {
  const list = [];
  const CHANGE_LOG_DATE = 'change-log-date';
  const CHANGE_LOG_MESSAGE = 'change-log-message';
  props.data.forEach((element, index) => {
    list.push(
      <dt key={CHANGE_LOG_DATE + index}>{element.date}</dt>,
    );
    list.push(
      <dd key={CHANGE_LOG_MESSAGE + index}>{element.message}</dd>,
    );
  });

  return (
    <div>
      <div className={css.titleArea}>
        <h2 className={css.title}><FormattedMessage id="changeLog.title" /></h2>
      </div>
      <div className={css.content}>
        <dl className={css.list}>
          {list}
        </dl>
      </div>
    </div>
  );
};

ChangeLog.propTypes = propTypes;
export default ChangeLog;
