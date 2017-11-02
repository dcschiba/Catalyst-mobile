### Define
webpackの提供する[DefinePlugin](https://webpack.github.io/docs/list-of-plugins.html#defineplugin)を利用することで、開発/本番で出力するコードを分けることができます。

#### 実装方法
提供しているボイラープレートはDefinePluginが設定済みのため、環境変数`process.env.NODE_ENV`の値で開発/本番を判別することができます。  
開発/本番でそれぞれ実行したいコードを以下のように記載します。

* 開発
```js
if (process.env.NODE_ENV === 'development') {
    console.log('development mode'); // 開発時のみ実行したいコードを記載
}
```

* 本番
```js
if (process.env.NODE_ENV === 'production') {
    console.log('production mode'); // 本番時のみ実行したいコードを記載
}
```

ビルド時に「process.env.NODE_ENV」の値が「development/production」に代替され、ifがfalseとなる場合は、
ビルド時にwebpackがif文の中身ごとコードを削除するため、コード実行時に都度if文が評価されたり、不要なコードがリリースモジュールに含まれることはありません。  
※ifがtrueの場合は、if文のみwebpackによって削除されます。  

開発/本番の切り替えは[アプリのビルド/リリース](../advance/release.md)をご参照ください。