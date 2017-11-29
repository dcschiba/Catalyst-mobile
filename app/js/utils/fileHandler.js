
function writeFile(fileEntry, dataObj) {
  fileEntry.createWriter((fileWriter) => {
    // fileWriter.onwriteend = () => { console.log('Successful file read...'); };
    // fileWriter.onerror = (e) => { console.log(`Failed file read: ${e.toString()}`); };
    fileWriter.write(dataObj);
  });
}

function createDirectory(rootDirEntry, path, fileName, data) {
  if (path.length > 0) {
    const dirName = path.shift();
    rootDirEntry.getDirectory(dirName, { create: true }, (dirEntry) => {
      createDirectory(dirEntry, path, fileName, data);
    });
  } else {
    const fileInfo = fileName.split('.');
    switch (fileInfo[1]) {
      case 'json':
        rootDirEntry.getFile(fileName, { create: true, exclusive: false }, (dirEntry) => {
          const blob = new Blob([JSON.stringify(data)], { type: 'text/plain' });
          writeFile(dirEntry, blob);
        }, () => alert('create error'));
        break;
      default:
    }
  }
}

export const getFile = (path) => {
  fetch(`https://pt-wrap01.wni.co.jp/${path}`, {
    method: 'GET',
  })
  .then(res => res.json())
  .then((data) => {
    const dirs = path.split('/');
    const fileName = dirs.pop();
    window.resolveLocalFileSystemURL(window.cordova.file.cacheDirectory, (dirEntry) => {
      createDirectory(dirEntry, dirs, fileName, data);
    });
  }).catch();
};
