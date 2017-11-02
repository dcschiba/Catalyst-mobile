# Radar

### データ特記事項
 - 台湾レーダ (WRAP Data ID : WX_TW_Radar) は、カバレッジ無し
 - JP_ICDB : 分散DBで作成したJMA Radar画像。(JMA_OBS_RADAR_ECHINT_JP_5min)
   ※カバレッジ未対応
 - JP_ECHOTOP : ECHOTOPの表示。JP_ICDBの時刻と連動します(JMA_OBS_RADAR_ECHTOP_JP)
 - JMA_PRCRIN : JMA_ANLSIS_PRCINT_HRES 「実況（過去）」とJMA_NOWCAS_PRCINT_HRES「予測」。
 - US_RADAR :(WX_US_AK_Radar、WX_US_GU_Rada、WX_US_HI_Radar、WX_US_NA_Radar、WX_US_PR_Radar)五つ分けて表示する。

### Radar Merge 順
=======
 - 日本レーダー (WRAP Data ID :WX_JP_Radar)
 - JP_ICDB : 分散DBで作成したgpv grayscale_palette画像。(JMA_OBS_RADAR_ECHINT_JP_5min)
 - JMA_PRCRIN :分散DBで作成したgpv grayscale_palette画像。(JMA_NOWCAS_PRCINT_HRES/JMA_ANLSIS_PRCINT_HRES）
 - 韓国レーダー (WRAP Data ID :WX_KR_Radar)
 - 台湾レーダー (WRAP Data ID : WX_TW_Radar) は、カバレッジ無し
 - オーストラリアレーダー (WRAP Data ID :WX_AU_Radar)
 - EUレーダー (WRAP Data ID :WX_EU_Radar)
 - カナダレーダー (WRAP Data ID :EC_OBS_RADAR_ECHINT_CA)
 - USレーダー :(WX_US_AK_Radar、WX_US_GU_Rada、WX_US_HI_Radar、WX_US_NA_Radar、WX_US_PR_Radar)
 


### レーダー画素マージの処理仕様

(1) ベースとなるレイヤーをまず描画します。

(2) merge()で指定されたレイヤー配列の順に次のように描画をオーバーレイします。

　　マージする側の各画素について、aが0以外の場合その色で描画先の色（r,g,b,a）を置き換えます。

　　ただし、マージする側の色が、コンフィグで alternative_colorと指定された色だった場合は、

　　描画先の色の αが 0である場合のみ描画先の色を置き換えます。

　　＊alternative_colorは カバレッジ領域の合成に使われます。

したがって、前記のようにレイヤーをマージした場合は、重複画素のαがすべて0以外であった場合は以下の優先度で色が決定されます。

    layer[0]＜ layer[1]＜ layer[2]
    
画素の優先度を変更したい場合は、ベースとなるレイヤーおよび引数い渡すレイヤー配列の順番を変えてください。


### カバレッジ領域の処理について

レーダーのレイヤーコンフィグ
- image type(rgb_palette)
```
{
    "Name" : "Radar",
    "Renderer" : "Image",
    "Attributes" : {
        "style" : {
            "default" : {
                "type" : "rgb_palette",
                "palette" : [[[255,255,255],[128,128,128,128]]],
                "alternative_color" : [128,128,128,128]
            },
            "clear_coverage" : {
                "type" : "rgb_palette",
                "palette" : [[[255,255,255],[0,0,0,0]]],
                "alternative_color" : [128,128,128,128]
            }
        }
    }
}
```
- image type(grayscale_palette)
```
{
    "Name" : "Radar",
    "Renderer" : "Image",
    "Attributes" : {
        "style" : {
            "default" : {
                "type" : "grayscale_palette",
                "alternative_color" : [128,128,128,128],
                "palette" : [
                  [128,128,128,128],
                  [0,0,0,1], //＊ mergeする時、カバレッジ部分を透明（α=１）でくり抜くことができます
                  [240,248,255,255],
                  [240,248,255,255],
                  [240,248,255,255],
                  [240,248,255,255],
                  ...
            },
            "clear_coverage" : {
                "type" : "grayscale_palette",
                "alternative_color" : [128,128,128,128],
                "palette" : [
                [0,0,0,0],
                [0,0,0,1],
                [240,248,255,255],
                [240,248,255,255],
                [240,248,255,255],
                [240,248,255,255],
                ...
            }
        }
    }
}
```

画像を無変換で表示する「default」とカバレッジ部分を透過させる「clear_coverage」の二つの styleを定義しています。

アプリケーションは、layer.setStyle()でどちらかのスタイル名を指定することで表示スタイルを切り替えることができます。

サンプルでは「coverage」チェックボックスの On/Offで layer.setStyle("default")と  layer.setStyle("clear_coverage")を呼び変えています。

・rgb_paletteフィルタについて
              
```
                "palette" : [[[255,255,255],[128,128,128,128]]],

                オリジナルデータの [r,g,b]と書き換える [r,g,b,a]のペアを配列で指定します。
                上記は、r=g=b=128の画素を透明の黒r=g=b=a=0に置き換えるような設定です。
                色のペアは配列に複数記載することができますが、件数が多くなると描画パフォーマンスが劣化します。
```


・alternative_colorについて

領域の超複する複数のレーダーレイヤーの内容をマージして表示する場合に、カバレッジ部分をデータ領域に表示しないための設定です。

```
                "alternative_color" : [128,128,128,128]

                上記は、r=g=b=a=128の画素については、描画先が α=0の場合のみ描画されます。
```

カバレッジ領域の合成は次のように行われます。

カヴァレッジ領域の画素は、r=g=b=255で与えらえます。

これがまず rgb_paletteの設定により各レイヤーで r=g=b=a=128に置き換えられます。

次にレイヤーのマージ処理において alternative_colorの設定（r=g=b=a=128）の画素に対しては、

マージ先が a=0の場合のみ色を設定します。



### WRAP-Catalyst Radar Merge の base layer順 baseLayer.merge(layers)

```
  JP
  JP_ICDB
  JMA_PRCRIN
  KR
  TW
  AU
  EU
  CA
  US_NA
  US_AK
  US_GU
  US_HI
  US_PR
```

<br>
### カラーパレットの指定  
 - レーダ範囲（カバレッジ）外はrgba[128,128,128,128], データが存在する領域は全てα > 0 とする。  
 - 異なるレーダエコーの範囲（カバレッジ）をマージするときの判断に使っているため、  
カラーパレットで0mmを指定するときは、[0,0,0,1], というように、α > 0 にする必要がある。  
 - カラーパレットは階調値を見て、アプリ毎に任意に設定できる。

<br>
### 設定
カナダレーダ（EXDB）
- データ [config](./pri/conf/data/EC_OBS_RADAR_ECHINT_CA.json)
- レイヤー [config](./pri/conf/layer/EC_OBS_RADAR_ECHINT_CA.json)
- [階調値](https://wni-icdb.wni.com/gpv/EC_OBS_RADAR_ECHINT_CA/level_value)