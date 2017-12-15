import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
// import css from '../../../style/functionList.css';

const propTypes = {
  data: PropTypes.array.isRequired,
  flags: PropTypes.array.isRequired,
  itemClickAction: PropTypes.func.isRequired,
};

const styles = {
  list: {
    margin: '0',
    padding: '0',
  },
  item: {
    height: '1em',
    padding: '28px 20px',
  },
  checkbox: {
    margin: '14px',
    padding: '0px',
  },
};

class FunctionList extends Component {

  render() {
    const { data, flags, itemClickAction } = this.props;

    if (!data) {
      return <div />;
    }
    return (
      <List style={styles.list}>
        {
          data.map((item, index) => (
            <ListItem
              key={index}
              primaryText={item.name}
              style={styles.item}
              rightToggle={
                <Checkbox
                  checked={flags.indexOf(item.path) !== -1}
                  onCheck={oldState =>
                    itemClickAction(
                      oldState,
                      { name: item.name, path: item.path, legend: item.legend },
                    )
                  }
                  style={styles.checkbox}
                />
              }
            />
          ))
        }
      </List>
    );
  }
}

FunctionList.propTypes = propTypes;
export default FunctionList;
