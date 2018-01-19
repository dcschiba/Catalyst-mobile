import AjaxInterceptor from 'ajax-interceptor';

const resolveURL = filePath => new Promise((resolve, reject) => {
  window.resolveLocalFileSystemURL(filePath,
    fileEntry => resolve(fileEntry),
    error => reject(error),
  );
});

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
          copy(orgEntry, entryDir, entry => callback(entryDir, entry), error);
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
            copy(orgEntry, entryDir, entry => callback(entryDir, entry), error);
          }, error);
        }
      },
    );
  }, error);
}

const getFileSize = (entry) => {
  if (entry.isFile) {
    return new Promise((resolve, reject) => {
      entry.getMetadata(f => resolve(f.size), error => reject(error));
    });
  }

  if (entry.isDirectory) {
    return new Promise((resolve, reject) => {
      const dirReader = entry.createReader();
      dirReader.readEntries((entries) => {
        Promise.all(entries.map(e => getFileSize(e))).then((size) => {
          const dirSize = size.reduce((prev, current) => prev + current, 0);
          resolve(dirSize);
        }).catch(err => reject(err));
      },
      error => reject(error));
    });
  }
  return 0;
};

const dirSize = dirEntry => getFileSize(dirEntry);

export const checkOffline = (callback) => {
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.cacheDirectory}/data/WRAP`,
    dirEntry => dirSize(dirEntry).then((size) => {
      console.error('size', size);
      callback(size);
    }),
    (error) => { console.error('resolveLocalFileSystemURL error', error); callback(0); },
  );
};

// #init2 移動先(キャッシュdirectory)を取得
export const getLandingDirEntry = (originDirEntry, callback, error) => {
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory,
    cacheEntry => copyDir(originDirEntry, cacheEntry, callback, error),
    error,
  );
};

const countFiles = entry => new Promise((resolve, reject) => {
  if (entry.isDirectory) {
    entry.createReader().readEntries((entries) => {
      if (entries.length === 0) {
        resolve(0);
        return;
      }

      Promise.all(entries.map(item => countFiles(item)))
        .then((files) => {
          const count = files.reduce((prev, current) => prev + current, 0);
          resolve(count);
        })
        .catch(err => reject(err));
    });

    return;
  }
  resolve(1);
});

const checkFiles = dirEntry => countFiles(dirEntry);

const checkConfig = () => new Promise((resolve, reject) => {
  const filePath = `${window.cordova.file.cacheDirectory}/data/pri`;

  resolveURL(filePath)
    .then(fileEntry => checkFiles(fileEntry))
    .then((fileCount) => {
      console.error('Total file count', fileCount);
      resolve(fileCount !== 0);
    })
    .catch(err => reject(err));
});

const initConfig = () => new Promise((resolve, reject) => {
  const filePath = `${window.cordova.file.applicationDirectory}/www/data/pri`;

  resolveURL(filePath)
    .then((fileEntry) => {
      getLandingDirEntry(fileEntry, launchServer);
    })
    .catch(err => reject(err));
});

// #init1 コピーするデータを取得
export function launchLocalServer() {
  checkConfig()
    .then((success) => {
      if (success) {
        return;
      }

      initConfig();
    })
    .catch((err) => { console.log('launchLocalServer', err); });
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
