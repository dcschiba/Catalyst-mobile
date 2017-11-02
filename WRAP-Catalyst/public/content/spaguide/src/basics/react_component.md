### React Component
React ComponentはUIの表示、イベントの受け付けをします。

#### React Componentが使用するモジュール
以下のモジュールを使用します。詳細についてはリンク先を参照してください。

| モジュール            | Version           | 説明           |
| ------------- |-------------|-------------|
| [react、react-dom](https://github.com/facebook/react)   | ~15.4.1 | UIライブラリを提供します
| [redux](https://github.com/rackt/redux)   | ~3.6.0 | アプリケーションの状態を管理します
| [react-redux](https://github.com/rackt/react-redux)   | ~4.4.6 | ReactとReduxを連携します

#### コンポーネントの区別
コンポーネントは役割を分けるため、コンテナーとプレゼンテーショナルに区別して作成してください。それぞれの違いは以下のとおりです。

|  | コンテナー | プレゼンテーショナル |
| ------------- |-------------|-------------|
| 使用場所 | トップレベルの親コンポーネント | 子コンポーネント |
| Reduxとの依存 | 有り | 無し |
| データの変更 | Action Creator | propsの関数 |
| データの読み込み | Store | propsのデータ |

#### ファイル単位
1コンポーネントに1ファイル作成してください。

#### 配置場所
コンポーネントの役割に分けて、以下に配置してください。

|  | コンテナー | プレゼンテーショナル |
| ------------- |-------------|-------------|
| 配置場所 | js/container | js/component |

#### ファイル名
`コンポーネント名` + `.js`で作成してください。

#### コンポーネント名
コンポーネントを表す名前をアッパーキャメルケースで作成してください。

e.g `Header.js`

#### コンポーネントの定義
以下の場合は`Class`を使用してコンポーネントを作成してください。

* `state`を持つ
* `refs`を使用する
* `render()`以外のライフサイクルメソッドを使用する
* コンポーネントがコンテナーコンポーネントである

e.g
```js
class AddTodo extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const node = this.input;
    const text = node.value.trim();

    if (text === '') {
      return false;
    }

    this.props.onAddClick(text);
    node.value = '';
    return true;
  }

  render() {
    return (
      <div>
        <input
          className={css.input}
          type="text"
          ref={(c) => { this.input = c; }}
          placeholder="タスクを入力してください"
        />
        <button className={css.btn} onClick={this.handleClick}>
          +
        </button>
      </div>
    );
  }
}
```

上記以外の場合はStateless Functionとしてコンポーネントを作成してください。`function`はアローファンクションとして作成します。

e.g
```js
const Todo = (props) => {
  const titleClassName = cx({
    title: true,
    completed: props.completed,
  });

  return (
    <li className={css.item}>
      <input
        id="todo_checkbox"
        className={css.toggle}
        onChange={props.onChange}
        type="checkbox"
        checked={props.completed}
      />
      <label htmlFor="todo_checkbox" className={titleClassName}>{props.text}</label>
    </li>
  );
};
```

#### コンポーネントの共通利用
プレゼンテーショナルコンポーネントは共通利用することを意識して作成してください。共通利用出来るコンポーネントは同じようなコンポーネントを作成することを回避し、開発コストを抑えることに繋がります。

#### 状態管理
コンポーネントの状態管理はStoreで行なうため、親コンポーネントであっても、状態管理はしないでください。

### Reduxとの連携

#### React Component → Action Creators
UIの操作により、アプリケーションの状態を変更するには、Action Creatorsを呼び出す必要があります。これを実現させるために、以下に従い、React ComponentからAction Creatorを呼び出せるようにしてください。  

コンテナーコンポーネントで以下をインポートします。
```js
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
```

同様に、Action Creatorをインポートします。  
```js
import * as TodoActions from '../actions';
```

次に、`mapDispatchToProps()`を作成してください。`bindActionCreators()`でAction Creatorと引数の`dispatch`をバインドさせます。これにより、Action Creatorが作成するActionが自動的にStoreに送信されます。
```js
// dispatchはreduxにより、自動的に設定されます
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch),
  }
}
```

コンテナーコンポーネントと`mapDispatchToProps()`を接続します。
```js
export default connect(
  null,
  mapDispatchToProps,
)(App)
```
`App`はコンテナーコンポーネントです。

これにより、コンテナーコンポーネントは`props`を通して、Action Creatorを呼び出せます。
```js
class App extends Component {
  render() {
    const { actions } = this.props;
    return (
      <div>
        <AddTodo
          onAddClick={ text => actions.addTodo(text) } />
      </div>
    );
  }
}
```

#### Store → React Component
アプリケーションの状態はStoreで管理されます。そのデータをReact Componentで使用するにはStoreからデータを取得します。これを実現させるために、以下に従い、React ComponentからStoreのデータを使用出来るようにしてください。

コンテナーコンポーネントで以下を`import` します。
```js
import { connect } from 'react-redux';
```

次に、`mapStateToProps()`を作成してください。コンポーネントに必要なデータをStoreから取得してください。

```js
// stateはStoreで管理されている状態です
// 引数にはReduxにより、自動的に設定されます
function selectTodos(todos, filter) {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(todo => todo.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(todo => !todo.completed);
    default:
      return null;
  }
}

function mapStateToProps(state) {
  return {
    visibleTodos: selectTodos(state.todos, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
  };
}

```

コンテナーコンポーネントと`mapStateToProps()`を接続します。
```js
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
```

これにより、コンテナーコンポーネントはpropsを通して、Storeで管理されているデータを使用出来ます。

```js
class App extends Component {
  render() {
    const { visibleTodos, visibilityFilter } = this.props;
    
    return (
      <div>
        <TodoList
          todos={visibleTodos} />
        <Footer
          filter={visibilityFilter} />
      </div>
    );
  }
}
```
