// function checkResult(dirEntory) {
//   // # ディレクトリの中身を表示
//   const directoryReader = dirEntory.createReader();
//   directoryReader.readEntries(
//     fileEntries => fileEntries.forEach(file => console.log(file.name)),
//     error => console.log(error),
//   );
// }


// #5 ローカルサーバーを起動
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

// #4 ディレクトリにコピー
function copyDir(originDirEntory, landingDirEntory) {
  console.log('#4');
  originDirEntory.copyTo(
    landingDirEntory,
    undefined,
    () => launchServer('/data/data/com.wni.wrap/cache/data'),
    (error) => {
      console.log(error);
      launchServer('/data/data/com.wni.wrap/cache/data');
    },
  );
}

// #3 コピーするデータを取得
function getOriginDir(landingDirEntory) {
  console.log('#3');
  window.resolveLocalFileSystemURI(
    `${window.cordova.file.applicationDirectory}/www/data`,
    originDirEntory => copyDir(originDirEntory, landingDirEntory),
    error => console.log(error.code, 'getData failure'),
  );
}

// // #2 すでにキャッシュデータが存在するかチェック
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

// #1 移動先を取得
export const launchLocalServer = () => {
  console.log('#1');
  window.requestFileSystem(
    window.LocalFileSystem.TEMPORARY,
    0,
    LandingDirFS => getOriginDir(LandingDirFS.root),
    error => console.log(error.code, 'getLandingDir failure'),
  );
};
