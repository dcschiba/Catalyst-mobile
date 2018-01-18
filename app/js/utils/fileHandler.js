import AjaxInterceptor from 'ajax-interceptor';

// #init4 ローカルサーバーを起動
function launchServer(landingDirEntry, error) {
  const root = landingDirEntry.nativeURL.replace('file://', '');

  console.log('root directory', root);
  window.cordova.plugins.CorHttpd.startServer(
    {
      www_root: root,
      port: 50000,
      localhost_only: true,
    },
    url => console.log('server startup success2', url),
    error,
  );
}

function copy(srcEntry, destEntry, success, error) {
  srcEntry.copyTo(destEntry, null, (entry) => {
    console.log('copy success', srcEntry, destEntry);
    success(entry);
  }, (ex) => { console.error(ex); error(ex); });
}

// #init3 キャッシュディレクトリにコピー
function copyDir(orgEntry, landingDirEntry, callback, error) {
  landingDirEntry.getDirectory('data', { create: true }, (entryDir) => {
    console.error('entryDir', entryDir);

    const reader = entryDir.createReader();

    reader.readEntries(
      (entries) => {
        const targetEntry = entries.find(item =>
          item.name === orgEntry.name && item.isDirectory === orgEntry.isDirectory);
        console.error('targetEntry', targetEntry);

        // 既存なしの場合、そのままコピーする
        if (!targetEntry) {
          console.log('既存なし');
          copy(orgEntry, entryDir, () => callback(entryDir), error);
          return;
        }
        console.log('既存あり');

        if (targetEntry.isDirectory) {
          console.log('Directory');
          // 既存ありの場合、削除してからコピーする
          targetEntry.removeRecursively(() => {
            copy(orgEntry, entryDir, () => callback(entryDir), error);
          }, error);
        } else {
          console.log('File');
          targetEntry.remove(() => {
            copy(orgEntry, entryDir, () => callback(entryDir), error);
          }, error);
        }
      },
    );
  }, error);
}

// #init2 移動先(キャッシュdirectory)を取得
export const getLandingDirEntry = (originDirEntry, callback, error) => {
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory,
    cacheEntry => copyDir(originDirEntry, cacheEntry, callback, error),
    error,
  );
};

// #init1 コピーするデータを取得
export function launchLocalServer(error) {
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}/www/data/pri`,
    (originDirEntry) => {
      console.error('originDirEntory', originDirEntry, launchServer);
      getLandingDirEntry(originDirEntry, launchServer);
    },
    error,
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
  }
}

// #Overwrite2 保存先(キャッシュdirectory)を取得
function saveLayerData(path, data) {
  const dirs = path.split('/');
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (cacheEntry) => {
    createDirectory(cacheEntry, dirs, data);
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
      responseURL.indexOf('WRAP/wrap-pri/data/JMA_Warn') !== -1
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
