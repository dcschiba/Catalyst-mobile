import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'material-ui/Checkbox';
import WrapUtils from '../../common/utils/WrapUtils';
import * as LegendActions from '../../actions/legend';
import * as Jp10tenActions from '../../actions/jp10ten';

const propTypes = {
  jp10ten: PropTypes.object.isRequired,
  actions: PropTypes.object,

};
class Legend extends Component {
  static closeClick(actions) {
    actions.jptenClick(false);
    actions.deleteLegend('jp10ten');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(320, 490);
  }

  render() {
    const fontsize = {
      fontSize: '11pt',
    };

    const basediv = {
      overflow: 'hidden',
    };
    const clddiv = {
      width: '220px',
      float: 'left',
    };

    const { jp10ten, actions } = this.props;
    const {
      validtimeidx,
      validtimelist,
      visiblecodes,
    } = jp10ten;

    const codes = [100, 101, 200, 300, 301, 302, 303, 304, 400, 410, 411, 412, 420, 421, 422];
    const labels = [
      '影くっきり／はっきり',
      '影ぼんやり／うっすら',
      '影見えない（くもり）',
      'ぽつぽつ',
      'ぱらぱら',
      'さー',
      'ザー',
      'ゴーッ',
      'べちゃ（みぞれ）',
      'ちらちら',
      'ふわふわ',
      'しんしん',
      'ドカドカ',
      'あられ',
      '吹雪',
    ];

    const legends = [];
    codes.map((code, i) => {
      const srcstr = `img/jp10ten/${code}.png`;
      const ckbChecked = visiblecodes.indexOf(code) > -1;
      legends.push(<div style={basediv} key={code}>
        <div style={clddiv}><img src={srcstr} alt={code} /> {labels[i]}</div>
        <div style={{ float: 'left' }}><CheckBox
          checked={ckbChecked}
          style={{ display: 'inline-block', width: '100px' }}
          onClick={e => actions.jptenTypeCheck(code, e.target.checked)}
          label={'表示'}
        /></div>
      </div>);
      return code;
    });
    let reportdate = validtimelist[validtimeidx];
    if (reportdate) {
      reportdate = WrapUtils.dateFormat(reportdate, 'MM月DD日 hh時mm分', 9 * 3600);
    }

    return (
      <div style={fontsize}>
        <div> サポーターレポート　{reportdate}</div>
        <br />
        {legends}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    jp10ten: state.jp10ten,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, Jp10tenActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
