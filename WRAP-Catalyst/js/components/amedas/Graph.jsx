import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toggle from 'material-ui/Toggle';
import { Chart } from 'chart.js';
import 'chartjs-plugin-annotation';
import WrapUtils from '../../common/utils/WrapUtils';
import sunny from '../../../img/graph/sunny.png';
import cloudy from '../../../img/graph/cloudy.png';
import rainy from '../../../img/graph/rainy.png';
import wind1 from '../../../img/graph/wind_1.png';
import wind2 from '../../../img/graph/wind_2.png';
import wind3 from '../../../img/graph/wind_3.png';
import wind4 from '../../../img/graph/wind_4.png';
import wind5 from '../../../img/graph/wind_5.png';
import wind6 from '../../../img/graph/wind_6.png';
import css from '../../../style/common/graph.css';
import AmedasLayer from '../../layers/AmedasLayer';

const propTypes = {
  data: PropTypes.object,
};

function rotateImg(base64Data, rotate, callback) {
  const img = new Image();
  img.onload = () => {
    const width = img.width;
    const height = img.height;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const angle = (rotate * Math.PI) / 180;
    canvas.width = width;
    canvas.height = height;
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(angle);
    context.translate(-width / 2, -height / 2);
    context.drawImage(img, 0, 0, width, height);
    context.restore();
    const src = canvas.toDataURL('image/png');
    callback(src);
  };
  img.src = base64Data;
}

function isMissingData(data) {
  return data === -9999 || data === '_missing_';
}

class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = { isShow: true };
  }
  componentDidMount() {
    const sunnyImg = new Image();
    const cloudyImg = new Image();
    const rainyImg = new Image();
    sunnyImg.src = sunny;
    cloudyImg.src = cloudy;
    rainyImg.src = rainy;

    /* eslint-disable no-underscore-dangle,no-param-reassign */
    this.plugin = {
      afterUpdate: (chart) => {
        if (!this.props.data) {
          return;
        }
        // 天気アイコンへの置き換え
        const dataList1 = chart.getDatasetMeta(2).data;
        dataList1.forEach((data, index) => {
          const precipitation = this.props.data.precipitation[index];
          const sunshine = this.props.data.sunshine[index];
          if (isMissingData(precipitation) || isMissingData(sunshine)) {
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

        // 風アイコンへの置き換え
        const dataList2 = chart.getDatasetMeta(3).data;
        dataList2.forEach((data, index) => {
          const wind = this.props.data.wind[index];
          const winddir = this.props.data.winddir[index];
          if (isMissingData(wind) || isMissingData(winddir)) {
            return;
          }
          // 風速ごとにアイコンを分ける
          let windIcon;
          if (wind < 5) {
            windIcon = wind1;
          } else if (wind < 10) {
            windIcon = wind2;
          } else if (wind < 15) {
            windIcon = wind3;
          } else if (wind < 20) {
            windIcon = wind4;
          } else if (wind < 30) {
            windIcon = wind5;
          } else {
            windIcon = wind6;
          }
          // 風向でアイコンを回転
          rotateImg(windIcon, winddir - 180, (src) => {
            const img = new Image();
            img.src = src;
            data._model.pointStyle = img;
          });
        });
      },
      // 風アイコンの上に風速を表示する
      afterDatasetsDraw: (chart) => {
        const ctx = chart.ctx;

        const dataList = chart.getDatasetMeta(3).data;
        dataList.forEach((element, index) => {
          const wind = this.props.data.wind[index];
          const winddir = this.props.data.winddir[index];
          if (isMissingData(wind) || isMissingData(winddir)) {
            return;
          }

          ctx.fillStyle = 'rgb(0, 0, 0)';

          const fontSize = 9;
          const fontStyle = 'normal';
          const fontFamily = 'Arial';
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

          const dataString = `${wind} m/s`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          const padding = 10;
          const position = element.tooltipPosition();
          ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      },
    };
    Chart.pluginService.register(this.plugin);

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
      }, { // 天気アイコン用
        type: 'line',
        fill: false,
        yAxisID: 'y-left',
        data: [],
        showLine: false,
      }, { // 風アイコン用
        type: 'line',
        fill: false,
        yAxisID: 'y-left',
        data: [],
        showLine: false,
      }],
    };

    const ctx = this.node.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.amedasData,
      options: {
        title: {
          display: true,
          text: 'AmeDAS',
        },
        tooltips: {
          mode: 'index',
          intersect: true,
          filter: element =>
            (element.datasetIndex !== 2 && element.datasetIndex !== 3), // 天気と風アイコンのデータセットを非表示にする
        },
        legend: {
          labels: {
            filter: element =>
              (element.datasetIndex !== 2 && element.datasetIndex !== 3), // 天気と風アイコンのデータセットを非表示にする
          },
        },
        scales: {
          xAxes: [{
            ticks: {
              fontSize: 8,
              // callback: (dataLabel, index) =>
              //   (index % 3 === 0 ? dataLabel : ''), // ラベル表示を30分ごとにする
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
              max: 60.0,
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
              max: 60.0,
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
  }

  componentWillReceiveProps(nextprops) {
    const { amsid, temperature, precipitation, timelist, endtime } = nextprops.data;
    // データの更新有無確認
    if (this.props.data.amsid !== amsid || this.props.data.endtime !== endtime) {
      // データ欠損（-9999）の値をNaNに置き換え
      temperature.forEach((data, index) => {
        if (isMissingData(data)) {
          temperature.splice(index, 1, NaN);
        }
      });
      precipitation.forEach((data, index) => {
        if (isMissingData(data)) {
          precipitation.splice(index, 1, NaN);
        }
      });

      // データ更新
      this.amedasData.datasets[0].data = temperature;
      this.amedasData.datasets[1].data = precipitation;

      const wetherIcons = temperature.map(() => 60);
      const windIcons = temperature.map(() => 46);

      const date = new Date();
      const timeZoneOffset = -date.getTimezoneOffset() * 60; // UTCからの時差（秒）
      const labels = timelist.map(data => WrapUtils.dateFormat(data, 'hh:mm', timeZoneOffset));
      this.amedasData.datasets[2].data = wetherIcons;
      this.amedasData.datasets[3].data = windIcons;
      this.amedasData.labels = labels;
    }
  }

  componentDidUpdate(prevProps) {
    // グラフ更新
    const { amsid, endtime } = prevProps.data;
    // データの更新有無確認
    if (this.props.data.amsid !== amsid || this.props.data.endtime !== endtime) {
      this.chart.update();
    }
  }

  componentWillUnmount() {
    Chart.pluginService.unregister(this.plugin);
  }

  render() {
    const { amsid } = this.props.data;
    const { isShow } = this.state;
    let ename = 'NODATA';
    if (amsid && AmedasLayer.amedasmaster) {
      ename = AmedasLayer.getAmedasObsen(amsid);
    }

    const toggleStyle = {
      position: 'fixed',
      width: '50px',
      top: '60px',
      right: '0px',
      padding: '5px',
      background: '#f4f4ff',
    };
    return (
      <div>
        <div style={isShow ? {} : { display: 'none' }} className={css.content}>
          <div className={css.ename}>
            {ename}
          </div>
          <canvas ref={(node) => { this.node = node; }} />
        </div>
        <Toggle
          style={toggleStyle}
          defaultToggled
          onToggle={(event, isInputChecked) => this.setState({ isShow: isInputChecked })}
        />
      </div>
    );
  }
}

Graph.propTypes = propTypes;
export default Graph;
