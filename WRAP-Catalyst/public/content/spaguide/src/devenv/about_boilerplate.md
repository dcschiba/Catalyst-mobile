### ディレクトリ構成
当ガイドが推奨するSPAプロジェクトのディレクトリ構成を説明します。当ガイドが提供するボイラープレートはこちらの構成に従って作成しています。

```
project-name
├── dist
├── img
├─┬ js
│ ├── actions
│ ├── components
│ ├── constants
│ ├── containers
│ ├── middleware
│ ├── reducers
│ └── store
├── pri
├── style
├── test
├── .babelrc
├── .eslintignore
├── .eslintrc
├── .istanbul.yml
├── index.html
├── index.jsx
├── package.json
├── server.js
├── webpack-production.config.js
└── webpack.config.js
```

以下に各ディレクトリの概要を記載します。追加開発が必要となっている項目はアプリケーションの開発時に作成する必要がある項目です。任意となっている項目は、必要に応じて追加する項目です。最後に不要となっている項目は追加、修正が不要な項目です。

|       | 追加開発 | 説明 |
| ---------------- |:-------------:|-------------|
|dist | 不要 | リリース用のファイルが出力されます。リリース用のファイルはWebpackにより、自動的に作成されます。
|js - actions |	必要 |	Action Creatorsを配置します。
|js - components | 必要|React Componentのプレゼンテーショナルコンポーネントを配置します。
|js - constants|必要|定数ファイルを配置します。
|js - containers|必要|React Componentのコンテナーコンポーネントを配置します。
|js - middleware|必要|Middlewareを配置します。
|js - reducers|必要|Reducersを配置します。
|js - store|必要|Storeを配置します。
|pri|任意|開発用のjsonデータなどを配置します。
|style|必要|React Componentのスタイル（css）を配置します。
|test|必要|単体テストコードを配置します。
|.babelrc|不要|Babelの設定フ  ァイルです。
|.eslintignore|任意|ESLintの対象外を設定するファイルです。
|.eslintrc|任意|ESLintの設定ファイルです。
|.istanbul.yml|不要|istanbulの設定ファイルです。
|index.html|必要|アプリケーションのページです。アプリケーションのタイトル名を設定してください。
|index.jsx|任意|アプリケーションのエントリーポイントです。
|package.json|任意|モジュールのパッケージ管理ファイルです。モジュールを追加する場合は、こちらに追記します。
|server.js|不要|開発用のサーバー起動スクリプトです。
|webpack-production.config.js|任意|本番用のWebpackの設定ファイルです。タスクを追加する場合は、こちらに追記します。
|webpack.config.js|任意|開発用のWebpackの設定ファイルです。タスクを追加する場合は、こちらに追記します。