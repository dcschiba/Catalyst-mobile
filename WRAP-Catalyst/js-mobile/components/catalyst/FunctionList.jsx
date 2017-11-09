// TODO チューニング

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashHistory, Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { FormattedMessage } from 'react-intl';
import css from '../../../style-mobile/functionList.css';

const propTypes = {
  data: PropTypes.array.isRequired,
  isreactredux: PropTypes.bool,
  changeShowContents: PropTypes.func.isRequired,
};

function search(target, searchList) {
  let result = false;
  searchList.forEach((searchText) => {
    if (searchText !== '' && target.indexOf(searchText) > -1) {
      result = true;
    }
  });
  return result;
}

class FunctionList extends Component {
  constructor(props) {
    super(props);
    this.state = { searchText: '', checkList: [] };
    this.handleChange = this.handleChange.bind(this);
    this.listItemCheck = this.listItemCheck.bind(this);
    this.showClick = this.showClick.bind(this);
  }

  handleChange(text) {
    this.setState({ searchText: text });
  }

  listItemCheck(checked, path) {
    const { checkList } = this.state;
    const idx = checkList.indexOf(path);
    if (checked && idx === -1) {
      const newCheckList = checkList.concat([path]);

      // 地図選択と図法選択の排他制御
      const projectionswitchidx = checkList.indexOf('projectionswitch');
      const mapswitchidx = checkList.indexOf('mapswitch');
      if (path === 'mapswitch' && projectionswitchidx !== -1) {
        newCheckList.splice(projectionswitchidx, 1);
      } else if (path === 'projectionswitch' && mapswitchidx !== -1) {
        newCheckList.splice(mapswitchidx, 1);
      }

      this.setState({ checkList: newCheckList });
    } else if (!checked && idx !== -1) {
      const newCheckList = checkList.concat();
      newCheckList.splice(idx, 1);
      this.setState({ checkList: newCheckList });
    }
  }

  showClick() {
    const { checkList } = this.state;
    const { changeShowContents } = this.props;
    if (checkList.length > 0) {
      changeShowContents(checkList);
      hashHistory.push('introduction');
    }
  }

  render() {
    const { data, isreactredux } = this.props;
    if (!data) {
      return <div />;
    }
    const { searchText, checkList } = this.state;
    // 検索ワードでリストをフィルター
    const searchTextLowerCase = searchText.toLowerCase();
    const searchTextList = searchText.toLowerCase().split(' ');
    const filteredFunctionList = data.filter(
      element => search(element.name.toLowerCase(), searchTextList) ||
        element.summary.toLowerCase().indexOf(searchTextLowerCase) > -1,
    );

    const list = filteredFunctionList.map((element, index) => {
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
      } else if (element.noMap) {
        return (
          <ListItem
            key={index}
            className={css.listItem}
            leftCheckbox={
              <button
                style={{ display: 'none' }}
                onClick={() => hashHistory.push(`general/${element.path}`)}
              />
            }
            primaryText={element.name}
            secondaryText={element.summary}
            rightToggle={
              <Link
                to={`description/${element.path}`}
                className={css.descriptionButton}
                onClick={e => e.stopPropagation()}
              >
                <FormattedMessage id="functionList.explain" />
              </Link>
            }
          />
        );
      } else if (!isreactredux) {
        return (
          <ListItem
            key={index}
            className={css.listItem}
            primaryText={element.name}
            secondaryText={<span> {element.summary} <br /> {element.path}</span>}
            onClick={() => window.open(element.path)}
          />
        );
      }
      return (
        <ListItem
          key={index}
          className={css.listItem}
          leftCheckbox={
            <Checkbox
              checked={checkList.indexOf(element.path) !== -1}
              onClick={e => this.listItemCheck(e.target.checked, element.path)}
            />
          }
          primaryText={element.name}
          secondaryText={element.summary}
          rightToggle={
            <Link
              to={`description/${element.path}`} className={css.descriptionButton}
            >
              <FormattedMessage id="functionList.explain" />
            </Link>
          }
        />
      );
    });

    if (list.length === 0) {
      list.push(<ListItem key={0} primaryText={<FormattedMessage id="functionList.noResult" />} />);
    }
    let raisedbutton = (<RaisedButton
      label={<FormattedMessage id="functionList.submit" />}
      primary
      style={{ marginLeft: 10 }}
      disabled={checkList.length === 0}
      onClick={() => this.showClick()}
    />);
    let functionlisttitle = 'functionList.title';
    if (!isreactredux) {
      functionlisttitle = 'functionList.title2';
      raisedbutton = <div />;
    }

    return (
      <div>
        <h2 className={css.title}><FormattedMessage id={functionlisttitle} /></h2>
        <div>
          <TextField
            hintText="Search"
            className={css.searchField}
            value={this.state.searchText}
            onChange={e => this.handleChange(e.target.value)}
            type="text"
          />
          {raisedbutton}
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

FunctionList.propTypes = propTypes;
export default FunctionList;
