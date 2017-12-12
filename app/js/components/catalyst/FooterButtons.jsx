import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SlideLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import SlideRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import css from '../../../style/footerButtons.css';
import NeonButton from './NeonButton';


const propTypes = {
  tabList: PropTypes.array.isRequired,
  themeColor: PropTypes.object.isRequired,
  activeFlags: PropTypes.object.isRequired,
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
    const { tabList, themeColor, activeFlags } = this.props;
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
      <div>
        <div className={css.footer}>
          <SlideLeftIcon style={styles.slide_button} />
          <div className={css.buttons_area}>
            <div className={css.buttons} style={styles.buttons}>
              {tabList.map((contents, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!activeFlags[contents.path]) {
                      document.getElementById(`${contents.path}_tab`).click();
                    }
                    document.getElementById(contents.path).click();
                  }}
                  className={css.button}
                  style={themeColor.main}
                >
                  <div className={css.label}>
                    {contents.name.toUpperCase()}
                  </div>
                  <NeonButton isActive={activeFlags[contents.path]} />
                </button>
              ))}
            </div>
          </div>
          <SlideRightIcon style={styles.slide_button} />
        </div>
      </div>
    );
  }
}

FooterButtons.propTypes = propTypes;
export default FooterButtons;
