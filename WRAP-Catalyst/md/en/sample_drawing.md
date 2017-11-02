# Drawing サンプルコード

## URL	

* http://pt-wrap01.wni.co.jp/Mercury/sample/drawing.html


## 機能

* ポイント座標リストを管理し、「ポイント」、「ポリライン」または「ポリゴン」として表示します。
* ポイント座標リストの内容を画面右側にオーバレイ表示します。
* ポイントをクリックすることでひとつのポイントを選択状態にします。
* マップ上のクリックにより選択ポイントの次に新しいポイントを追加します。
* 「Delete Point」ボタンにより選択ポイントを削除します。

このサンプルでは、マップ上のクリック、ドラッグ操作などにより、ポリラインやポリゴンを描くための座標列を編集する処理を実装しています。

WRAP.Geoの次の機能を利用しています。

・ドラッグ可能な点を描く Feature.Pointオブジェクト

・ライン、ポリゴンを描く Feature.GeoLineオブジェクト

・マップ上のクリック（touch）を監視するために、WRAP.Geo.addEventHandler()関数によりハンドラを登録

アプリケーションは座標リストを管理し、リストの描画（ディスプレイリストとしてレイヤーに登録）を行います。

また、現在選択状態のポイントのインデックスを管理し、マップ上の touchイベントに対応して、ポイントの選択や追加を行います。

## 処理概要

・アプリケーションが管理するオブジェクト

　points配列に編集対象の各点の座標を格納していきます。

　pointsは [[lon0, lat0], [lon1, lat1], [lon2, lat2],...] のような[経度、緯度]からなる配列の配列です。

　この形式は、GeoJSONの LineString coordinates形式と互換で Feature.GeoLineの pathとしてそのまま設定することができる構造です。

　また、選択状態のポイントを管理するために currentインデックスを管理します。

```
        var points = [];          // 編集を行う点列：[lon, lat]の配列
        var current = -1;         // 選択されている Pointのインデックス
```


・ディスプレイリストの構築

Layer.addFeature()関数を用いて描画要素（Feature）のリスト（ディスプレイリスト）の作成を行います。

Featureはコンストラクタで表示スタイルを設定し作成します。

本サンプルでは、ポリラインおよびポリゴンの表現を Feature.GeoLineオブジェクトを用いて行います。
また、編集用のポイントは Feature.Pointオブジェクトにより行います。

Feature.GeoLineオブジェクトは pathプロパティに座標配列を指定します。

strokeStyle、lineWidthはライン描画の指定です。fillStyleが指定された場合 pathで示された座標領域をポリゴンとして塗りつぶします。

ポリゴン表現では pathの 最初と最後の座標が一致している（閉じている）必要があります。

ポリラインでは pathプロパティに前期points配列をそのまま指定できます。

ポリゴンではパスを閉じるため points配列をコピーして起点を追加した polygon配列を作成して pathプロパティに設定しています。

ポイントは、選択状態によって色を変えて指定しています。また、Feature.Point.setDraggable()関数によりポイントをドラッグ可能に設定しています。

ポイントがドラッグされた場合、コンストラクタで指定したスタイルの pointプロパティが変更され setDragableで指定したコールバックが呼び出されます。

サンプルでは、points内の座標オブジェクトを pointプロパティに設定しているので、ドラッグにより pointsオブジェクトが更新されることになります。

構築されたディスプレイリストは WRAP.Geo.invalidate()を呼び出すことでレンダリングされます。

