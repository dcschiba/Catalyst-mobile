# Distance サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/distance.html


## 機能

* マップ上にドラッグ可能な 2点（赤、青）を表示します
* 2点間の距離を計算しヘッダに表示します
* ヘッダ上の「Circle」をチェックするとマップ上の赤点を中心とした指定距離の円を描画します


## 処理概要

マップ上に点、線、円などを描く為にレイヤーを用意します。

このレイヤーはデータハンドラやレイヤーコンフィグはアタッチしません。

アプリケーションはレイヤーに描画オブジェクト（Feature）を登録することでコンテンツの描画を行います。

登録された Featureのリストをディスプレイリストと呼びます。

WRAP.Geoでは、invalidate()関数を呼び出すことでディスプレイリストをマップ上にレンダリングします。

本サンプルでは以下の Featureを用いています。

・WRAP.Geo.Feature.Piontオブジェクト（赤、青の点）

　座標、サイズ、色を指定できます。ドラッグ可能に設定することができます。

・WRAP.Geo.Feature.GeoLineオブジェクト（２点を結ぶライン）

　座標配列、描画色、線幅を指定できます。各座標感は 大圏経路で描画されます。

・WRAP.Geo.Feature.GeoArcオブジェクト（円）

　半径（m）開始、終了の角度（度）を指定することで円弧を描きます。

＊描画の手順

・レイヤーの作成、登録

・Featureを作成し、レイヤーに登録

・２点のFeatureにドラッグ可能属性を設定

・WRAP.Geo.invalidate()によりディスプレイリストを描画


レイヤーの作成、登録

```
            // レイヤーの登録
            var layer = new WRAP.Geo.Layer("DistanceCaliculatorSample");
            WRAP.Geo.setLayer({
                upper_layers : [
                    layer
                ]
            });
```

Featureの作成、登録

Featureはコンストラクタで描画styleを指定します。

```
            var pos_0 = [140,40];
            var pos_1 = [135,35];
            var radius = 100000;
            
            var point_0, point_1;       // 2点の Feature
            var path;                   // 2点間を結ぶ直線の Feature
            var arc;                    // 円の Feature

            path = new WRAP.Geo.Feature.GeoLine({   // ラインのスタイル
                path:[pos_0, pos_1],    // 座標列
                strokeStyle:'#088',     // ラインカラー
                lineWidth:3             // ライン幅
            });
            
            var circle_style = {        // 円弧のスタイル
                point:pos_0,            // 中心座標
                radius:radius,          // 半径（m）
                start:0,                // 開始角度（度）
                end:360,                // 終了角度（度）
                strokeStyle:'rgba(128,0,128,0.7)',  // ラインカラー
                fillStyle:'rgba(128,0,128,0.3)',    // フィルカラー
                lineWidth:2                         // ライン幅
            }
            arc = new WRAP.Geo.Feature.GeoArc(circle_style);

            point_0 = new WRAP.Geo.Feature.Point({  // ポイントのスタイル
                point:pos_0,            // 座標
                strokeStyle:'#FFF',     // ラインカラー
                lineWidth:2,            // ライン幅
                fillStyle:'#F00',       // フィルカラー
                pointSize:14            // ポイントサイズ
            });
            
            point_1 = new WRAP.Geo.Feature.Point({  // ポイントのスタイル
                point:pos_1,            // 座標
                strokeStyle:'#FFF',     // ラインカラー
                lineWidth:2,            // ライン幅
                fillStyle:'#00F',       // フィルカラー
                pointSize:14            // ポイントサイズ
            });


            // レイヤーにディスプレイリスト（Feature配列）を登録しレンダリングさせる。
            function setDisplayList() {
                layer.clear();                  // ディスプレイリストのクリア
                layer.addFeature(path);
                if ( radius > 0 && $('#circle').prop('checked') )
                    layer.addFeature(arc);
                layer.addFeature(point_0);
                layer.addFeature(point_1);
                WRAP.Geo.invalidate();          // レンダリング
            }

            　　：
            // 初期表示
            updateDistance();
            setDisplayList();

```

setDraggable()関数により Feature.Pointをドラッグ可能に設定することができます。

マップ上でドラッグされた Featureはコンストラクタで渡したスタイルオブジェクトの pointプロパティを更新し

指定したコールバックを呼び出します。

```
            // Point Featureをドラッグ可能に設定。第二引数に位置変更時のコールバックを指定する。
            point_0.setDraggable(true, function(feature, point) {
                updateDistance();
            });
            point_1.setDraggable(true, function(feature, point) {
                updateDistance();
            });
```

Featureのドラッグが行われると WRAP.Geoにより 2点の座標オブジェクトが更新されるので

WRAP.Geo.getDiatance()関数を用いて、距離を取得しヘッダ部の表示を更新します。

getDiatance()は2点間の距離（m）を返します。

```
            // 距離測定および表示
            function updateDistance() {
                // 2点間の距離を計算
                var dist = WRAP.Geo.getDistance(new WRAP.Geo.Point(pos_0[1]*60, pos_0[0]*60),
                                                new WRAP.Geo.Point(pos_1[1]*60, pos_1[0]*60));
                // 座標と距離の表示
                $('#p0').html(pos_0[1].toFixed(6)+","+pos_0[0].toFixed(6));
                $('#p1').html(pos_1[1].toFixed(6)+","+pos_1[0].toFixed(6));
                $('#ds').html("Distance = "+dist.toFixed(2)+"m");
            }
```

円の描画について

半径フィールドが更新されると、mに換算して Feature.GeoArcに設定した circle_styleオブジェクトのradiusプロパティを変更します。

Wrap.Geoのディスプレイリストは Featureのコンストラクタで設定されたスタイルをそのまま参照しています。

アプリケーションがディスプレイリストに登録した styleオブジェクトを書き換えて、Wrap.Geo.invalidate()を呼び出すと、更新された styleでレンダリングがおこなわれます。

```
            // 半径入力時の再描画
            $('#radius').val(radius/1000).change(function() {
                // 半径の更新
                circle_style.radius = radius = $('#radius').val()*1000;
                if ( $('#circle').prop('checked') ) // 「Circle」がチェックされている場合のみ再描画
                    WRAP.Geo.invalidate();
            });
            $('#circle').click(setDisplayList);
```
