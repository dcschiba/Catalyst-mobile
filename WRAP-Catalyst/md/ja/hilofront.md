# Hi Lo Front

### 注意点
高/低気圧(Hi/Lo)マーク描画は、GPV（モデル）地上気圧データを使ったDoscaロジックでプロットする。  
- 局所的な高/低圧部（台風のとき含む）は表現しきれないケースがある。[WRAP-241 backlog](https://wni.backlog.jp/view/WRAP-241)  
- どのGPV（モデル）の地上気圧データでも適用可能であるが、MSM Groundは解像度が細かくH/Lピークが出すぎるので、今のロジックでは描画に適さない。[MSM Ground適用例](https://wni.backlog.jp/ViewAttachment.action?attachmentId=3613958)


### Hi/Loプロットロジック（Dosca）仕様
- 4N〜70N、−4S〜−70SのGridのみが対象
- 各格子に対して、上下左右と斜め4方向（合計8方向）について中心格子と3Grid先までの値を比較し中心格子が最小または最大の場合Lo、Hiの候補とする。（この時点では最小タイ、最大タイは候補に含む）
- 各方向の隣り合う値の差が、「すべて増加」または、「すべて減少」であった場合、それぞれ中心の点がLowまたは Highの候補となる。
- Lo、Hiの候補となったGridが連続していた場合、右または下（斜めを含む）側の候補を削除する。

### データ
- WRAP DATA ID : [WX_WNI_Front](https://goo.gl/df5Frm)
- tagID : [411023096](http://data-catalog.wni.co.jp/data_catalog/view.cgi?tagid=411023096)

### 設定
- 地上気圧データ [config](./pri/conf/data/WX_WNI_GrandMaster.json)
- 前線データ [config](./pri/conf/data/WX_WNI_Front.json)
- レイヤー [config](./pri/conf/layer/Front.json)  