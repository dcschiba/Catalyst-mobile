/*
--import--
import { styles } from '../../utils/menuStyle';
import { styles, childWrapper } from '../../utils/menuStyle';

--CheckBox--
iconStyle={styles.checkbox.icon}
labelStyle={styles.checkbox.label}

--RadioButton--
iconStyle={styles.radio.icon}
labelStyle={styles.radio.label}

--SelectField--
style={styles.select.wrapper}

--ChildArea--
<div style={childWrapper(numOfChild, showFlag)}>
</div>
*/

export const styles = {
  line: {
    display: 'flex',
    jastifyContents: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingRight: '20px',
  },
  sectionName: {
    margin: '25px 0 0 20px',
  },
  radio: {
    label: {
      padding: '20px 0 20px 10px',
    },
    icon: {
      padding: '10px 10px 10px 10px',
    },
    leftPosition: {
      label: {
        padding: '20px 0 20px 0px',
      },
      icon: {
        padding: '10px 6px 10px 6px',
      },
    },
  },
  checkbox: {
    label: {
      padding: '20px 0 20px 6px',
    },
    icon: {
      padding: '10px 10px 10px 10px',
    },
    leftPosition: {
      label: {
        padding: '20px 0 20px 0px',
      },
      icon: {
        padding: '10px 6px 10px 6px',
      },
    },
  },
  select: {
    wrapper: {
      marginLeft: '22px',
      width: '50%',
    },
    rightPosition: {
      marginRight: '12px',
      marginLeft: '12px',
      zIndex: 10,
    },
  },
  numeric: {
    label: {
      margin: '18px',
    },
  },
};

export const childWrapper = (num, flag) => ({
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  height: flag ? `calc(${num} * 64px)` : '0px',
  paddingTop: '4px',
  paddingLeft: '20px',
});

