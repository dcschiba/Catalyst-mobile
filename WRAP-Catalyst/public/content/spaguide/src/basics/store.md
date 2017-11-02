### Store
Storeはアプリケーションの状態を管理します。Storeはアプリケーションに一つだけ存在します。

#### Storeが使用するモジュール
以下のモジュールを使用します。詳細についてはリンク先を参照してください。

| モジュール            | Version           | 説明           |
| ------------- |-------------|-------------|
| [redux](http://redux.js.org/docs/api/createStore.html)   | ~3.6.0 | Storeを作成します

#### Storeのファイル
Storeのファイルは以下に従って作成してください。

|             | 規約           
| ------------- |-------------
| 配置場所 | `js/store`
| ファイル名 | `configureStore.js`

#### Storeの作成
Storeは以下に従って、作成してください。

以下をインポートします。
```js
import { createStore } from 'redux';
```

同様に、作成済みのReducersをインポートします。
```js
import rootReducer from '../reducers';
```

次に、以下に従って、Storeを作成します。
* `createStore()`にReducersを指定

```js
import { createStore } from 'redux';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
  );
}
```

次に、アプリケーションの状態をStoreに管理させます。

場所はエントリーポイントの`index.js`です。

以下をインポートします。
```js
import { Provider } from 'react-redux';
```

最後に、アプリケーションの状態をStoreに管理させます。
```js
const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```

#### Store → Reducers
StoreはAction Creatorから受け取ったActionと現在管理している状態をReducerに引き渡します。これは、Store作成時にReducersを指定することにより、自動的に行なわれます。

#### Store → React Component
StoreはReducerから受け取った新しい状態をReact Componentに引き渡します。詳細については[React Component](./react_component.md)の`Store → React Component`を参照してください。
