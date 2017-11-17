import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import Left from 'material-ui/svg-icons/navigation/chevron-left';
import Right from 'material-ui/svg-icons/navigation/chevron-right';
import style from './styles/sideMenuDrawer';


/**
 * 開閉可能な左メニューを表示する
 * @class SideMenuDrawer
 **/

/**
 * @method props
 * @param content {object} 内部に表示する要素
 **/
class SideMenuDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: true };
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick() {
    const { onClick } = this.props;
    if (onClick) {
      onClick(!this.state.isOpen);
    }
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const styles = {
      sideMenu: {
        display: this.state.isOpen ? 'inline' : 'none',
        height: '100%',
      },
      button: {
        zIndex: '9999',
        width: '30px',
        height: '30px',
        padding: '0px',
        background: 'rgba(34,34,34,0.2)',
        position: 'absolute',
        left: this.state.isOpen ? '191px' : '0px',
        top: '0px',
      },
    };

    const Icon = this.state.isOpen ? <Left /> : <Right />;
    return (
      <div>
        <IconButton
          style={styles.button}
          onClick={() => this.handleOnClick()}
        >
          {Icon}
        </ IconButton>
        <div style={styles.sideMenu}>
          <div style={style.menu}>
            <div style={style.content}>
              {this.props.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideMenuDrawer;
