# グラフ表示
グラフ描画用のJavaScriptライブラリである[Chart.js](http://www.chartjs.org/)を使用してグラフを作成します。  
サンプルのソースコードは[AMeDAS](./#/introduction/amedas)に組み込んでいますのでそちらをご参照ください。

## 使用ライブラリ  
本サンプルでは[Chart.js](http://www.chartjs.org/)を使用してグラフを実装しています。  
グラフ作成用のライブラリとして、他に[Recharts](http://recharts.org/)等がありますが、  


## グラフ作成

### ライブラリのロード  

Chart.jsのライブラリをnpmで追加後、importします。  

```js
import { Chart } from 'chart.js';
```

### canvasの作成  
グラフ描画先のcanvasをjsxで宣言します。  
canvasのnodeに後ほどアクセスする必要がありますので、refを使ってnodeの参照を保存します。（idを設定してgetElementByIdを使う、等の方法でも構いません。）  

```js
return (
  <div className={css.content}>
    <div style={{ position: 'absolute' }}>{ename}</div>
    <canvas ref={(node) => { this.node = node; }} />
  </div>
);
```

### データセットの作成  
グラフに表示するデータの設定を作成します。  
サンプルでは「気温」を線グラフ、「降水量」を棒グラフで設定しています。  
また、3つ目のデータは天気アイコンを出すために、線を非表示にした線グラフを設定しています。  

```js
this.amedasData = {
  labels: [],
  datasets: [{
    type: 'line',
    label: '気温（℃）',
    borderWidth: 2,
    fill: false,
    backgroundColor: 'rgb(255, 159, 64)',
    yAxisID: 'y-left',
    data: [],
  }, {
    type: 'bar',
    label: '降水量（mm）',
    backgroundColor: 'rgb(54, 162, 235)',
    yAxisID: 'y-right',
    data: [],
  }, {
    type: 'line',
    fill: false,
    yAxisID: 'y-left',
    data: [],
    showLine: false,
  }],
};
```

* labels:x軸に表示するラベルデータ  
* datasets:グラフ上に描画するデータ  

datasetsのtypeには表示するグラフの種類を設定します。  
typeに設定できるグラフの種類と、各グラフごとにdatasetsに設定できるパラメータはChart.jsの公式ドキュメントの[Charts](http://www.chartjs.org/docs/latest/charts/)を参照してください。  

labelsとdatasets内のdataは後ほど動的に設定するため、空データを設定します。  
あらかじめ表示するデータが決まっている場合はこのタイミングで設定してください。  

### グラフの生成とオプションの設定  
importしたChart.jsライブラリを使ってグラフを生成します。  
canvasのnodeからコンテキストを取得し、データセットやオプションを設定します。  
optionsに設定できるパラメータはChart.jsの公式ドキュメントの[General](http://www.chartjs.org/docs/latest/general/)と[Configuration](http://www.chartjs.org/docs/latest/configuration/)を参照してください。  

```js
const ctx = this.node.getContext('2d');
this.chart = new Chart(ctx, {
  type: 'bar',
  data: this.amedasData,
  plugins: [plugin],
  options: {
    title: {
      display: true,
      text: 'AmeDAS',
    },
    tooltips: {
      mode: 'index',
      intersect: true,
      filter: element => (element.datasetIndex !== 2), // 天気アイコンのデータセットを非表示にする
    },
    legend: {
      labels: {
        filter: element => (element.datasetIndex !== 2), // 天気アイコンのデータセットを非表示にする
      },
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 8,
        },
      }],
      yAxes: [{
        id: 'y-left',
        type: 'linear',
        position: 'left',
        gridLines: {
          display: false,
        },
        ticks: {
          min: -10.0,
          max: 50.0,
          stepSize: 10,
        },
        scaleLabel: {
          display: true,
          labelString: '気温（℃）',
        },
      }, {
        id: 'y-right',
        type: 'linear',
        position: 'right',
        gridLines: {
          display: false,
        },
        ticks: {
          min: 0.0,
          max: 50.0,
          stepSize: 10,
        },
        scaleLabel: {
          display: true,
          labelString: '降水量（mm）',
        },
      }],
    },
    annotation: {
      drawTime: 'afterDatasetsDraw',
      annotations: [{
        id: 'hline',
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-right',
        value: 40.0,
        borderColor: 'rgb(255, 255, 0)',
        borderDash: [5, 10],
        borderWidth: 2,
        label: {
          backgroundColor: 'rgb(255, 241, 15)',
          fontColor: 'rgb(165, 165, 16)',
          content: '警戒（降水量）',
          enabled: true,
        },
      }],
    },
  },
});
```

* type:グラフの種類（datasetsにもtypeを設定しますが、こちらにも設定が必要です。）  
* data:データセット  
* plugins:カスタマイズ処理（詳細は後述）
* options:描画オプション  

### データの更新
表示中のグラフを動的に更新する場合は、グラフ生成時にdataに設定したデータセットのオブジェクトを操作します。  
サンプルではthis.amedasDataにオブジェクトの参照を格納し、データを更新しています。  
Reactではコンポーネントに渡されるグラフデータに合わせてデータを更新する必要がありますので、Reactのライフサイクルメソッドである`componentWillReceiveProps`内でデータの更新処理を行います。  

```js
componentWillReceiveProps(nextprops) {
  const { amsid, temperature, precipitation, timelist } = nextprops.data;
  if (this.props.data.amsid !== amsid) {
    // データ欠損（-9999）の値をNaNに置き換え
    temperature.forEach((data, index) => {
      if (data === -9999) {
        temperature.splice(index, 1, NaN);
      }
    });
    precipitation.forEach((data, index) => {
      if (data === -9999) {
        precipitation.splice(index, 1, NaN);
      }
    });

    // データ更新
    this.amedasData.datasets[0].data = temperature;
    this.amedasData.datasets[1].data = precipitation;

    const icons = temperature.map(() => 48);
    const labels = timelist.map(data => AmedasLayer.timeString(data).substr(6, 5));
    this.amedasData.datasets[2].data = icons;
    this.amedasData.labels = labels;
  }
}
```

### 更新データの再描画
データセットのオブジェクトを更新するだけではグラフに反映されませんので、Chart.jsが提供するupdateを呼び出すことでグラフにデータが反映されます。  
こちらもデータ更新同様Reactのライフサイクルメソッドを利用し、`componentDidUpdate`内で呼び出してください。  

```js
componentDidUpdate() {
  // グラフ更新
  this.chart.update();
}
```

### 描画処理のカスタマイズ
Chart.jsが提供するpluginを利用することでグラフ描画の動作をカスタマイズすることができます。  
カスタマイズ処理のフックポイントが複数ありますので、詳細はChart.js公式ドキュメントの[Plugins](http://www.chartjs.org/docs/latest/developers/plugins.html)を参照してください。
下記の例ではデータの更新後に天気アイコン表示用データの点を天気アイコン画像に置き換えています。  

```js
const plugin = {
  afterUpdate: (chart) => {
    if (!this.props.data) {
      return;
    }
    const meta = chart.config.data.datasets[2]._meta;
    const dataList = meta[Object.keys(meta)[0]].data;
    dataList.forEach((data, index) => {
      const precipitation = this.props.data.precipitation[index];
      const sunshine = this.props.data.sunshine[index];
      if (precipitation === -9999 || sunshine === -9999) {
        return;
      }
      if (precipitation === 0 && sunshine === 0) { // 曇り
        data._model.pointStyle = cloudyImg;
      } else if (precipitation > 0) { // 雨
        data._model.pointStyle = rainyImg;
      } else { // 晴れ
        data._model.pointStyle = sunnyImg;
      }
    });
  },
};
```

### 既存プラグインの利用
フリーで公開されているChart.jsのプラグインを取り込んで利用することができます。  
サンプルでは[chartjs-plugin-annotation.js](https://github.com/chartjs/chartjs-plugin-annotation)を利用してグラフに閾値線を描画しています。  

プラグインをnpmで追加、importし、「chartjs-plugin-annotation.js」の利用手順にのっとり、グラフ生成時のoptionsにannotationを設定します。  

```js
import 'chartjs-plugin-annotation';
```

```js
const ctx = this.node.getContext('2d');
this.chart = new Chart(ctx, {
  type: 'bar',
  data: this.amedasData,
  plugins: [plugin],
  options: {
    title: {
      display: true,
      text: 'AmeDAS',
    },
    tooltips: {
      mode: 'index',
      intersect: true,
      filter: element => (element.datasetIndex !== 2), // 天気アイコンのデータセットを非表示にする
    },
    legend: {
      labels: {
        filter: element => (element.datasetIndex !== 2), // 天気アイコンのデータセットを非表示にする
      },
    },
    scales: {
      xAxes: [{
        ticks: {
          fontSize: 8,
        },
      }],
      yAxes: [{
        id: 'y-left',
        type: 'linear',
        position: 'left',
        gridLines: {
          display: false,
        },
        ticks: {
          min: -10.0,
          max: 50.0,
          stepSize: 10,
        },
        scaleLabel: {
          display: true,
          labelString: '気温（℃）',
        },
      }, {
        id: 'y-right',
        type: 'linear',
        position: 'right',
        gridLines: {
          display: false,
        },
        ticks: {
          min: 0.0,
          max: 50.0,
          stepSize: 10,
        },
        scaleLabel: {
          display: true,
          labelString: '降水量（mm）',
        },
      }],
    },
    annotation: {
      drawTime: 'afterDatasetsDraw',
      annotations: [{
        id: 'hline',
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-right',
        value: 40.0,
        borderColor: 'rgb(255, 255, 0)',
        borderDash: [5, 10],
        borderWidth: 2,
        label: {
          backgroundColor: 'rgb(255, 241, 15)',
          fontColor: 'rgb(165, 165, 16)',
          content: '警戒（降水量）',
          enabled: true,
        },
      }],
    },
  },
});
```