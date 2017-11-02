### Reducers
Reducersはアプリケーションの新しい状態を作成します。作成した新しい状態はStoreに引き渡します。

#### Reducersが使用するモジュール
以下のモジュールを使用します。詳細についてはリンク先を参照してください。

| モジュール            | Version           | 説明           |
| ------------- |-------------|-------------|
| [redux-actions](https://github.com/acdlite/redux-actions)   | ~1.1.0 | Action Creator / Reducerを作成します
| [redux](http://redux.js.org/docs/api/combineReducers.html)   | ~3.6.0 | Reducerを纏めます

#### Reducerのファイル
Reducerのファイルは以下に従って作成してください。

|             | 規約           
| ------------- |-------------
| 配置場所 | js/reducers
| Reducerのファイル名 | Reducerの名前 + .js
| Reducerの統合ファイル名 | index.js

#### Reducerの作成
Reducerは以下に従って、作成してください。

以下をインポートします。
```js
import { handleActions } from 'redux-actions';
```

同様に、作成済みのActionのタイプ値をインポートします。
```js
import { ADD_TODO, COMPLETE_TODO } from '../constants/ActionTypes';
```

次に、以下に従って、Reducerを作成します。

* Reducerの名前は状態の内容がわかるようにしてください。e.g.`todos`
* Reducerのプロパティには先ほどのActionのタイプ値を指定します。e.g. `ADD_TODO`
* `function`はActionのタイプ値に応じた処理を行ないます。

以下は禁止事項です。
* Storeから受け取った状態を変更してはいけません。  
  `state`はStoreが管理していますので、読み取り専用です。
* WebAPIのような外部処理を呼び出しをしてはいけません。  
* 結果が一意にならないような処理をしてはいけません。e.g. Date.now()  
Reducerは与えられた値に対して、毎回同じ結果を返してください。

```js
const initialState = [];

export default handleActions({
   // 前回のstate, actionは自動的に設定されます
  [ADD_TODO]: (state, action) => [
    // 新しい状態をStoreに引き渡します
    ...state,
    {
      id: action.payload.id,
      text: action.payload.text,
      completed: false,
    },
  ],

  [COMPLETE_TODO]: (state, action) =>
    state.map(todo => (todo.id === action.payload ?
      Object.assign({}, todo, { completed: !todo.completed }) : todo),
    ),
}, initialState);
```

#### Reducerの統合
Reducerは`redux`の`combineReducers()`を使用し、Reducerの統合ファイルに纏めてください。

```js
const todos = ...
const visibilityFilter = ...

const rootReducer = combineReducers({
  visibilityFilter,
  todos,
})

export default rootReducer;
```

#### Reducers → Store
Reducerが作成した新しい状態をStoreに引き渡します。これは、Storeを作成する際に、Reducerを指定することにより、自動的にStoreに引き渡されます。詳細については、[Store](./store.md)を参照してください。
