import React, { Component } from 'react';
import Handsontable from 'handsontable';
import HotTable from 'react-handsontable';
import keikai from '../../../img/grid/keikai.png';
import sokudo from '../../../img/grid/sokudo.png';
import tyusi from '../../../img/grid/tyusi.png';
import css from '../../../style/grid/content.css';

// const propTypes = {
//   data: PropTypes.array,
// };

/* eslint-disable no-param-reassign */
// 1行目のセルのカラーを設定
function firstRowRenderer(instance, td, ...args) {
  Handsontable.renderers.TextRenderer.apply(this, [instance, td, ...args]);
  td.style.background = '#F6F6F6';
}

// 値が100以上のセルの色を塗る
function overNumRenderer(instance, td, row, col, prop, value, ...args) {
  Handsontable.renderers.TextRenderer.apply(this, [instance, td, row, col, prop, value, ...args]);
  if (value >= 100) {
    td.style.background = '#FFFF00';
  }
}

// 奇数行のセルの色を塗る
function oddNumRenderer(instance, td, ...args) {
  Handsontable.renderers.TextRenderer.apply(this, [instance, td, ...args]);
  td.style.background = '#F0F8FF';
}

// セル内にアイコンを配置する
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

class Grid extends Component {
  constructor(props) {
    super(props);
    // サンプルデータ
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

    // 上行（路線～区間）の縦二列を結合
    const mergeTopCells = [
      { row: 0, col: 0, rowspan: 2, colspan: 1 },
      { row: 0, col: 1, rowspan: 2, colspan: 1 },
      { row: 0, col: 2, rowspan: 2, colspan: 1 },
      { row: 0, col: 3, rowspan: 1, colspan: 3 },
      { row: 0, col: 6, rowspan: 2, colspan: 1 },
    ];

    // 左列（路線～観測地点）の縦三列を結合
    const mergeLeftCells = (() => {
      const result = [];
      for (let i = 1; i <= (data.length - 2) / 3; i += 1) {
        result.push(
          { row: (i * 3) - 1, col: 0, rowspan: 3, colspan: 1 },
          { row: (i * 3) - 1, col: 1, rowspan: 3, colspan: 1 },
          { row: (i * 3) - 1, col: 2, rowspan: 3, colspan: 1 },
        );
      }
      return result;
    })();

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
  }

  render() {
    return (
      <div className={css.main}>
        グリッドサンプル
        <HotTable width="100%" height="400" settings={this.settings} />
      </div>
    );
  }
}

// Grid.propTypes = propTypes;
export default Grid;
