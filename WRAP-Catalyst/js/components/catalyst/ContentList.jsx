import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { List, ListItem } from 'material-ui/List';
import { FormattedMessage } from 'react-intl';
import css from '../../../style/contentList.css';

const propTypes = {
  data: PropTypes.array.isRequired,
};

class ContentList extends Component {
  render() {
    const { data } = this.props;
    const list = data.map((element, index) => {
      if (!element.published) {
        return (
          <ListItem
            key={index}
            primaryText={element.name}
            secondaryText={element.summary}
            style={{ opacity: 0.4 }}
            disabled
          />
        );
      } else if (element.isExternal) {
        return (
          <ListItem
            key={index}
            className={css.listItem}
            primaryText={element.name}
            secondaryText={element.summary}
            onClick={() => window.open(element.path)}
          />
        );
      }
      return (
        <Link
          key={index}
          to={`description/${element.mdPath}`}
          className={css.link}
          target="_blank"
        >
          <ListItem
            className={css.listItem}
            primaryText={element.name}
            secondaryText={element.summary}
          />
        </Link>
      );
    });

    return (
      <div>
        <h2 className={css.title}><FormattedMessage id="contentList.title" /></h2>
        <div>
          <div className={css.listBox}>
            <List>
              {list}
            </List>
          </div>
        </div>
      </div>
    );
  }
}

ContentList.propTypes = propTypes;
export default ContentList;
