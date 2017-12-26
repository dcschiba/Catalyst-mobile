import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
// import css from '../../../style/functionList.css';

const propTypes = {
  data: PropTypes.array.isRequired,
  selectedFuncList: PropTypes.array.isRequired,
  itemClickAction: PropTypes.func.isRequired,
  isOnline: PropTypes.bool.isRequired,
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
    margin: '11px',
    padding: '0px',
  },
  item_disabled: {
    height: '1em',
    padding: '28px 20px',
    color: '#cccccc',
  },
};

class FunctionList extends Component {

  render() {
    const { data, selectedFuncList, itemClickAction, isOnline } = this.props;

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
              style={!isOnline && !item.offLine ? styles.item_disabled : styles.item}
              rightToggle={
                <Checkbox
                  checked={selectedFuncList.indexOf(item.path) !== -1}
                  disabled={!isOnline && !item.offLine}
                  onCheck={oldState =>
                    itemClickAction(
                      oldState,
                      item.path,
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
