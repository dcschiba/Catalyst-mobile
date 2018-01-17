import AjaxInterceptor from 'ajax-interceptor';

// #init4 ローカルサーバーを起動
function launchServer(landingDirEntory) {
  console.error('launchServer1');
  console.error(landingDirEntory);
  window.cordova.plugins.CorHttpd.startServer(
    {
      www_root: '/data/data/com.wni.wrap/cache/data', // TODO
      port: 50000,
    },
    () => console.error('server startup success'),
    error => console.error(`Launch Server Error: ${error.code}`),
  );
  console.error('launchServer2');
}

// #init3 キャッシュディレクトリにコピー
function copyDir(originDirEntory, landingDirEntory, cb) {
  console.error('copyDir1', originDirEntory, landingDirEntory, cb);

  landingDirEntory.getDirectory('data', { create: false },
    (dataDir) => {
      console.error('dataDir', dataDir);
      originDirEntory.copyTo(
        dataDir,
        null,
        cb,
        (error) => {
          console.error(error);
          launchServer(landingDirEntory);
        },
      );
    },
    (fail) => {
      console.error('fail', fail);
    },
  );
  console.error('copyDir2');
}

// #init2 移動先(キャッシュdirectory)を取得
export const getLandingDirEntory = (originDirEntory, cb) => {
  console.error('getLandingDirEntory1', originDirEntory, cb);
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (landingDirEntory) => {
    console.error('landingDirEntory', landingDirEntory);
    copyDir(originDirEntory, landingDirEntory, cb);
  });
  console.error('getLandingDirEntory2');
};

// #init1 コピーするデータを取得
export function launchLocalServer() {
  console.error('launchLocalServer1');
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}/www/data/pri`,
    (originDirEntory) => {
      console.error('originDirEntory', originDirEntory, launchServer);
      getLandingDirEntory(originDirEntory, launchServer);
    },
    error => console.log(error.code, 'getData failure'),
  );
  console.error('launchLocalServer2');
}

// ## prepare1 オフライン用データを取得
export function initOffline(cb) {
  console.error('initOffline1', cb);
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}/www/offline/WRAP`,
    (originDirEntory) => {
      console.error('originDirEntory', originDirEntory);
      getLandingDirEntory(originDirEntory, cb);
    },
    error => console.log(error.code, 'getData failure'),
  );
  console.error('initOffline2');
}

// #Overwrite4 データを保存
function writeFile(fileEntry, dataObj) {
  console.error('writeFile1', fileEntry, dataObj);
  fileEntry.createWriter((fileWriter) => {
    console.error('fileEntry.createWriter', fileWriter);
    fileWriter.write(dataObj);
  });
  console.error('writeFile2');
}

// #Overwrite3 Pathに沿ってディレクトリを掘る
function createDirectory(rootDirEntry, path, data) {
  console.error('createDirectory1', rootDirEntry, path, data);
  if (path.length > 1) {
    console.error('createDirectory3');
    const dirName = path.shift();
    rootDirEntry.getDirectory(dirName, { create: true }, (dirEntry) => {
      console.error('rootDirEntry.getDirectory', dirEntry);
      createDirectory(dirEntry, path, data);
    });
  } else {
    console.error('createDirectory4');
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
  console.error('createDirectory2');
}

// #Overwrite2 保存先(キャッシュdirectory)を取得
function saveLayerData(path, data) {
  console.error('saveLayerData1', path, data);
  console.error(window.cordova.file);
  const dirs = path.split('/');
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (dirEntry) => {
    console.error(dirEntry);
    createDirectory(dirEntry, dirs, data);
  });
  console.error('saveLayerData2');
}

export function xhrHook(actions) {
  console.error('xhrHook1');
  /* eslint-disable global-require */
  // #Overwrite1 #Basetime1 通信を監視してURLで引っ掛ける。レイヤーデータおよびBaseTimeの保存をする。
  AjaxInterceptor.addResponseCallback((xhr) => {
    console.error('addResponseCallback1', xhr);
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
      responseURL.indexOf('WRAP/wrap-pri/data/JMA_Warn') !== -1
      || responseURL.indexOf('WarnRankMaster') !== -1
      || responseURL.indexOf('JMA_ANLSIS_PRCINT') !== -1
      || responseURL.indexOf('WRAP/wrap-pri/data/WX_JMA_Amedas') !== -1
      || responseURL.indexOf('catalyst/contents/WX_WNI_COMPASS_HOUR') !== -1
    ) {
      saveLayerData(`data${path}`, xhr.response);
    }
  });
  console.error('xhrHook2');
  AjaxInterceptor.wire();
  console.error('xhrHook3');
}
