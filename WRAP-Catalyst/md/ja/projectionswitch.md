# 図法選択

### ポーラーステレオ図法  
[こちらのガイド](https://pt-wrap01.wni.co.jp/Earth/doc/reference/sample_code/openlayers_ps.html)をご参照ください。  

### 注意点

- GPV表示（ex.風の矢羽や、気温のGridValue）で、極域に密集して表示される課題がある。  
以下の対応案で改善予定。[WRAP-284 backlog](https://wni.backlog.jp/view/WRAP-284)   
・ポーラ図法用の間引きロジック適用（高緯度ほど間引く）  
・指定緯度以上〜極域は表示しないようにできる  

- 南半球表示もできるが、Catalystは未対応。[WRAP_UIUX-297 backlog](https://wni.backlog.jp/view/WRAP_UIUX-297)   

- マウスドラッグによる回転機能は、将来的に対応予定。[WRAP_UIUX-301 backlog](https://wni.backlog.jp/view/WRAP_UIUX-301)   

#### OpenLayersマスク機能とツールチップ
OpenLayers機能で、北半球を表示しているときに緯度0以南にマスクをかけることができる。  
マスク域にツールチップを表示させたくない場合は、以下の方法で非表示制御ができる。[WRAP-305 backlog](https://wni.backlog.jp/view/WRAP-305)  
例）[サンプルアプリ](https://pt-wrap01.wni.co.jp/Earth/sample/satellite_openlayers_psn_3.20.html)でCLDTOPを表示。  

```
サンプルアプリの setTooltipで表示範囲の制御を行う例
// ★ の2行を追加
            // ツールチップ
            layer[cldtop].setTooltip(function(geo, data) {
                if ( !$('#cloudtop').prop('checked') )
                    return null;
                                     
                if ( geo ) {
                    if ( geo.geometry.coordinates[1] < 0 )　　// ★ マウス位置の緯度が0度未満だったら
                        return null;　　　　　　　　　　　　　　// ★ ツールチップを表示しない 
                    var prop = geo.properties;
                    if ( prop ) {
                        var v = val = prop.data[0];
                        if ( v > 117 ) {
                            // 160.57217 * (Val - 117) + 60.96	で、階調値をmに変換
                            var v = 160.57217 * (val - 117) + 60.96;
                            v *=3.281;	// mからftに変換
                            return Math.round(v)+"ft";
                        }
                    }
                                     
                }
                return "--ft";
            });
```	    