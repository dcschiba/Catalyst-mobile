# ASCScale サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/ascscale.html


## 機能

* ASCScaleをマップ上に描画します。
* ASCScaleレイヤーは単一のレイヤーで、選択された要素および高度の範囲のデータを要素およびランクの優先度の応じてマージ処理されたグリッドを描画します。

## 処理概要

・レイヤーの作成

単一のレイヤーとして作成します。


```
    // Model
    var data = WRAP.DH.addObject("SKY_WNI_ASCScale");

    // レイヤー登録
    var layer = new WRAP.Geo.Layer("ASCScale");
    WRAP.Geo.setLayer({upper_layers:[layer]});

    // Configure Layers
    var conf_dir = "./pri/conf";
    $.getJSON(conf_dir + '/layer/ASCScale.json', function(conf) {
        layer.configure(data, conf);
    });
```



・レイヤーのコンテンツ設定

表示対象要素および、高度範囲は Layer.set()で指定します。

```
    layer.set({
        element:[要素名,要素名,... ],      // 表示対象の要素名（”TURB”、"ICING"、"CONV"）を配列で指定します。（順序に制約はありません）
        level:[高度,高度, ...],            // 表示対象の高度文字列（"100","200"...）を配列で指定します。（順序に制約はありません）
        basetime:YYYYMMDDThhmmss
        validtime:YYYYMMDDThhmmss
    });

```

サンプルコード

```

    var time_index = parseInt($("#mdl_vt").val());
    // チェックボックスの状態から表示対象の要素名配列を作成
    var e = [];
    if ( $('#chk_turb').prop('checked') )
        e.push("TURB");
    if ( $('#chk_conv').prop('checked') )
        e.push("CONV");
    if ( $('#chk_icing').prop('checked') )
        e.push("ICING");
    if ( !e.length ) {  // 表示対象がなければレイヤーは非表示
        layer.hide();
        return;
    }

    // ２つのコンボボックスの選択状態から表示対象の高度文字列の配列を作成
    var l = [];
    for ( var i = parseInt($("#mdl_lv_hi").val()) ; i <= parseInt($("#mdl_lv_lo").val()) ; i++ )
        l.push(levels[i]);

    // コンテンツ内容をレイヤーにセット
    var content = {
        element:e,
        level:l,
        basetime:time_range[time_index].basetime,
        validtime:time_range[time_index].validtime
    };
    layer.set(content);
    layer.show();

```
