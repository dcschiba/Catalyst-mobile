# ACOSforVA

## 機能

* WX_WNI_VolcanicRank三角形ををマップ上に描画します。
* WX_WNI_VolcanicAshConcVectorにより、テキストウインドウを表示します。
* ACOS（WX_WNI_VolcanicAsh_GPV）ポリゴンををマップ上に描画します。
* 凡例コントロール部分のコマ送り（ft）とLevel(fl)を選択すると該当のデータを表示します。

（Levelの操作対象はすべての地点、コマ送り（ft）の操作対象は選択した地点しかない）

画面初期化の時に、WX_WNI_VolcanicAsh_GPVの各地点の最新erupted_dateのデータを表示します。

データの該当 validtimeは 各火山の erupted_dateにFTを加算した時刻以前の最も近いものが選択されます。

## 処理概要

・レイヤーの作成

mapsetting jsonにより、AcosRankLayerとAcosGpvLayer二つレイヤー作成します。

・テキスト表示可否

WX_WNI_VolcanicAshConcVector/index.jsonに、対象地点があるかどうかにより。

・テキスト表示更新

WX_WNI_VolcanicAsh_GPVの更新(inspect callback)した後に、
WX_WNI_VolcanicAshConcVector/index.jsonを確認して、
WX_WNI_VolcanicAshConcVector/2D/%対象地点%.jsonの更新を行います。

```
{
    "DHObjectName": "WX_WNI_VolcanicRank",
    "layerName": "VolcanicRank",
    "confName": "VolcanicRank.json",
    "initVisible": false,
    "activeLayerFlag": false,
    "interactionFlag": false
},
{
    "DHObjectName": "WX_WNI_VolcanicAsh_GPV",
    "layerName": "VolcanicAsh_GPV",
    "confName": "ACOS.json",
    "initVisible": false,
    "activeLayerFlag": false,
    "interactionFlag": false
},
```

・レイヤーのコンテンツ設定
表示する火山データのコンテンツ設定を配列で指定します。

各火山データのコンテンツ設定は、id、level（FlightLevel文字列）、basetime（erupted_date）、ft（時間配列）を指定します。

lebelは ”FL010”、”FL430”、”ALL”などのフライトレベルを表す文字列です。

ftは時間（hour）を単位とるす値の配列で複数を指定することができます。

ACOSレンダラは、set()された火山データを id毎に保持します。

一部の火山データのコンテンツ設定を変更する場合は、対象idの設定のみを set()することができます。

```
const content = {
    [                               // 表示する火山データを配列で指定
        id:”SHIVELUCH”,             // 火山のＩＤ
        level:"FL010",              // フライトレベル（”FL010”、”FL430”、”ALL”など）
        basetime:"20170511T182400", // 火山データの basetime（erupted_date）YYYYMMDDThhmmss
        ft:[3, 6, 9]                // FT時間配列 [時間、時間...]
    ],
    [                               // 表示する火山データを配列で指定
        id:”SINABUNG”,              // 火山のＩＤ
        level:"FL010",              // フライトレベル（”FL010”、”FL430”、”ALL”など）
        basetime:"20170511T120000", // 火山データの basetime（erupted_date）YYYYMMDDThhmmss
        ft:[3, 6, 9]                // FT時間配列 [時間、時間...]
    ],
    ：        
};
layer.set(content);
```

火山データに一致する basetimeがない場合は表示されません。

特定の火山の表示を消去する場合は、id以外を含まないオブジェクトを設定します。

```
const  content = {
    [                              // 表示する火山データを配列で指定
        id:”SINABUNG”              // ”SINABUNG”火山の表示を消去
    ],
    ：        
};
layer.set(content);
```

・データコンフィグ
Attributes下に以下項目を定義します。

Index：火山一覧（インデックス）ファイルのパス

TimeList：火山毎のタイムリストのパス

DataConfig：火山毎のデータコンフィグのパス

パス中のキーワードはデータハンドラによって以下に置き換えられます。

%id% → 火山ID

%type% → acos_type

%basetime% → 該当火山タイムリストの最初の最新 basetime
```
{
    "Name" : "WX_WNI_VolcanicAsh_GPV_sample",
    "DataHandler" : "ACOS",
    "Attributes" : {
        "Index" : "wrap-pri/data/WX_WNI_VolcanicAsh_GPV_sample/index.json",
        "TimeList" : "wrap-pri/data/WX_WNI_VolcanicAsh_GPV_sample/%id%/%type%/index.json",
        "DataConfig" : "wrap-pri/data/WX_WNI_VolcanicAsh_GPV_sample/%id%/%type%/%basetime%/data.json
        ",
        "UpdateInterval" : 3600
    }
}
```

・レイヤーコンフィグ

Attributes下にFT（時間）をキーとするハッシュオブジェクトにそれぞれのポリゴンを描く、線色（line_color）、線幅（line_width）、塗色（fill_color）を定義します。

火山の floating_ash_flag が 0の場合はポリゴン内部が fill_colorにより塗られ、1の場合は line_colorにより斜線が描かれます。
```
{
    "Name" : "ACOS",
    "Renderer" : "ACOS",
    "Attributes" : {
        "3": {
            "line_color":"rgba(250,150,50,1.0)",
            "line_width":1,
            "fill_color":"rgba(250,150,50,0.5)"
        },
        "6": {
            "line_color":"rgba(200,0,200,1.0)",
            "line_width":1,
            "fill_color":"rgba(200,0,200,0.5)"
        },
        "9": {
            "line_color":"rgba(0,200,0,1.0)",
            "line_width":1,
            "fill_color":"rgba(0,200,0,0.5)"
        },
        "12": {
            "line_color":"rgba(250,250,50,1.0)",
            "line_width":1,
            "fill_color":"rgba(250,250,50,0.5)"
        },
        "18": {
            "line_color":"rgba(0,0,200,1.0)",
            "line_width":1,
            "fill_color":"rgba(0,0,200,0.5)"
        },
        "24": {
            "line_color":"rgba(100,0,100,1.0)",
            "line_width":1,
            "fill_color":"rgba(100,0,100,0.5)"
        }
    }
}
```