```
            // ディスプレイリストの登録
            function setDisplayList() {
                layer.clear();          // ディスプレイリストのクリア
                if ( points.length ) {
                    if ( $('#polyline').prop('checked') ) {
                        // Polylineモードではラインを表示
                        var path = new WRAP.Geo.Feature.GeoLine({
                            path:points,
                            strokeStyle:'#088',
                            lineWidth:2
                        });
                        layer.addFeature(path);
                    }
                    else if ( $('#polygon').prop('checked') ) {
                        // Polygonモードではパスを閉じ（開始点と終了点を同じにする）、ラインと塗りつぶし表示
                        var polygon = [].concat(points);
                        polygon.push(points[0]); // 起点を最後に追加
                        var path = new WRAP.Geo.Feature.GeoLine({
                            path:polygon,
                            strokeStyle:'rgba(0,0,150,0.7)',
                            fillStyle:'rgba(0,0,100,0.3)',
                            lineWidth:2
                        });
                        layer.addFeature(path);
                    }
                    // 編集用の Point Featureを登録
                    for ( var i = 0 ; i < points.length ; i++ ) {
                        var point = new WRAP.Geo.Feature.Point({
                            point:points[i],
                            strokeStyle:'#008',
                            lineWidth:2,
                            fillStyle:i==current?'#0F0':'#FFF',
                            pointSize:12
                        });
                        point.index = i;    // Featureに インデックスを設定しておく
                        
                        // Point Featureをドラッグ可能に設定。第二引数に位置変更時のコールバックを指定する。
                        point.setDraggable(true,
                            function(feature, point) {
                                updateUI();
                            });
                        layer.addFeature(point);
                    }
                }
                WRAP.Geo.invalidate();  // レンダリング

                updateUI();
            }
```



・クリック処理

WRAP.Geo.addEventHandler('touch', function(layer, feature, sp)) によりマップ上のクリック操作を処理するハンドラを登録します。

マップ上のポイント Fratureがクリックされた場合は、ハンドラの featureに当該Featureオブジェクトが渡され、ポイント Feature以外の場所がクリックされた場合は、featureに nullが設定されます。

spにはクリックした地点のスクリーン座標が設定されます。

Featureのクリックにより選択ポイントの変更を行うため、ポイントの Feature作成時に、インデックスを設定しています。

```
                        point.index = i;    // Featureに インデックスを設定しておく
```

ハンドラで、feature.indexを調べ、選択インデックスを更新しています。


```
            // マップ・クリック処理
            WRAP.Geo.addEventHandler('touch', function(layer, feature, sp) {
                if ( !feature ) {
                    // Feature以外がクリックされた場合ポイントを登録
                    addPoint(sp);
                }
                else if ( feature.index !== undefined ) {
                    if ( current != feature.index ) {
                        // 選択 Featureが変化した場合、ディスプレイリストを再構築して描画
                        current = feature.index;
                        if ( current >= points.length )
                            current = -1;
                        setDisplayList();
                    }
                }
            });
```

・ポイントの追加

touchハンドラで得られたクリックされたスクリーン座標を WRAP.Geo.getPointにより緯度経度に変換して points配列を更新し、ディスプレリストを再構築（setDisplayList）します。


```
            // ポイント追加
            function addPoint(sp) {
                var p = WRAP.Geo.getPoint(sp);          // スクリーン座標を緯度経度に変換
                point = [p.lonDegree(), p.latDegree(0)];
                current++;
                if ( current < points.length )
                    points.splice(current, 0, point);
                else
                    points.push(point);
                setDisplayList();
            }
```


・ポイントの削除

「Delete Point」ボタンが押されると、points配列から現在選択状態の座標を削除して、ディスプレイリストを再構築（setDisplayList）します。

```
            // ポイント削除
            function deletePoint() {
                points.splice(current--, 1);
                if ( current < 0 && points.length > 0 )
                    current = points.length-1;
                setDisplayList();
            }
```


・UIの更新

アプリケーションは各操作により編集された座標情報を potins配列から取り出し画面に表示します。

```
            // UIの更新
            function updateUI() {
                // ポイントがない場合は Deleteボタンを無効化
                $('#delete').prop('disabled', !points.length);
                
                // 現在の座標列を画面に表示
                pos_list = "";
                for ( var i = 0 ; i < points.length ; i++ ) {
                    pos_list += points[i][1].toFixed(6) + "," + points[i][0].toFixed(6) + "</br>";
                }
                $('#info').html(pos_list);
            }
```
