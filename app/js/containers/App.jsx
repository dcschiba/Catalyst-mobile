import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LinearProgress from 'material-ui/LinearProgress';
import SettingMenu from '../components/catalyst/SettingMenu';
// import Loading from '../components/catalyst/Loading';
import { xhrHook, getLandingDirEntry, checkOffline, resolveURL } from '../utils/fileHandler';
import * as Actions from '../actions/catalyst';
import * as localeActions from '../actions/locale';
import * as lightningActions from '../actions/lightning';
import * as onlineActions from '../actions/online';
import * as prepareActions from '../actions/prepare';
import * as selectFuncActions from '../actions/selectedFuncList';
import css from '../../style/app.css';

const propTypes = {
  children: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  messages: PropTypes.object.isRequired,
  funcMasterArray: PropTypes.array.isRequired,
  funcMasterObject: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  // isPrepared: PropTypes.bool.isRequired,
};

const themeColor = {
  main: { backgroundColor: '#333333', color: '#ffffff' },
  second: { backgroundColor: '#707070', color: '#ffffff' },
  ground: { backgroundColor: '#ffffff', color: '#505050' },
  accent: '#ff7710',
};

const styles = {
  appBar: {
    ...themeColor.main,
    height: '50px',
    paddingRight: '12px',
    boxShadow: '0px 1px 8px #333333',
  },
  title: {
    fontSize: '1.15em',
    lineHeight: '50px',
  },
  rightIcon: {
    margin: '2px 0 0 0',
    padding: 0,
  },

  okButton: {
    backgroundColor: '#707070',
    color: 'white',
    margin: '0 16px 8px 16px',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    color: 'white',
    margin: '0 16px 8px 16px',
  },
  buttonWrapper: {
    width: '100%',
    textAlign: 'center',
  },
};

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      dialogOpen: '',
      inPreparation: 0,
      progress: 0,
      title: '',
    };
    xhrHook(props.actions);
    this.onOnline = this.onOnline.bind(this);
    this.onOffline = this.onOffline.bind(this);
  }
  componentDidMount() {
    if (navigator.connection && navigator.connection.type !== 'none') {
      this.onOnline();
    } else {
      this.onOffline();
    }
    document.addEventListener('online', this.onOnline, false);
    document.addEventListener('offline', this.onOffline, false);
  }

  componentWillUnmount() {
    document.removeEventListener('online', this.onOnline);
    document.removeEventListener('offline', this.onOffline);
  }
  onOnline() {
    this.props.actions.turnOnline();
  }
  onOffline() {
    this.props.actions.turnOffline();

    // remove select functions
    this.props.funcMasterArray.forEach((item) => {
      if (!item.offLine) {
        this.props.actions.removeFunction(item.path);
      }
    });

    // inPreparation
    // 1: check file
    // 2: offline copy confirm
    // 3: copy zip file
    // 4: extract zip file
    // 0: finish
    this.setState({ inPreparation: 1, title: 'Check offline files...' });

    // offline用データをチェックする
    checkOffline().then(success => this.setState({ inPreparation: success ? 0 : 2 }));
  }

  /** Offline初期化処理 */
  initOffline(callback, error) {
    const filePath = `${window.cordova.file.applicationDirectory}/www/offline/WRAP.zip`;

    resolveURL(filePath).then((fileEntry) => {
      this.setState({ inPreparation: 3, title: 'Copy files...' });

      getLandingDirEntry(fileEntry).then((entry) => {
        console.error('start unzip', entry);
        this.setState({ inPreparation: 4, title: 'Extract files...' });

        const zipPath = entry.copied.nativeURL;
        const extractDir = entry.cache.nativeURL;

        window.zip.unzip(zipPath, extractDir, (status) => {
          if (status !== 0) {
            console.error('unzip error');
            error();
            return;
          }

          // progress 100%を表示できるように、１秒待つ
          setTimeout(() => {
            this.setState({ inPreparation: false, title: '' });

            console.error('unzip success');
            callback();
          }, 1000);
        }, (progressEvent) => {
          const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);

          if ((progress - this.state.progress) >= 2) {
            this.setState({ progress });
          }
        });
      });
    });
  }

  render() {
    const { children, locale, actions, messages, funcMasterArray, funcMasterObject } = this.props;
    const { inPreparation, progress, title } = this.state;
    return (
      <IntlProvider locale={locale} messages={messages}>
        <div style={{ ...themeColor.ground }} >
          <AppBar
            title="WRAP Catalyst"
            titleStyle={styles.title}
            style={styles.appBar}
            showMenuIconButton={false}
            iconElementRight={
              <SettingMenu actions={actions} themeColor={themeColor} locale={locale} />
            }
            iconStyleRight={styles.rightIcon}
          />
          <div className={css.contents}>
            {React.cloneElement(
              children,
              { themeColor, funcMasterArray, funcMasterObject, locale, messages },
            )}
          </div>
          <Dialog
            title={title}
            modal
            open={inPreparation === 1 || inPreparation === 3 || inPreparation === 4}
          >
            {inPreparation !== 1 ? <LinearProgress mode="determinate" value={progress} /> : null}
          </Dialog>
          <Dialog
            title={'オフライン動作準備'}
            actions={[
              <div style={styles.buttonWrapper}>
                <FlatButton
                  label="キャンセル"
                  onClick={this.handleClose}
                  style={styles.cancelButton}
                />
              </div>,
              <div style={styles.buttonWrapper}>
                <FlatButton
                  label="実行"
                  onClick={() => {
                    this.initOffline(
                      () => actions.finishPrepare(),
                      error => console.error('initOffLineError', error),
                    );
                  }}
                  style={styles.okButton}
                />
              </div>,
            ]}
            modal={false}
            open={inPreparation === 2}
            onRequestClose={this.handleClose}
          >
            ネットワークがオフになっています。<br />
            オフラインで使用する場合はオフラインセットアップを実行してください。<br />
            ※セットアップには５分程かかる場合があります。
          </Dialog>
          {/* {this.state.inPreparation && !this.props.isPrepared ? <Loading /> : null} */}
        </div>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const locale = state.locale;
  const title = state.catalyst.title;
  const isPrepared = state.prepare.prepared;
  return {
    ...locale, // locale = { locale, messages, funcMasterArray, funcMasterObject }
    title,
    isPrepared,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign({},
        Actions,
        localeActions,
        lightningActions,
        onlineActions,
        prepareActions,
        selectFuncActions,
      ), dispatch),
  };
}

App.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
