### Router
通常、SPAの画面遷移にはRouterが使用されます。それにより、ブラウザのブックマークや戻る、進む機能を使用することが出来ます。ここでは、Routerの実装方法について説明します。

#### サンプルアプリケーション
Routerの説明にサンプルアプリケーションを使用しています。  
実行方法は以下のとおりです。
```
cd examples/router
npm install
npm run dev
```

ブラウザにアクセス  
`http://localhost:3000`

#### Routerで使用するモジュール
以下のモジュールを使用します。詳細についてはリンク先を参照してください。

| モジュール            | Version           | 説明           
| ------------- |-------------|-------------|
| [react-router](https://github.com/rackt/react-router)   | ~3.0.0 |ルーティングライブラリ
| [react-router-redux](https://github.com/rackt/react-router-redux)   | ~4.0.7      |react-routerのStateをreduxで管理します

#### ブラウザの履歴管理
ブラウザの履歴管理にはハッシュと、通常のパスを選択することができます。

| モジュール            | URL例           |作成 |
| ------------- |-------------|-------------|
| ハッシュ   | example.com/#/some/path | hashHistory |
| 通常のパス   | example.com/some/path      | browserHistory |

通常のパスを使用する場合、いずれのURLにアクセスされた際もSPAのモジュール（index.html/bundle.js）が返却されるように、サーバ側に設定が必要になります。

#### Routerの作成
アプリケーションのエントリーポイントにRouterを作成します。
* js/index.jsx

※「通常のパス」を使用する場合、「hashHistory」の部分は「browserHistory」に置き換えてください。
```js
const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);
```

```html
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={history}>
        <Route path="/" component={App}>
          {/* デフォルトコンテンツ */}
          <IndexRoute component={One} />
          {/* コンテンツ */}
          <Route path="one" component={One} />
          <Route path="two" component={Two} />
          <Route path="three" component={Three} />
          {/* 存在しないパスの場合に表示するコンテンツ */}
          <Route path="*" component={One} />
        </Route>
      </Router>
    </MuiThemeProvider>
  </Provider>,

```

Middlewareにrouterを登録します。
* js/store/configureStore.js

※「通常のパス」を使用する場合、「hashHistory」の部分は「browserHistory」に置き換えてください。
```js
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(hashHistory), createLogger()),
  );
```

#### Reducerの作成
Router用のReducerを作成します。
* js/reducers/index.js

```js
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  routing: routerReducer,
});
```
