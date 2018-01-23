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
import { xhrHook, getLandingDirEntry, checkOffline, checkConfig, resolveURL } from '../utils/fileHandler';
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
    margin: '0px 8px 8px 8px',
  },
  cancelButton: {
    backgroundColor: '#cccccc',
    color: 'white',
    margin: '0px 8px 8px 8px',
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
      inPreparation: 0,
      progress: 0,
      title: '',
      offlineOpen: false,
    };
    xhrHook(props.actions);
    this.onOnline = this.onOnline.bind(this);
    this.onOffline = this.onOffline.bind(this);
    this.onResume = this.onResume.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onCheckOffline = this.onCheckOffline.bind(this);
    this.initOffline = this.initOffline.bind(this);
  }
  componentDidMount() {
    if (navigator.connection && navigator.connection.type !== 'none') {
      this.onOnline();
    } else {
      this.onOffline();
    }
    document.addEventListener('online', this.onOnline, false);
    document.addEventListener('offline', this.onOffline, false);
    // Appがバックグラウンドから取得されるときに発生する
    document.addEventListener('resume', this.onResume, false);
  }

  componentWillUnmount() {
    document.removeEventListener('online', this.onOnline);
    document.removeEventListener('offline', this.onOffline);
    // Appがバックグラウンドから取得されるときに発生する
    document.removeEventListener('resume', this.onResume);
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

    // offline用データをチェックする
    this.onCheckOffline();
  }

  /**
   * offline file check
   * inPreparation status:
   * 1: check file
   * 2: offline copy confirm
   * 3: copy zip file
   * 4: extract zip file
   * 0: finish
   * -1: init failed
   */
  onCheckOffline() {
    // dialog
    this.setState({ inPreparation: 1, title: 'Check offline files...' });
    // 設定ファイル数チェック
    checkConfig();
    // オフライン用データチェック
    checkOffline()
      .then(success => this.setState({ inPreparation: success ? 0 : 2 }))
      .catch(error => this.initOfflineFailed(error));
  }

  /** Appがバックグラウンドから取得されるときに発生する */
  onResume() {
    if (!navigator.onLine) {
      this.onCheckOffline();
    }
  }

  /** Offline初期化処理 */
  initOffline() {
    const filePath = `${window.cordova.file.applicationDirectory}/www/offline/WRAP.zip`;

    resolveURL(filePath)
      .then((fileEntry) => {
        this.setState({ inPreparation: 3, title: 'Copy files...' });

        return getLandingDirEntry(fileEntry);
      })
      .then((entry) => {
        this.setState({ inPreparation: 4, title: 'Extract files...' });

        const zipPath = entry.copied.nativeURL;
        const extractDir = entry.cache.nativeURL;

        window.zip.unzip(zipPath, extractDir, (status) => {
          if (status !== 0) {
            this.initOfflineFailed();
            return;
          }

          // iosの場合、100%まで表示し切れないので、もう一回応答させる
          this.setState({ progress: 100 });

          // progress 100%を表示できるように、１秒待つ
          setTimeout(() => {
            this.handleClose();

            this.props.actions.finishPrepare();
          }, 1000);
        }, (progressEvent) => {
          const progress = Math.floor((progressEvent.loaded / progressEvent.total) * 100);

          if ((progress - this.state.progress) >= 2) {
            this.setState({ progress });
          }
        });
      })
      .catch(error => this.initOfflineFailed(error));
  }

  /** オフライン初期化が失敗 */
  initOfflineFailed(error) {
    this.setState({ inPreparation: -1, title: 'オフライン初期化が失敗しました', offlineOpen: true });
    console.log(error);
  }

  handleClose() {
    this.setState({
      inPreparation: 0,
      title: '',
      offlineOpen: false,
      progress: 0,
    });
  }

  render() {
    const { children, locale, actions, messages, funcMasterArray, funcMasterObject } = this.props;
    const { inPreparation, progress, title, offlineOpen } = this.state;

    // オフライン初期化失敗
    const funcMaster = inPreparation === -1
      ? funcMasterArray.map(item => ({ ...item, offLine: false }))
      : funcMasterArray;

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
              { themeColor, funcMasterArray: funcMaster, funcMasterObject, locale, messages },
            )}
          </div>
          <Dialog
            modal
            open={offlineOpen}
            actions={[
              <div style={styles.buttonWrapper}>
                <FlatButton
                  label="OK"
                  onClick={this.initOfflineFailed}
                  style={styles.okButton}
                />
              </div>,
            ]}
          >
            {title}
          </Dialog>
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
              <FlatButton
                label="キャンセル"
                onClick={this.handleClose}
                style={styles.cancelButton}
              />,
              <FlatButton
                label="実行"
                onClick={this.initOffline}
                style={styles.okButton}
              />,
            ]}
            modal
            open={inPreparation === 2}
          >
            ネットワークがオフになっています。<br />
            オフラインで使用する場合はオフラインセットアップを実行してください。<br />
            ※セットアップには最大５分程度かかる場合があります。
          </Dialog>
        </div>
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const locale = state.locale;
  const title = state.catalyst.title;
  return {
    ...locale, // locale = { locale, messages, funcMasterArray, funcMasterObject }
    title,
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
