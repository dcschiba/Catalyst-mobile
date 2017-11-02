var MapTest = function(coastline) {
 
    // レイヤーの登録
    var layer = new WRAP.Geo.Layer("Test");
    var layers = [layer];
    
    
    if ( coastline ) {
        var conf_dir = "./pri/conf";
        WRAP.DH.conf_path = conf_dir+"/data";
        var world_coastline_data = WRAP.DH.addObject("Map_WorldCoastLine");
        var world_coastline_layer = new WRAP.Geo.Layer("WorldCoastLine");
        layers.push(world_coastline_layer);

        $.getJSON(conf_dir + '/layer/WorldCoastLine.json', function() {}).
        success(function(conf) {
            world_coastline_layer.configure(world_coastline_data, conf);
        }).
        error(function(jqXHR, textStatus, errorThrown) {
            console.log("WorldCoastLine Layer configuration file load error : " + textStatus);
        });
    }
    
    WRAP.Geo.setLayer({ upper_layers : layers });
    
    // ツールチップ
    layer.setTooltip(function(geo, data) {
        return data;
    });

    
    function cood(points, y_offset, x_offset, normalize) {
        var p = [];
        if ( Array.isArray(points) ) {
            if ( Array.isArray(points[0]) ) {
                for ( var i = 0 ; i < points.length ; i++ ) {
                    var x = parseFloat(points[i][0]);
                    var y = parseFloat(points[i][1]);
                    x += parseFloat(x_offset);
                    y += parseFloat(y_offset);
                    if ( normalize ) {
                        while ( x < -180.0 )
                            x += 360.0;
                        while ( x >= 180.0 )
                            x -= 360.0;
                    }
                    p.push([x,y]);
                }
            }
            else {
                var x = parseFloat(points[0]);
                var y = parseFloat(points[1]);
                x += parseFloat(x_offset);
                y += parseFloat(y_offset);
                if ( normalize ) {
                    while ( x < -180.0 )
                        x += 360.0;
                    while ( x >= 180.0 )
                        x -= 360.0;
                }
                p[0] = x;
                p[1] = y;
            }
        }
        return p;
    }

    function label(point, text) {
        var feature;
        feature = new WRAP.Geo.Feature.Text({
            point:point,
            offsetX:-24,
            text:text,
            fontSize: 12,
            fillStyle:'#000',
            align:'right',
        });
        layer.addFeature(feature);
    }
    
    this.line = function(offset, normalize) {
        layer.clear();
        
        var p1 = [
            [139.913164,39.276343],
            [154.942461,47.614923],
            [171.026445,37.205680],
            [199.200273,47.851378]
        ];
        
        var feature;
        
        feature = new WRAP.Geo.Feature.GeoLine({    // ラインのスタイル
            path:cood(p1,10,offset,normalize),      // 座標列
            strokeStyle:'#088',                     // ラインカラー
            lineWidth:1,                            // ライン幅
            lineDash:[4,2],                           // 破線パターン
            geodesic:false                          // 直線
        });
        layer.addFeature(feature);
        feature.data = "Streight Dash Line";
        label(cood(p1[0],10,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.GeoLine({    // ラインのスタイル
            path:cood(p1,0,offset,normalize),       // 座標列
            strokeStyle:'#F00',                     // ラインカラー
            lineWidth:3,                            // ライン幅
            geodesic:true                           // GC
        });
        layer.addFeature(feature);
        feature.data = "GC Width 3 Line";
        label(cood(p1[0],0,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.GeoLine({    // ラインのスタイル
            path:cood(p1,-10,offset,normalize),     // 座標列
            strokeStyle:'#080',                     // ラインカラー
            lineWidth:2,                            // ライン幅
            lineDash:[10],                          // 破線パターン
            geodesic:true                           // GC
        });
        layer.addFeature(feature);
        feature.data = "GC Width 2 Dash Line";
        label(cood(p1[0],-10,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.GeoLine({    // ラインのスタイル
            path:cood(p1,-20,offset,normalize),     // 座標列
            strokeStyle:'#00F',                     // ラインカラー
            lineWidth:1,                            // ライン幅
            geodesic:true                           // GC
        });
        layer.addFeature(feature);
        feature.data = "GC Width 1 Line";
        label(cood(p1[0],-20,offset,normalize), feature.data)
        
        
        WRAP.Geo.invalidate();          // レンダリング
    }
 
    this.polygon = function(offset, normalize) {
        layer.clear();
        
        
        var p1 = [
         [140.088945,39.683371],
         [144.659258,46.173613],
         [154.942461,46.899110],
         [163.643633,45.376712],
         [169.883867,42.335668],
         [171.553789,37.415394],
         [167.862383,33.552224],
         [157.579180,32.000461],
         [148.438555,33.037981],
         [141.319414,36.006297],
         [140.088945,39.683371],
        ];
        var p2 = [
         [145.713945,40.155221],
         [149.317461,43.110469],
         [155.557695,42.595010],
         [162.149492,41.551202],
         [164.258867,39.547959],
         [163.555742,36.643588],
         [160.128008,34.932624],
         [153.799883,34.354164],
         [149.844805,35.721387],
         [146.241289,37.345555],
         [145.713945,40.155221],
        ];

        var feature;
        
        feature = new WRAP.Geo.Feature.GeoLine({        // スタイル
            path:[cood(p1,-20,offset,normalize)],       // 座標列
            fillStyle:'rgba(255,255,100,0.6)',          // フィルカラー
            strokeStyle:'#088',                         // ラインカラー
            lineWidth:2,                                // ライン幅
            geodesic:false
        });
        layer.addFeature(feature);
        feature.data = "Color Fill";
        label(cood(p1[0],-20,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.GeoLine({        // スタイル
            path:[cood(p1,0,offset,normalize), cood(p2,0,offset,normalize)],         // 座標列
            fillStyle:'rgba(0,255,255,0.6)',            // フィルカラー
            strokeStyle:'#088',                         // ラインカラー
            lineWidth:1,                                // ライン幅
            geodesic:false
        });
        layer.addFeature(feature);
        feature.data = "Hole";
        label(cood(p1[0],0,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.GeoLine({        // スタイル
            path:[cood(p1,20,offset,normalize)],        // 座標列
            fillImage:'img/pattern2.png',               // フィルイメージ
            geodesic:false
        });
        layer.addFeature(feature);
        feature.data = "Image Fill";
        label(cood(p1[0],20,offset,normalize), feature.data)
        
        WRAP.Geo.invalidate();          // レンダリング
    }
    
    this.text = function(offset, normalize) {
        layer.clear();
        
        var p1 = [140,40];
        var p2 = [-140,40];
        
        var feature;
        
        feature = new WRAP.Geo.Feature.Point({        // スタイル
            point:cood(p1,0,offset,normalize),      // 座標列
            fillStyle:'red',                          // ポイント色
            strokeStyle:'white',                      // 線色
            pointSize:10
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p1,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            text:"Align Left Offset(20, 0)",
            fontSize: 14,
            fillStyle:'#00F',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p1,0,offset,normalize),
            offsetX:-20,
            offsetY:0,
            text:"Align Right Offset(-20, 0)",
            fontSize: 14,
            fillStyle:'#00F',
            strokeStyle:'#FFF',
            align:'right',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p1,0,offset,normalize),
            offsetX:0,
            offsetY:20,
            text:"Align Center Offset(0, 20)",
            fontSize: 14,
            fillStyle:'#00F',
            strokeStyle:'#FFF',
            align:'center',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Point({        // スタイル
            point:cood(p2,0,offset,normalize),      // 座標列
            fillStyle:'red',                          // ポイント色
            strokeStyle:'white',                      // 線色
            pointSize:10
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p2,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            rotation:-15,
            text:"Rotation -15",
            fontSize: 14,
            fillStyle:'#040',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p2,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            rotation:45,
            text:"Rotation 45",
            fontSize: 14,
            fillStyle:'#040',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p2,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            rotation:90,
            text:"Rotation 90",
            fontSize: 14,
            fillStyle:'#040',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p2,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            rotation:135,
            text:"Rotation 135",
            fontSize: 14,
            fillStyle:'#040',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Text({
            point:cood(p2,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            rotation:205,
            text:"Rotation 205",
            fontSize: 14,
            fillStyle:'#040',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);

        feature = new WRAP.Geo.Feature.Text({
            point:cood(p2,0,offset,normalize),
            offsetX:20,
            offsetY:0,
            rotation:270,
            text:"Rotation 270",
            fontSize: 14,
            fillStyle:'#040',
            strokeStyle:'#FFF',
            align:'left',
        });
        layer.addFeature(feature);

        WRAP.Geo.invalidate();                          // レンダリング
    }
    
    this.image = function(offset, normalize) {
        layer.clear();
        
        var p1 = [140,40];
        
        var feature;
        
        feature = new WRAP.Geo.Feature.Image({
            point:cood(p1,0,offset,normalize),
            image:'img/place.png',
            width:24,
            height:24,
            offsetX:-12,
            offsetY:-12
        });
        layer.addFeature(feature);
        feature.data = "Image ofset(-12,-12)";
        label(cood(p1,0,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.Point({          // スタイル
            point:cood(p1,0,offset,normalize),          // 座標列
            fillStyle:'red',                            // ポイント色
            strokeStyle:'white',                        // 線色
            pointSize:8
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Image({
            point:cood(p1,10,offset,normalize),
            image:'img/place.png',
            width:24,
            height:24,
            offsetX:0,
            offsetY:0
        });
        layer.addFeature(feature);
        feature.data = "Image ofset(0,0)";
        label(cood(p1,10,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.Point({          // スタイル
            point:cood(p1,10,offset,normalize),          // 座標列
            fillStyle:'red',                            // ポイント色
            strokeStyle:'white',                        // 線色
            pointSize:8
        });
        layer.addFeature(feature);
        
        feature = new WRAP.Geo.Feature.Image({
            point:cood(p1,-10,offset,normalize),
            image:'img/heliport.png',
            width:24,
            height:24,
            offsetX:-12,
            offsetY:-12,
            rotation:45
        });
        layer.addFeature(feature);
        feature.data = "Image rotation 45";
        label(cood(p1,-10,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.Point({          // スタイル
            point:cood(p1,-10,offset,normalize),          // 座標列
            fillStyle:'red',                            // ポイント色
            strokeStyle:'white',                        // 線色
            pointSize:8
        });
        layer.addFeature(feature);        
        
        
        WRAP.Geo.invalidate();                          // レンダリング
    }

    this.tile = function(offset, normalize) {
        layer.clear();
        
        var pos_0 = [140,40];
        
        WRAP.Geo.invalidate();          // レンダリング
    }

    
    this.point = function(offset, normalize) {
        layer.clear();
        var p = [
             [141.407305,42.917676],
             [139.649492,35.863970],
             [137.012773,35.220337],
             [135.518633,34.716174],
             [126.993242,37.415394],
             [116.358477,39.750977],
             [121.719805,25.137156],
             [114.249102,22.483961],
             [121.631914,31.176927],
             [101.768633,2.956017],
             [-0.184492,51.489474],
             [2.276445,49.017573],
             [13.438555,52.517442],
             [14.405352,50.044319],
             [16.338945,48.379478],
             [12.823320,41.879236],
             [28.731523,41.089145],
             [-3.612227,40.356446],
             [46.749102,24.578925],
             [18.008867,-33.823126],
             [30.665117,-29.638576],
             [151.251055,-33.896111],
             [174.893633,-36.904375],
             [-122.264570,37.624523],
             [-118.045820,34.063424],
             [-117.342695,32.520718],
             [-99.237227,19.613434],
             [-75.243086,39.818517],
             [-75.682539,45.561623],
             [-73.397383,45.561623],
             [-79.110273,43.875585],
             [-66.893477,10.111462],
             [-74.012617,4.797417],
             [-78.670820,-0.030952],
             [-76.913008,-12.069590],
             [-38.592695,-13.184514],
             [-43.602461,-19.671736],
             [-46.678633,-23.672875],
             [-56.170820,-34.767043],
             [-58.368086,-34.622516],
             [-70.672773,-33.676970],
             [-57.577070,-25.272689],
             [13.262773,-8.785385],
             [36.729570,-1.261319],
             [39.014727,-6.608050],
             [3.946367,6.459229],
             [39.893633,21.587801],
             [-77.132734,39.003670],
             [-73.748945,40.690491],
             [37.564531,55.709676],
             [100.713945,13.466374],
             [77.247148,28.509079],
             [72.764727,18.949754],
        ];
        
        for ( var i = 0 ; i < p.length ; i++ ) {
            var point = p[i];
            var cp = cood(point,0,offset,normalize);
            if ( i == 0 ) {
                feature = new WRAP.Geo.Feature.Point({              // スタイル
                     point:cp,                                      // 座標列
                     fillStyle:'blue',                              // ポイント色
                     strokeStyle:'yellow',                          // 線色
                     lineWidth:4,                                   // 線幅
                     pointSize:12
                });
                feature.data = "position ("+cp[0]+", "+cp[1];
                layer.addFeature(feature);
                label(cood(point,0,offset,normalize), "lineWidth=4 Blue&Yellow")
                
            }
            if ( i == 6 ) {
                feature = new WRAP.Geo.Feature.Point({              // スタイル
                    point:cp,                                       // 座標列
                    fillStyle:'cyan',                               // ポイント色
                    strokeStyle:'black',                            // 線色
                    lineWidth:2,                                    // 線幅
                    pointSize:12,
                    sensorSize:32                                   // マウス反応範囲
                });
                feature.data = "position ("+cp[0]+", "+cp[1];
                layer.addFeature(feature);
                label(cood(point,0,offset,normalize), "   sensorSize=32")
            }
            else {
                feature = new WRAP.Geo.Feature.Point({              // スタイル
                    point:cp,                                       // 座標列
                    fillStyle:'red',                                // ポイント色
                    strokeStyle:'white',                            // 線色
                    pointSize:12
                });
                feature.data = "position ("+cp[0]+", "+cp[1];
                layer.addFeature(feature);
            }
        }
        
        WRAP.Geo.invalidate();          // レンダリング
    }

    this.option = function(offset, normalize) {
        layer.clear();
        
        var p1 = [
            [140.088945,39.683371],
            [141.319414,36.006297],
            [148.438555,33.037981],
            [157.579180,32.000461],
            [167.862383,33.552224],
            [171.553789,37.415394],
            [169.883867,42.335668],
            [163.643633,45.376712],
            [154.942461,46.899110],
            [144.659258,46.173613],
            [140.088945,39.683371]
        ];
        
        var feature;
        
        feature = new WRAP.Geo.Feature.GeoLine({        // スタイル
            path:[cood(p1,-20,offset,normalize)],       // 座標列
            fillStyle:'rgba(255,255,100,0.6)',          // フィルカラー
            strokeStyle:'#088',                         // ラインカラー
            lineWidth:2,                                // ライン幅
            geodesic:false,
            option:'cloud'
        });
        layer.addFeature(feature);
        feature.data = "Cloud";
        label(cood(p1[0],-20,offset,normalize), feature.data)
        
        
        feature = new WRAP.Geo.Feature.GeoLine({        // スタイル
            path:[cood(p1,0,offset,normalize)],       // 座標列
            fillStyle:'rgba(255,128,100,0.6)',          // フィルカラー
            strokeStyle:'#808',                         // ラインカラー
            lineWidth:2,                                // ライン幅
            geodesic:false,
            option:'inset'
        });
        layer.addFeature(feature);
        feature.data = "Inset";
        label(cood(p1[0],0,offset,normalize), feature.data)
        
        feature = new WRAP.Geo.Feature.GeoLine({        // スタイル
            path:[cood(p1,20,offset,normalize)],       // 座標列
            fillStyle:'rgba(50,200,200,0.6)',          // フィルカラー
            strokeStyle:'#080',                         // ラインカラー
            lineWidth:2,                                // ライン幅
            geodesic:false,
            option:'outset'
        });
        layer.addFeature(feature);
        feature.data = "Outset (Countour Clockwize)";
        label(cood(p1[0],20,offset,normalize), feature.data)
        
        
        
        
        WRAP.Geo.invalidate();          // レンダリング
    }
    
    var self = this;
    WRAP.Geo.addEventHandler('boundsChange', function() {
                             layer._dc = {};
                             WRAP.Geo.invalidate();          // レンダリング
                             
    });
    
 }