# FIR
FIR（Flight Information Region：飛行情報区）  
ICAO（国際民間航空機関）により設定された航空機の航行に必要な各種の情報の提供又は捜索救難活動が行われる空域。  
SKYのビジネスデータにあたる。

### データ
- WRAP DATA ID : [MAP_ARINC_FIR](https://goo.gl/df5Frm)

### 設定
- データ [config](./pri/conf/data/MAP_ARINC_FIR.json)
- レイヤー [config](./pri/conf/layer/FIR.json)  

### ツールチップ
ポリゴンのツールチップは、layer configでfill_colorのα値>0にすると、ポリゴン領域内でツールチップ表示される。
```
"fill_color" : "rgba(0,0,0,0.01)",
```