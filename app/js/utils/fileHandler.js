import AjaxInterceptor from 'ajax-interceptor';

// function checkResult(dirEntory) {
//   // # ディレクトリの中身を表示
//   const directoryReader = dirEntory.createReader();
//   directoryReader.readEntries(
//     fileEntries => fileEntries.forEach(file => console.log(file.name)),
//     error => console.log(error),
//   );
// }


// #init5 ローカルサーバーを起動
function launchServer(path) {
  window.cordova.plugins.CorHttpd.startServer(
    {
      www_root: path,
      port: 50000,
    },
    () => console.log('server startup success'),
    error => console.log(`Launch Server Error: ${error.code}`),
  );
}

// #init4 ディレクトリにコピー
function copyDir(originDirEntory, landingDirEntory) {
  console.log('#4');
  originDirEntory.copyTo(
    landingDirEntory,
    undefined,
    () => launchServer('/data/data/com.wni.wrap/cache/data'),
    () => {
      console.log(landingDirEntory);
      launchServer('/data/data/com.wni.wrap/cache/data');
    },
  );
}

// #init3 コピーするデータを取得
function getOriginDir(landingDirEntory) {
  console.log('#3');
  window.resolveLocalFileSystemURL(
    `${window.cordova.file.applicationDirectory}/www/data/`,
    originDirEntory => copyDir(originDirEntory, landingDirEntory),
    error => console.log(error.code, 'getData failure'),
  );
}

// // #init2 すでにキャッシュデータが存在するかチェック
// function checkExistCache(landingDirEntory) {
//   const directoryReader = landingDirEntory.createReader();
//   directoryReader.readEntries(
//     // (fileEntries) => {
//     //   if (fileEntries.length !== 0) {
//     //     // 存在する場合、ローカルサーバーを起動 → #5
//     //     launchServer();
//     //   } else {
//     //     // 存在しない場合、アプリのデータからコピーする → #3
//     //     getOriginDir(landingDirEntory);
//     //   }
//     // },
//     getOriginDir(landingDirEntory),
//     error => console.log(error.code, 'show failure'),
//   );
// }

// #init1 移動先を取得
export const launchLocalServer = () => {
  window.requestFileSystem(
    window.LocalFileSystem.TEMPORARY,
    0,
    LandingDirFS => getOriginDir(LandingDirFS.root),
    error => console.log(error.code, 'getLandingDir failure'),
  );
};


function writeFile(fileEntry, dataObj) {
  fileEntry.createWriter((fileWriter) => {
    // fileWriter.onwriteend = () => { console.log('Successful file read...'); };
    // fileWriter.onerror = (e) => { console.log(`Failed file read: ${e.toString()}`); };
    fileWriter.truncate(0);
    fileWriter.write(dataObj);
  });
}

function createDirectory(rootDirEntry, path, data) {
  if (path.length > 1) {
    const dirName = path.shift();
    rootDirEntry.getDirectory(dirName, { create: true }, (dirEntry) => {
      createDirectory(dirEntry, path, data);
    });
  } else {
    switch (path[0].split('.')[1]) {
      case 'json':
        rootDirEntry.getFile(path, { create: true, exclusive: false }, (dirEntry) => {
          const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
          writeFile(dirEntry, blob);
        }, () => console.log('create error'));
        break;
      default:
    }
  }
}

function saveLayerData(path, data) {
  const dirs = `data${path}`.split('/');
  window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (dirEntry) => {
    createDirectory(dirEntry, dirs, data);
  });
}

export function xhrHook() {
  /* eslint-disable global-require */
  AjaxInterceptor.addResponseCallback((xhr) => {
    console.log(xhr);
    if (xhr.responseURL.indexOf('wni.co.jp/WRAP/wrap-pri/data') !== -1) {
      saveLayerData(xhr.responseURL.split('wni.co.jp')[1].split('?')[0], xhr.response);
    }
  });
  AjaxInterceptor.wire();
}
