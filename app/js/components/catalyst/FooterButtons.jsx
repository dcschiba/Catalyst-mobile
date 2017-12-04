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
};

class FooterButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabState: 0,
      isMenuShown: false,
      isActive: {},
    };
    this.props.tabList.forEach((content) => {
      this.state.isActive[content] = false;
    });
  }
  turnActive(contents, flag) {
    this.setState({
      isActive: { ...this.state.isActive, [contents]: flag },
    });
  }

  render() {
    const { tabList, themeColor } = this.props;

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
    };

    return (
      <div>
        <div className={css.location_button}>
          <FloatingActionButton backgroundColor="white">
            <LocationIcon style={{ fill: '#4285f4' }} />
          </FloatingActionButton>
        </div>
        <div className={css.footer}>
          <SlideLeftIcon style={styles.slide_button} />
          <div className={css.contents_trigger_area}>
            <div className={css.contents_trigger_wrapper} style={styles.trigger_wrapper}>
              {tabList.map(contents => (
                <button
                  onClick={() => {
                    document.getElementById(contents).click();
                    this.turnActive(contents, !this.state.isActive[contents]);
                  }}
                  className={css.contents_trigger} style={themeColor.main}
                >{contents.slice(0, 4).toUpperCase()}..
              <NeonButton isActive={this.state.isActive[contents]} />
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
