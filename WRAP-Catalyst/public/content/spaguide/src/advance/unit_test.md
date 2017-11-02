### 単体テスト

#### 単体テストで使用するモジュール
以下のモジュールを使用します。詳細についてはリンク先を参照してください。

| モジュール            | Version           | 説明           |
| ------------- |-------------|-------------|
| [mocha](https://mochajs.org/)   | ~3.2.0 |テストフレームワークです。
| [chai](http://chaijs.com/)   | ~3.5.0 |アサーションを提供するライブラリです。
| [sinon](http://sinonjs.org/)   | ~1.17.6 |モックを提供するライブラリです。
| [istanbul](https://github.com/gotwarlost/istanbul)   | ~1.0.0-alpha.2 |カバレッジを計測するツールです。

#### サンプルアプリケーション
単体テストの説明にサンプルアプリケーションを使用しています。  
実行方法は以下のとおりです。
```
cd examples/unit_test
npm install
npm run dev
```

#### 単体テストの実行
当ガイドが提供するボイラプレートを使用している場合、以下のコマンドで単体テストを実行出来ます。

```
npm run test
```

また、以下のコマンドにより、変更を検知し、自動的にテストを行なうことも出来ます。

```
npm run test:watch
```

#### カバレッジの計測
当ガイドが提供するボイラプレートを使用している場合、以下のコマンドでカバレッジを計測出来ます。

```
npm run test:cover
```

カバレッジのレポートはプロジェクト直下の`coverage/lcov-report`に出力されます。


### React Componentの単体テスト
React ComponentはUIの確認のため、DOMをエミュレートして単体テストを実施します。

#### サンプルアプリケーション
単体テストの説明にサンプルアプリケーションを用意しています。  
実行方法は以下のとおりです。
```
cd examples/unit-test
npm install
npm run test:watch
```

#### 単体テストで使用するモジュール
以下のモジュールを使用します。詳細についてはリンク先を参照してください。

| モジュール            | Version           | 説明           |
| ------------- |-------------|-------------|
| [react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html)   | ~15.4.1 | コンポーネントをテストするためのAPIを提供します
| [jsdom](https://github.com/tmpvar/jsdom)   | ~9.8.3 | node上でDOM環境を提供します

#### テストファイル
コンポーネントのテストファイルは以下に従って作成してください。

|             | 規約           
| ------------- |-------------
| 配置場所 | `test/components`
| ファイル名 | `コンポーネント名` + `.spec.js`

#### テスト準備
コンポーネントのテストにはブラウザが必要になります。以下に従って仮想のブラウザを作成します。なお、当ガイドが提供するボイラープレートを使用する場合には事前に準備されています。

`test`ディレクトリに`setup.js`を作成します。
```js
import { jsdom } from 'jsdom';
import 'css-modules-require-hook/preset';

global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
```
#### テストサンプル
コンポーネントのテストを以下のように実装します。

e.g  
コンポーネント : js/components/Todo
テストファイル : js/components/Todo.spec.js
```js
import { expect } from 'chai';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
// テスト対象のコンポーネント
import Todo from '../../js/components/Todo';

// コンポーネントのテスト準備をします
function setup(propOverrides) {

  // コンポーネントのデフォルトプロパティを設定します
  // 必要に応じてpropOverridesでプロパティを上書きます
  const props = Object.assign({
    text: '',
    completed: false,
    onChange: sinon.spy(),
  }, propOverrides);

  // コンポーネントをレンダリングします
  const renderer = TestUtils.createRenderer();
  renderer.render(<Todo {...props} />);
  const output = renderer.getRenderOutput();

  return {
    props: props,
    output: output,
  };
}

describe('Component', () => {
  describe('Todo', () => {
    it('レンダリングされること', () => {
      const { output } = setup();
      expect(output.type).to.equal('li');

      const [ itemToggle, itemLabel ] = output.props.children;
      expect(itemToggle.type).to.equal('input');
      expect(itemLabel.type).to.equal('label');
    });

    it('パラメータ確認', () => {
      const propText = 'Test Text';
      const propCompleted = true;
      const { output } = setup({
        text: propText,
        completed: propCompleted,
      });

      const [itemToggle, itemLabel] = output.props.children;
      const text = itemLabel.props.children;
      expect(text).to.equal(propText);

      const completed = itemToggle.props.checked;
      expect(completed).to.equal(propCompleted);
    });

    it('functionの呼び出し確認', () => {
      const propOnChange = sinon.spy();
      const { output } = setup({
        onChange: propOnChange,
      });

      const [itemToggle] = output.props.children;
      itemToggle.props.onChange();
      expect(propOnChange.calledOnce).to.be.true;
    });
  });
});
```
「describe」がテストの分類、「it」がテストの1ケースに該当します。  
Componentの場合、「想定通りのDOMが出力されているか」、「受け取ったパラメータ（props）を正しく扱えているか」、「受け取ったfunctionを正しく実行できているか」の観点でテストコードを記載します。  
ダミーのfunctionは「sinon」を使って作成してください。  
各テストの結果はchaiの提供する「expect」を使ってチェックすることができます。

#### Containerコンポーネントの単体テスト
ContainerコンポーネントはReduxと連携させて使用するため、単体テストではなく、結合テストで動作の確認をしてください。


### Action Creatorの単体テスト
Action Creatorsはシンプルな`function`です。そのため、テストは通常の`function`と同様です。

#### テストファイル
Action Creatorのテストファイルは以下に従って作成してください。

|             | 規約           
| ------------- |-------------
| 配置場所 | `test/actions`
| ファイル名 | `Action Creatorのファイル名` + `.spec.js`

#### テストサンプル
Action Creatorのテストは以下のようになります。

e.g  
Action Creator : actions/index.js  
テストファイル : actions/index.spec.js  

```js
import { expect } from 'chai';
import * as types from '../../js/constants/ActionTypes';
import * as actions from '../../js/actions';

describe('Action Creator', () => {
  it('Todoを追加するActionを作成します。', () => {
    expect(actions.addTodo('JavaScriptの勉強')).to.deep.equal({
      type: types.ADD_TODO,
      payload: {
        id: 1,
        text: 'JavaScriptの勉強',
        completed: false,
      },
    });
  });

  it('Todoを完了/未完了にするActionを作成します。', () => {
    expect(actions.completeTodo(2)).to.deep.equal({
      type: types.COMPLETE_TODO,
      payload: 2,
    });
  });

  it('Todoリストのフィルターを変更するActionを作成します。', () => {
    expect(actions.setVisibilityFilter('SHOW_ALL')).to.deep.equal({
      type: types.SET_VISIBILITY_FILTER,
      payload: 'SHOW_ALL',
    });
  });
});
```
actionに渡したパラメータに応じて想定通りのactionが発行されているか確認をします。

### Reducerの単体テスト
Reducerはシンプルな`function`です。そのため、テストは通常の`function`と同様です。

#### Reducerのテストファイル
Reducerのテストファイルは以下の規約に従って作成してください。

|             | 規約           
| ------------- |-------------
| 配置場所 | `test/reducers`
| ファイル名 | `Reducerのファイル名` + `.spec.js`

#### テストサンプル
Reducerのテストは以下のようになります。

e.g  
```js
import { expect } from 'chai';
import * as types from '../../js/constants/ActionTypes';
import todos from '../../js/reducers/todos';

describe('Reducer', () => {
  describe('todo', () => {
    it('todoを追加する処理', () => {
      expect(
        todos([], {
          type: types.ADD_TODO,
          payload: {
            id: 0,
            text: 'JavaScriptの勉強',
            completed: false,
          },
        }),
      ).to.deep.equal([
        {
          id: 0,
          text: 'JavaScriptの勉強',
          completed: false,
        },
      ]);
    });

    it('todoを完了/未完了にする処理', () => {
      expect(
        todos([
          {
            id: 3,
            completed: false,
          },
          {
            id: 4,
            completed: false,
          },
        ], {
          type: types.COMPLETE_TODO,
          payload: 3,
        }),
      ).to.deep.equal([
        {
          id: 3,
          completed: true,
        },
        {
          id: 4,
          completed: false,
        },
      ]);
    });
  });
});
```
