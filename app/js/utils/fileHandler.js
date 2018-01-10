import AjaxInterceptor from 'ajax-interceptor';

// #init4 ローカルサーバーを起動
function launchServer(landingDirEntory) {
  console.log('#4');
  console.log(landingDirEntory.nativeURL);
  window.cordova.plugins.CorHttpd.startServer(
    {
      www_root: '/data/data/com.wni.wrap/cache/data', // TODO
      port: 50000,
    },
    () => console.log('server startup success'),
    error => console.log(`Launch Server Error: ${error.code}`),
  );
}

// #init3 キャッシュディレクトリにコピー
function copyDir(originDirEntory, landingDirEntory, cb) {
  landingDirEntory.getDirectory('data', { create: true }, (dataDir) => {
    originDirEntory.copyTo(
      dataDir,
      null,
      cb,
      (error) => {
        console.log(error);
        launchServer(landingDirEntory);
      },
    );
  });
}

// #init2 移動先(キャッシュdirectory)を取得
export const getLandingDirEntory = (originDirEntory, cb) => {
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (landingDirEntory) => {
    copyDir(originDirEntory, landingDirEntory, cb);
  });
};

// #init1 コピーするデータを取得
export function launchLocalServer() {
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}/www/data/pri`,
    originDirEntory => getLandingDirEntory(originDirEntory, launchServer),
    error => console.log(error.code, 'getData failure'),
  );
}

// ## prepare1 オフライン用データを取得
export function initOffline(cb) {
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}/www/offline/WRAP`,
    originDirEntory => getLandingDirEntory(originDirEntory, cb),
    error => console.log(error.code, 'getData failure'),
  );
}

// #Overwrite4 データを保存
function writeFile(fileEntry, dataObj) {
  fileEntry.createWriter((fileWriter) => {
    fileWriter.write(dataObj);
  });
}

// #Overwrite3 Pathに沿ってディレクトリを掘る
function createDirectory(rootDirEntry, path, data) {
  if (path.length > 1) {
    const dirName = path.shift();
    rootDirEntry.getDirectory(dirName, { create: true }, (dirEntry) => {
      createDirectory(dirEntry, path, data);
    });
  } else {
    switch (path[0].split('.')[1]) {
      case 'json': {
        console.log('json');
        rootDirEntry.getFile(path[0], { create: true, exclusive: false }, (dirEntry) => {
          const blob = new Blob([data], { type: 'application/json' });
          writeFile(dirEntry, blob);
        }, () => console.log('create error'));
        break;
      }
      case 'png': {
        rootDirEntry.getFile(path[0], { create: true, exclusive: false }, (dirEntry) => {
          const blob = new Blob([data], { type: 'image/png' });
          writeFile(dirEntry, blob);
        }, () => console.log('create error'));
        break;
      }
      case 'tiff': {
        rootDirEntry.getFile(path[0], { create: true, exclusive: false }, (dirEntry) => {
          const blob = new Blob([data], { type: 'image/tiff' });
          writeFile(dirEntry, blob);
        }, () => console.log('create error'));
        break;
      }
      default:
        rootDirEntry.getFile(path[0], { create: true, exclusive: false }, (dirEntry) => {
          const blob = new Blob([data], { type: 'application/json' });
          writeFile(dirEntry, blob);
        }, () => console.log('create error'));
        break;
    }
    console.log('fin');
  }
}

// #Overwrite2 保存先(キャッシュdirectory)を取得
function saveLayerData(path, data) {
  const dirs = path.split('/');
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (dirEntry) => {
    createDirectory(dirEntry, dirs, data);
  });
}

export function xhrHook(actions) {
  /* eslint-disable global-require */
  // #Overwrite1 #Basetime1 通信を監視してURLで引っ掛ける。レイヤーデータおよびBaseTimeの保存をする。
  AjaxInterceptor.addResponseCallback((xhr) => {
    const responseURL = xhr.responseURL;
    if (responseURL.indexOf('wrap-pri') !== -1) {
      // basetime対応
      if (responseURL.indexOf('WX_JP_Lightning_Latest') !== -1) {
        actions.setLightningBasetime('lightningJpBasetime', JSON.parse(xhr.response).created);
      } else if (responseURL.indexOf('WX_KMA_Lightning_Latest') !== -1) {
        actions.setLightningBasetime('lightningKmaBasetime', JSON.parse(xhr.response).created);
      } else if (responseURL.indexOf('WX_JMA_LIDEN_Latest') !== -1) {
        actions.setLightningBasetime('lightningLidenBasetime', JSON.parse(xhr.response).created);
      }
    }
    // オフライン対応
    if (!window.localStorage.getItem('initedOffline')) { return; }

    const element = document.createElement('a');
    element.href = responseURL;
    const path = element.pathname;
    if (
      responseURL.indexOf('JMA_Warn') !== -1
      || responseURL.indexOf('WarnRankMaster') !== -1
      || responseURL.indexOf('JMA_ANLSIS_PRCINT') !== -1
      || responseURL.indexOf('WRAP/wrap-pri/data/WX_JMA_Amedas') !== -1
      || responseURL.indexOf('catalyst/contents/WX_WNI_COMPASS_HOUR') !== -1
    ) {
      saveLayerData(`data${path}`, xhr.response);
    }
  });
  AjaxInterceptor.wire();
}
