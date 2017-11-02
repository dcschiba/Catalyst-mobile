# グリッド
グリッド用のJavaScriptライブラリである[Handsontable](https://handsontable.com/)を使用してグリッドを作成します。  

## 使用ライブラリ  
本サンプルでは[Handsontable](https://handsontable.com/)を使用してグリッドを実装しています。  
Handsontableはフリーで使用できるライブラリですが、有償ライセンスでは列のフィルターやセル内での数値の計算、csv出力等、よりExcelライクな機能を追加で使用することができます。  

## グリッド作成

### ライブラリのロード  

Handsontableのライブラリ`handsontable`とReact用のコンポーネント`react-handsontable`をnpmで追加後、importします。  

```js
import Handsontable from 'handsontable';
import HotTable from 'react-handsontable';
```

### コンポーネントの配置  
`react-handsontable`が提供するグリッドコンポーネントを配置します。  
※settingsに設定する値は後述

```js
return (
  <div className={css.main}>
    グリッドサンプル
    <HotTable width="100%" height="400" settings={this.settings} />
  </div>
);
```

### データの作成  
グリッドに表示するデータを用意します。  
データは配列/オブジェクト形式に対応しています。詳細は公式ドキュメントの[Data sources](https://docs.handsontable.com/0.34.0/tutorial-data-sources.html)を参照してください。

```js
const data = [
  ['路線', '区間', '観測地点', '規制', '', '', '', '18', '', '', '', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '入り', '下回り', '', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
  ['磐越東線（いわき～小野新町）', 'いわき-川前', '小川郷', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
  ['磐越東線（いわき～小野新町）', '赤井-江田', '小川郷', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
  ['磐越東線（いわき～小野新町）', '小川郷-小野新町', '小川郷', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
  ['磐越東線（いわき～小野新町）', '江田-夏井', '川前', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
  ['磐越東線（いわき～小野新町）', '川前-神保', '川前', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
  ['磐越東線（いわき～小野新町）', '夏井-神保', '小野新町', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
  ['磐越東線（小野新町～郡山）', '川前-神保', '小野新町', '警戒', '10:00', '13:00', '短指標', '10', '20', '30', '110', '50', '60', '70', '80', '90', '100', '90', '70'],
  ['', '', '', '速度規制', '15:00', '16:00', '中指標', '10', '20', '30', '40', '50', '60', '120', '80', '90', '100', '10', '20'],
  ['', '', '', '運転中止', '18:00', '21:00', '長指標', '10', '20', '30', '40', '50', '60', '70', '80', '90', '100', '30', '40'],
];
```

### 設定の作成  
グリッドに表示する設定を作成し、上記で用意したデータをセットします。設定可能なパラメータは公式ドキュメントの[Options](https://docs.handsontable.com/0.34.0/Options.html)を参照してください。  
サンプルでは以下のオプションを使用しています。  
* mergeCells:セルの結合  
* fixedColumnsLeft:左列の固定  
* fixedRowsTop:上行の固定  
* customBorders:セルに線を引く  
* className:セル内の文字の左寄せ、中央寄せ等の指定  
* readOnly:セルの読み取り専用  

```js
this.settings = {
  data,
  mergeCells: [
    ...mergeTopCells,
    ...mergeLeftCells,
  ],
  fixedColumnsLeft: 7, // 左列固定
  fixedRowsTop: 2, // 上行固定
  customBorders: [
    {
      range: {
        from: {
          row: 0,
          col: 7,
        },
        to: {
          row: 0,
          col: 18,
        },
      },
      bottom: {
        width: 1,
        color: '#F6F6F6',
      },
    },
  ],
  cells: (row, col) => {
    const cellProperties = {};
    if (row === 0 || row === 1) {
      cellProperties.renderer = firstRowRenderer;
    }

    if (row > 1 && col > 8) {
      cellProperties.renderer = overNumRenderer;
    }

    if (Math.floor((row + 1) / 3) % 2 === 1
      && (col === 0 || col === 1 || col === 2 || col === 6)) {
      cellProperties.renderer = oddNumRenderer;
    }

    if (row > 1 && col === 3) {
      cellProperties.renderer = iconRenderer;
    }

    return cellProperties;
  },
  className: 'htCenter htMiddle',
  readOnly: true,
};
```

### セルのカスタマイズ  
オプションの`cells`を使用するとより細かくセルの表現を指定することができます。  
セル1つごとに`cells`に設定された関数が呼び出され、returnしたRenderer（関数）が呼び出されます。列（row）や行（col）の値を使って呼び出すRendererを制御することができます。  


```js
cells: (row, col) => {
  const cellProperties = {};
  if (row === 0 || row === 1) {
    cellProperties.renderer = firstRowRenderer;
  }

  if (row > 1 && col > 8) {
    cellProperties.renderer = overNumRenderer;
  }

  if (Math.floor((row + 1) / 3) % 2 === 1
    && (col === 0 || col === 1 || col === 2 || col === 6)) {
    cellProperties.renderer = oddNumRenderer;
  }

  if (row > 1 && col === 3) {
    cellProperties.renderer = iconRenderer;
  }

  return cellProperties;
},
```

Rendererにはtdタグとして表示されるセルのElementや、セル内に設定される値が渡されます。  
サンプル例として、値が100以上のセルに色を塗る場合このように実装します。  
```js
function overNumRenderer(instance, td, row, col, prop, value, ...args) {
  Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, ...args]);
  if (value >= 100) {
    td.style.background = '#FFFF00';
  }
}
```

アイコン等を埋め込みたい場合は、innerHTMLを使ってタグを埋め込むことができます。  
```js
function iconRenderer(instance, td, row, col, prop, value, ...args) {
  Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, ...args]);
  switch (value) {
    case '警戒':
      td.innerHTML = `<img src="${keikai}" style="width: 12px; height: 12px" />${td.textContent}`;
      break;
    case '速度規制':
      td.innerHTML = `<img src="${sokudo}" style="width: 12px; height: 12px" />${td.textContent}`;
      break;
    case '運転中止':
      td.innerHTML = `<img src="${tyusi}" style="width: 12px; height: 12px" />${td.textContent}`;
      break;
    default:
  }
}
```
