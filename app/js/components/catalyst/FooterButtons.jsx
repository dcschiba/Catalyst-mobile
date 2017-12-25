import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import SlideLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
// import SlideRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import css from '../../../style/footerButtons.css';
import NeonButton from './NeonButton';


const propTypes = {
  tabList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
  showLayerFlags: PropTypes.object.isRequired,
};

class FooterButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 0,
      isMenuShown: false,
    };
  }
  render() {
    const { tabList, themeColor, showLayerFlags } = this.props;
    const styles = {
      slide_button: {
        height: '100%',
        width: '30px',
        textAlign: 'center',
        verticalAlign: 'middle',
        padding: 0,
        ...themeColor.main,
      },
      buttons: {
        width: `calc(${tabList.length} * 60px)`,
      },
    };

    return (
      <div className={css.footer}>
        <div className={css.buttons} style={styles.buttons}>
          {tabList.map((contents, index) => (
            <button
              key={index}
              onClick={() => {
                if (!showLayerFlags[contents.path]) {
                  // コントロールメニューのタブをクリック。スライドさせる。
                  document.getElementById(`${contents.path}_tab`).click();
                }
                // コントロールメニュー内のレイヤーon/offを切り替える。
                document.getElementById(contents.path).click();
              }}
              className={css.button}
              style={themeColor.main}
            >
              <div className={css.label}>
                {contents.name.toUpperCase()}
              </div>
              <NeonButton isActive={showLayerFlags[contents.path]} />
            </button>
          ))}
        </div>
      </div>
    );
  }
}

FooterButtons.propTypes = propTypes;
export default FooterButtons;
