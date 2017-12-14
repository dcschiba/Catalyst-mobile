import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import Dialog from 'material-ui/Dialog';


const propTypes = {
  actions: PropTypes.object.isRequired,
  themeColor: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};
const styles = {
  settingButton: {
    padding: '6px 14px 6px 14px',
    margin: '0px',
  },
  settingMenuItem: {
    width: '100%',
    height: '40px',
    backgroundColor: 'white',
    margin: 0,
    padding: 0,
  },
  settingMenuItemWrapper: {
    width: '100%',
    height: '40px',
    margin: 0,
    padding: 0,
  },
  radioButton: {
    marginBottom: 16,
  },
  radioWrapper: {
    padding: '10px 0',
  },
  ngButton: {
    backgroundColor: '#707070',
    color: 'white',
    margin: '0 16px 8px 16px',
  },
  okButton: {
    backgroundColor: '#44f477',
    color: 'white',
  },
  buttonWrapper: {
    width: '100%',
    textAlign: 'center',
  },

};
class SettingMenu extends Component {
  constructor() {
    super();
    this.state = {
      dialogStatus: '',
      language: '',
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLanguage = this.handleLanguage.bind(this);
  }
  handleOpen(item) {
    this.setState({ dialogStatus: item });
  }
  handleClose() {
    this.setState({ dialogStatus: '' });
  }
  handleLanguage(lang) {
    this.setState({ language: lang });
  }
  render() {
    const { actions, themeColor, locale } = this.props;
    const uuid = _.get(window, 'device.uuid') ? window.device.uuid : 'unknown';
    let dialog = <div />;
    let dialogTitle = '';
    let dialogButtons = [];
    switch (this.state.dialogStatus) {
      case 'uuid': {
        dialogTitle = 'UUID';
        dialog = <div>uuid: {uuid}</div>;
        dialogButtons = [
          <div style={styles.buttonWrapper}>
            <FlatButton
              label="Close"
              onClick={this.handleClose}
              style={styles.ngButton}
            />
          </div>,
        ];
        break;
      }
      case 'language': {
        dialogTitle = 'Lenguage';
        dialog = (
          <RadioButtonGroup
            name="language"
            defaultSelected={locale}
            onChange={event => this.handleLanguage(event.target.value)}
            style={styles.radioWrapper}
          >
            <RadioButton
              value="en"
              label="English"
              style={styles.radioButton}
            />
            <RadioButton
              value="ja"
              label="Japanese"
              style={styles.radioButton}
            />
          </RadioButtonGroup >
        );
        dialogButtons = (
          <div style={styles.buttonWrapper}>
            <FlatButton
              label="Cancel"
              onClick={this.handleClose}
              style={styles.ngButton}
            />
            <FlatButton
              label="OK"
              onClick={() => {
                actions.changeLocale(this.state.language);
                this.handleClose();
              }}
              style={styles.okButton}
            />
          </div>
        );
        break;
      }
      default:
    }
    return (
      <div>
        <IconMenu
          iconButtonElement={
            <IconButton>
              <SettingIcon color={themeColor.main.color} style={styles.settingButton} />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="Language" onClick={() => {
              this.handleLanguage('');
              this.handleOpen('language');
            }}
          />
          <MenuItem primaryText="UUID" onClick={() => this.handleOpen('uuid')} />
        </IconMenu>
        <Dialog
          title={dialogTitle}
          actions={dialogButtons}
          modal={false}
          open={this.state.dialogStatus !== ''}
          onRequestClose={this.handleClose}
        >
          {dialog}
        </Dialog>
      </div>
    );
  }
}

SettingMenu.propTypes = propTypes;
export default SettingMenu;
