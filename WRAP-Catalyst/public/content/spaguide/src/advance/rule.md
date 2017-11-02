### 開発規約
WRAP Application開発では、react/reduxのルールやWRAPで定めた標準により、開発規約を設けています。

開発者は以下の規約に則って開発を行ってください。

#### 命名規則
ファイルを作成する際は、以下のルールに従って命名してください。   
また、それぞれの処理内容を表す名前を付けるようにしてください。

|ファイルの種類|命名規則|拡張子|作成例        |
|-------------|:-------:|:-----:|--------------|
|actions      |LCC    |.js  |menuAction.js |
|components   |UCC    |.jsx |TodoList.jsx  |
|constants    |UCC    |.js  |ActionTypes.js|   
|containers   |UCC    |.jsx |App.jsx       |
|middleware   |LCC    |.js  |worldMap.js   |
|reducers     |LCC    |.js  |todos.js      |       

UCC:アッパーキャメルケース   
LCC:ローワーキャメルケース

ディレクトリ構成については以下のページを参照してください。
* [ボイラープレートについて](../devenv/about_boilerplate.md)

#### コンポーネント

##### コンポーネントファイルの単位

1つのコンポーネントに対して1ファイルを作成してください。

##### プレゼンテーショナルコンポーネント

プレゼンテーショナルコンポーネントは、共通利用するためにできるだけ汎用的に作成してください。

##### コンポーネントのstate管理

コンポーネントの状態(state)はStoreのみで管理を行うため、コンテナーや親コンポーネントなどで状態を管理しないようにしてください。

##### exportの位置

exportはファイルの最下部で行うようにしてください。

正
```
import React, { Component } from 'react';
class AddTodo extends Component {
    ・・・    
}
export default Todo;
```

誤
```
import React, { Component } from 'react';
export default class Todo extends Component{
    ・・・
}
```

#### reducer

##### stateの更新
Storeから受け取ったstateは直接変更せず、objectをコピーして、変更したコピーをreturnするようにしてください。  

正
```
[ADD_TODO]: (state, action) => [
   ...state,
   {
     id: action.payload.id,
     text: action.payload.text,
     completed: false,
   },
],
```

誤
```
[ADD_TODO]: (state, action) => {
  state.push({
    id: action.payload.id,
    text: action.payload.text,
    completed: false,
  });
  return state;
},
```

##### reducerの役割

reducerはStoreの更新のみを行うようにしてください。

また、結果が一意にならないような処理を避け、与えられた値に対して毎回同じ値を返すようにしてください。


#### 通信処理

##### 外部APIとの通信
外部API等との通信処理はMiddlewareとして作成してください。