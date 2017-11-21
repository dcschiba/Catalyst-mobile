import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormattedMessage } from 'react-intl';
import * as LegendActions from '../../actions/legend';
import * as AmedasActions from '../../actions/amedas';
import css from '../../../style/common/legend.css';

const propTypes = {
  content: PropTypes.string.isRequired,
  actions: PropTypes.object,

};
class Legend extends Component {
  static closeClick(actions) {
    actions.amedasClick(false);
    actions.deleteLegend('amedas');
  }
  componentWillMount() {
    const { actions } = this.props;
    actions.legendChangeSize(200, 200);
  }

  render() {
    const fontsize = {
      paddingTop: '5pt',
      paddingLeft: '5pt',
      fontSize: '8pt',
    };
    const { content, actions } = this.props;
    const legends = [];
    if (content === 'Sunshine') {
      legends.push(<div key="s0">{<FormattedMessage id="common.unit" />}：min</div>);
      legends.push(<div key="s1"><img src="img/amedas/2.png" alt="s1" /> {' <3'} </div>);
      legends.push(<div key="s2"><img src="img/amedas/4.png" alt="s2" /> {' <6'} </div>);
      legends.push(<div key="s3"><img src="img/amedas/5.png" alt="s3" /> {' <10'} </div>);
      legends.push(<div key="s4"><img src="img/amedas/8.png" alt="s4" /> {' =10'} </div>);
    } else if (content === 'Temperature') {
      legends.push(<div key="t0">{<FormattedMessage id="common.unit" />}：℃</div>);
      legends.push(<div key="t1">
        <img src="img/amedas/0.png" alt="t11" /> {' <-10　　　'}
        <img src="img/amedas/7.png" alt="t12" /> {' >=20'}
      </div>);
      legends.push(<div key="t2">
        <img src="img/amedas/2.png" alt="t21" /> {' >=-10　 　'}
        <img src="img/amedas/8.png" alt="t22" /> {' >=25'}
      </div>);
      legends.push(<div key="t3">
        <img src="img/amedas/2.png" alt="t31" /> {' >=-5　　　'}
        <img src="img/amedas/10.png" alt="t32" /> {' >=30'}
      </div>);
      legends.push(<div key="t4"><img src="img/amedas/2.png" alt="t4" /> {' >=0'} </div>);
      legends.push(<div key="t5"><img src="img/amedas/4.png" alt="t5" /> {' >=5'} </div>);
      legends.push(<div key="t6"><img src="img/amedas/5.png" alt="t6" /> {' >=10'} </div>);
      legends.push(<div key="t7"><img src="img/amedas/6.png" alt="t7" /> {' >=15'} </div>);
    } else if (content === 'Precipitation') {
      legends.push(<div key="p0">{<FormattedMessage id="common.unit" />}：mm</div>);
      legends.push(<div key="p1"><img src="img/amedas/3.png" alt="p1" /> {' >0 <1'} </div>);
      legends.push(<div key="p2"><img src="img/amedas/2.png" alt="p2" /> {' >=1'} </div>);
      legends.push(<div key="p3"><img src="img/amedas/4.png" alt="p3" /> {' >=2'} </div>);
      legends.push(<div key="p4"><img src="img/amedas/5.png" alt="p4" /> {' >=4'} </div>);
      legends.push(<div key="p5"><img src="img/amedas/6.png" alt="p5" /> {' >=8'} </div>);
      legends.push(<div key="p6"><img src="img/amedas/7.png" alt="p6" /> {' >=16'} </div>);
      legends.push(<div key="p7"><img src="img/amedas/8.png" alt="p7" /> {' >=32'} </div>);
    } else if (content === 'SnowDepth') {
      legends.push(<div key="s0">{<FormattedMessage id="common.unit" />}：cm</div>);
      legends.push(<div key="s1"><img src="img/amedas/2.png" alt="s1" /> {' >0 <50'} </div>);
      legends.push(<div key="s2"><img src="img/amedas/4.png" alt="s2" /> {' <100'} </div>);
      legends.push(<div key="s3"><img src="img/amedas/5.png" alt="s3" /> {' <150'} </div>);
      legends.push(<div key="s4"><img src="img/amedas/6.png" alt="s4" /> {' <200'} </div>);
      legends.push(<div key="s5"><img src="img/amedas/7.png" alt="s5" /> {' <250'} </div>);
      legends.push(<div key="s6"><img src="img/amedas/8.png" alt="s6" /> {' >=250'} </div>);
    }
    /* eslint no-console: ["error", { allow: ["log"] }] */
    console.log('AMedas content legends', content, legends);
    return (
      <div style={fontsize}>
        {legends}
        <button className={css.closeButton} onClick={() => Legend.closeClick(actions)}>✖</button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    content: state.amedas.content,
    locale: state.locale.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(LegendActions, AmedasActions), dispatch),
  };
}
Legend.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Legend);
