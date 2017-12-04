import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocationIcon from 'material-ui/svg-icons/maps/my-location';
import SlideLeftIcon from 'material-ui/svg-icons/navigation/chevron-left';
import SlideRightIcon from 'material-ui/svg-icons/navigation/chevron-right';
import FloatingActionButton from 'material-ui/FloatingActionButton';
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
      trigger_wrapper: {
        width: `calc(${tabList.length} * 60px)`,
      },
      floating_button_label: {
        fontSize: '0.7em',
        position: 'relative',
        top: '-46px',
        color: '#000000',
      },
      floating_button_icon: {
        fill: '#4285f4',
        position: 'relative',
        top: '-8px',
      },
    };

    return (
      <div>
        <div className={css.location_button}>
          <FloatingActionButton backgroundColor="white">
            <LocationIcon style={styles.floating_button_icon} />
            <div style={styles.floating_button_label}>現在地</div>
          </FloatingActionButton>
        </div>
        <div className={css.footer}>
          <SlideLeftIcon style={styles.slide_button} />
          <div className={css.contents_trigger_area}>
            <div className={css.contents_trigger_wrapper} style={styles.trigger_wrapper}>
              {tabList.map(contents => (
                <button
                  onClick={() => document.getElementById(contents.path).click()}
                  className={css.contents_trigger}
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
