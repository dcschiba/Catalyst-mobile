
export const styles = {
  radio: {
    label: {
      padding: '16px 0 16px 10px',
    },
    icon: {
      padding: '8px 10px',
    },
  },
  checkbox: {
    label: {
      padding: '20px 0 20px 10px',
    },
    icon: {
      padding: '10px',
    },
  },
  select: {
    wrapper: {
      marginLeft: '20px',
    },
  },
};

 // TODO 作成
export const childStyles = {
  radio: {},
  label: {},
  line: {},
  selectLabel: {},
  selectWrapper: {},
};

export const childWrapper = (num, flag) => ({
  transition: 'all 0.3s ease',
  overflow: 'hidden',
  height: flag ? `calc(${num} * 60px)` : '0px',
  marginLeft: '24px',
});

