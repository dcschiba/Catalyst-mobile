
WRAP.Geo.Interaction = (function () {

    var base_div;
                      
    var tooltip;
    var tooltip_z = 10000;
    var tooltip_bgcolor = '#2e3a54';
    var tooltip_fgcolor = '#ffffff';
    var tooltip_border = '#ffffff';
    var arrow_offset = 20;
                  
    var camera_window = [];
    var current_camera;
    var camera_ox = 10;
    var camera_oy = 10;
    var camera_z = 20000;
    var camera_w = 640;
    var camera_h = 480;
    var camera_s = 0.3;
    var camera_m = 0.6;
    var camera_header = 26;
    var camera_footer = 20;
    var camera_bgcolor = '#f2f2f2';
    var camera_border = 'rgba(150,150,150,0.6)';
    var camera_sw = Math.floor(camera_w*camera_s);
    var camera_sh = Math.floor(camera_h*camera_s);
    var camera_mw = Math.floor(camera_w*camera_m);
    var camera_mh = Math.floor(camera_h*camera_m);
/*
    function isNumber(x){
        if( typeof(x) != 'number' && typeof(x) != 'string' )
            return false;
        else
            return (x == parseFloat(x) && isFinite(x));
    }
                      
    function pointStr(lat, lon) {
        var s = {lat:"", lon:""};
        var lat_m = 'N';
        if ( lat < 0 ) {
            lat = -lat;
            lat_m = 'S';
        }
        var lon_m = 'E';
        if ( lon < 0 ) {
            lon = -lon;
            lon_m = 'W';
        }
        var deg, m, min;
        deg = Math.floor(lat/60);
        m = (lat-deg*60)*60;
        min = Math.floor(m);
        s.lat  += deg;
        s.lat += "°";
        s.lat += min;
        s.lat += "'";
        s.lat += lat_m;
        deg = Math.floor(lon/60);
        m = (lon-deg*60)*60;
        min = Math.floor(m);
        s.lon  += deg;
        s.lon += "°";
        s.lon += min;
        s.lon += "'";
        s.lon += lon_m;
        return s;
    }

    var d16 = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    for ( var i = 0 ; i < 16 ; i++ )
        d16[i] = d16[i].replace(/N/g, "北").replace(/S/g, "南").replace(/W/g, "西").replace(/E/g, "東");
                      
    function dirStr(dir) {
        if ( !isNumber(dir) )
            return "";
        dir += (360/16)/2;
        while ( dir < 0 )
            dir += 360;
        while ( dir >= 360 )
            dir -= 360;
        dir = Math.floor(dir/(360/16));
        return d16[dir];
    }
*/
    function mouseOverHandler(layer, data, point) {
        if ( !layer || !data || !data.value )
            return;
        var data = data&&data.value();
        if ( data ) {
            var content;
            if ( layer.name().indexOf("LiveCamera") == 0 ) {
                var cw
                if ( !(cw=findCameraWindow(data.area_name)) )
                    cw = new LiveCameraWindow(data);
                activateCameraWindow(cw);
                if ( current_camera != cw ) {
                    var last_camera = current_camera;
                    if ( current_camera && current_camera.tooltip )
                        current_camera.hide();
                    current_camera = cw;
                    if ( last_camera )
                        last_camera.set();
                    if ( !current_camera.visible ) {
                        current_camera.tooltip = true;
                        cw.show(data.lat, data.lon);
                    }
                    current_camera.set();
                }
            }
            else {
                if ( layer._tooltip_handler ) {
                  content = layer._tooltip_handler(data);
                }
            }
            if ( content && content.length ) {
                setTooltip(content);
                showTooltip(point.x,point.y);
                return;
            }
        }
        clearTooltip();
    }


    function mouseOutHandler(layer/*, data, point*/) {
        if ( !layer )
            return;
        clearTooltip();
        if ( layer.name().indexOf("LiveCamera") == 0 ) {
            if ( current_camera && current_camera.tooltip ) {
                current_camera.hide();
            }
            var last_camera = current_camera;
            current_camera = null;
            if ( last_camera )
                last_camera.set();
        }
    }
                      
    function touchHandler(layer, data/*, point*/) {
        if ( !layer )
            return;
        clearTooltip();
        if ( layer.name().indexOf("LiveCamera") == 0 ) {
            if ( current_camera && current_camera.tooltip ) {
                data.query("image").load(function() {
//                    console.log("loaded");
                });
                current_camera.tooltip = false;
                current_camera.set();
            }
        }
    }

    function boundsChangeHandler() {
        for ( var i = 0 ; i < camera_window.length ; i++ ) {
            var w = camera_window[i];
            if ( !w.pinned )
                continue;
            var sp = WRAP.Geo.getScreenPoint(w.window.point);
            sp.x += camera_ox;
            sp.y += camera_ox;
            w.window.style.left = sp.x + 'px';
            w.window.style.top = sp.y + 'px';
        }
    }
                      
    function visibilityChangeHandler(layer) {
        if ( layer.name().indexOf("LiveCamera") == 0 ) {
            for ( var i = 0 ; i < camera_window.length ; i++ ) {
                var w = camera_window[i];
                  if ( layer.visible()) {
                        w.window.style.display = w.visible?'block':'none';
                  }
                  else {
                        w.window.style.display = 'none';
                        w.setImage(0);
                  }
                  w.animating = false;
            }
            if ( WRAP.Geo.Interaction.live_camera._data.handler
             && (WRAP.Geo.Interaction.live_camera._data.handler.auto_update=layer.visible()) )
                WRAP.Geo.Interaction.live_camera.load();
        }
        if ( layer.name().indexOf("DistanceCalculator") == 0 ) {
            if ( layer.visible() ) {
//                  layer._updateDisplayList();
//                  WRAP.Geo.draw();
            }
//                  alert("###"+(layer.visible()?"visible":"hidden"));
        }
    }

    function setStyle(style) {
        var css = document.createElement('style');
        var text = document.createTextNode(style);
        css.media = 'screen';
        css.type = 'text/css';
        if ( css.styleSheet )
            css.styleSheet.cssText = text.nodeValue;
        else
            css.appendChild(text);
        document.getElementsByTagName('head')[0].appendChild(css);
    }
                      
    function initTooltip() {
        if ( !tooltip ) {
            tooltip = document.createElement('div');
            base_div.appendChild(tooltip);
            tooltip.style.display = 'block';
            tooltip.style.top = "-1000px";
            tooltip.style.left = "-1000px";
            
            var style = 
                ".tooltip {"+
                "position: absolute;"+
                "background: "+tooltip_bgcolor+";"+
                "color: "+tooltip_fgcolor+";"+
                "border: 1px solid "+tooltip_border+";"+
                "padding: 10px;"+
                "    border-radius: 6px;"+
                "    z-index: "+tooltip_z+";"+
                "    pointer-events: none;"+
                "}"+
                
                ".lt-arrow:after, .lt-arrow:before {"+
                "right: 100%;"+
                "top: "+arrow_offset+"px;"+
                "border: solid transparent;"+
                "content: ' ';"+
                "height: 0;"+
                "width: 0;"+
                "position: absolute;"+
                "}"+
                ".lt-arrow:after {"+
                "    border-right-color: "+tooltip_bgcolor+";"+
                "    border-width: 8px;"+
                "    margin-top: -8px;"+
                "}"+
                ".lt-arrow:before {"+
                "    border-right-color: "+tooltip_border+";"+
                "    border-width: 9px;"+
                "    margin-top: -9px;"+
                "}"+
                
                ".lb-arrow:after, .lb-arrow:before {"+
                "right: 100%;"+
                "bottom: "+arrow_offset+"px;"+
                "border: solid transparent;"+
                "content: ' ';"+
                "height: 0;"+
                "width: 0;"+
                "position: absolute;"+
                "}"+
                ".lb-arrow:after {"+
                "    border-right-color: "+tooltip_bgcolor+";"+
                "    border-width: 8px;"+
                "    margin-top: -8px;"+
                "}"+
                ".lb-arrow:before {"+
                "    border-right-color: "+tooltip_border+";"+
                "    border-width: 9px;"+
                "    margin-top: -9px;"+
                "}"+
                
                ".rt-arrow:after, .rt-arrow:before {"+
                "left: 100%;"+
                "top: "+arrow_offset+"px;"+
                "border: solid transparent;"+
                "content: ' ';"+
                "height: 0;"+
                "width: 0;"+
                "position: absolute;"+
                "}"+
                ".rt-arrow:after {"+
                "    border-left-color: "+tooltip_bgcolor+";"+
                "    border-width: 8px;"+
                "    margin-top: -8px;"+
                "}"+
                ".rt-arrow:before {"+
                "    border-left-color: "+tooltip_border+";"+
                "    border-width: 9px;"+
                "    margin-top: -9px;"+
                "}"+
                
                ".rb-arrow:after, .rb-arrow:before {"+
                "left: 100%;"+
                "bottom: "+arrow_offset+"px;"+
                "border: solid transparent;"+
                "content: ' ';"+
                "height: 0;"+
                "width: 0;"+
                "position: absolute;"+
                "}"+
                ".rb-arrow:after {"+
                "    border-left-color: "+tooltip_bgcolor+";"+
                "    border-width: 8px;"+
                "    margin-top: -8px;"+
                "}"+
                ".rb-arrow:before {"+
                "    border-left-color: "+tooltip_border+";"+
                "    border-width: 9px;"+
                "    margin-top: -9px;"+
                "}";
            
            setStyle(style);
        }
    }

    function setTooltip(html) {
        if ( !tooltip )
            return;
        tooltip.innerHTML = html;
    }

    function clearTooltip() {
        if ( !tooltip )
            return;
        tooltip.style.display = 'none';
        tooltip.innerHTML = "";
    }
                        
    function getTooltip() {
        if ( tooltip.style.display == 'block' ) {
            return tooltip.innerHTML;
        }
        return null;
    }

    function showTooltip(x, y) {
        if ( !tooltip || !tooltip.innerHTML )
            return;
        var pw = tooltip.parentNode.clientWidth;
        var ph = tooltip.parentNode.clientHeight;
        if ( x < 0 || x >= pw || y < 0 || y >= ph ) {
            tooltip.style.display = 'none';
            return;
        }
        tooltip.style.display = 'block';
        var tw = tooltip.clientWidth;
        var th = tooltip.clientHeight;
                      
        if ( tw >= pw )
            tw = 0;
        
        var ox = 26, oy = 14, ay = oy+arrow_offset;
        var xm , ym;
                      
        if ( x+tw+ox*2 >= pw ) {
            x -= (tw+ox);
            xm = ' r';
        }
        else {
            x += ox;
            xm = ' l';
        }
        
        if ( y < ay ) {
            y = oy;
        }
        else if ( y >= ph-oy-arrow_offset ) {
            y = ph-oy-th;
        }
        else if ( y+th-arrow_offset >= ph-ay ) {
            y -= th-arrow_offset-2;
            ym = 'b-arrow'
        }
        else {
            y -= arrow_offset;
            ym = 't-arrow'
        }
        var c = 'tooltip';
        if ( xm && ym )
            c += (xm+ym);
        tooltip.style.top = "" + y + "px";
        tooltip.style.left = "" + x + "px";
        tooltip.setAttribute('class', c);
    }

    //function hideTooltip() {
    //    if ( !tooltip )
    //        return;
    //    tooltip.style.display = 'none';
    //}
        
    function initLiveCamera(data) {
        if ( !data )
            return;
        WRAP.Geo.Interaction.live_camera = data;
        var style =
            ".smooth_tran {"+
            "-webkit-transition-duration : 0.2s;"+
            "-moz-transition-duration : 0.2s;"+
            "-o-transition-duration : 0.2s;"+
            "-ms-transition-duration : 0.2s;"+
            "}"+
            ".current_window {"+
            "box-shadow : 0px 0px 50px #fff;"+
            "border: 1px solid #fff;"+
            "}"+
            ".live_camera {"+
            "position: absolute;"+
            "background-color: "+camera_bgcolor+";"+
            "border: 1px solid "+camera_border+";"+
            "user-select: none;"+
            "-webkit-user-select: none;"+
            "-moz-user-select: none;"+
            "-ms-user-select: none;"+
            "}"+
            ".small_window {"+
            "width: "+(camera_sw)+"px;"+
            "height: "+(camera_sh+camera_header)+"px;"+
            "}"+
            ".middle_window {"+
            "width: "+(camera_mw)+"px;"+
            "height: "+(camera_mh+camera_header+camera_footer)+"px;"+
            "}"+
            ".image_s {"+
            "position: absolute;"+
            "width: 100%;"+
            "height: "+camera_sh+"px;"+
            "top: "+camera_header+"px;"+
            "background-color: #bbb;"+
            "}"+
            ".image_m {"+
            "position: absolute;"+
            "width: 100%;"+
            "height: "+camera_mh+"px;"+
            "top: "+camera_header+"px;"+
            "background-color: #bbb;"+
            "}"+
            ".camera_button {"+
            "position: absolute;"+
            "width:20px;"+
            "height:20px;"+
            "padding:0;"+
            "border:solid 1px rgba(0,0,0,0);"+
            "border-radius:4px;"+
            "cursor:pointer;"+
            "user-select: none;"+
            "-webkit-user-select: none;"+
            "-moz-user-select: none;"+
            "-ms-user-select: none;"+
            "}"+
            ".camera_button:hover {"+
            "border:solid 1px rgba(150,150,150,0.8);"+
            "}"+
            ".camera_zoomin {"+
            "top:3px; right:28px;"+
            "background:url(img/bt_zoomIn.png) no-repeat left top;"+
            "}"+
            ".camera_zoomout {"+
            "top:3px; right:28px;"+
            "background:url(img/bt_zoomOut.png) no-repeat left top;"+
            "}"+
            ".camera_close {"+
            "top:3px; right:4px;"+
            "background:url(img/closebtn.png) no-repeat left top;"+
            "}"+
            ".camera_text {"+
            "user-select: none;"+
            "-webkit-user-select: none;"+
            "-moz-user-select: none;"+
            "-ms-user-select: none;"+
            "cursor:default;"+
            "position: absolute;"+
            "font-size:11px;"+
            "color:black;"+
            "width:100px;"+
            "height:10px;"+
            "}"+
            ".camera_name {"+
            "top:0px; left:4px;"+
            "}"+
            ".camera_time {"+
            "top:11px; left:4px;"+
            "}"+
            ".camera_time_button {"+
            "font-size:10px;"+
            "color:black;"+
            "position: absolute;"+
            "bottom:"+(1)+"px;"+
            "width:32px;"+
            "height:18px;"+
            "padding:0;"+
            "vertical-align:middle;"+
            "border:solid 1px rgba(120,120,120,1.0);"+
            "border-radius:4px;"+
            "background-color: "+camera_bgcolor+";"+
            "cursor:pointer;"+
            "}"+
            ".camera_time_button:hover {"+
            "background: #fefeff;"+
            "}"+
            ".camera_time_button:disabled {"+
            "color:#999;"+
            "border:solid 1px rgba(170,170,170,0.8);"+
            "pointer-events: none;"+
            "cursor:default;"+
            "}";
                      
        setStyle(style);
                      
        data.inspect(function() {
            for ( var i = 0 ; i < camera_window.length ; i++ ) {
                var cw = camera_window[i];
                if ( cw.visible && !cw.animating && cw.index==0 )
                    cw.setImage(cw.index);
            }
        });
    }
         
    function findCameraWindow(name) {
        for ( var i = 0 ; i < camera_window.length ; i++ ) {
            if ( camera_window[i].camera.area_name == name )
                return camera_window[i];
        }
        return null;
    }
                      
    function activateCameraWindow(target) {
        var index = camera_z;
        var i = 0;
        while ( i < camera_window.length ) {
            var cw = camera_window[i];
            if ( cw == target ) {
                var j = i+1;
                while ( j < camera_window.length ) {
                    cw = (camera_window[j-1] = camera_window[j]);
                    cw.window.style["z-index"] = index++;
                    j++;
                }
                camera_window[j-1] = target;
                break;
            }
            else {
                cw.window.style["z-index"] = index++;
            }
            i++;
        }
        if ( i == camera_window.length )
            camera_window.push(target);
        target.window.style["z-index"] = index;
    }
                      
    var dragging;
    var drag_x, drag_y;
    var offset_x, offset_y;
                      
    function LiveCameraWindow(camera) {
        var self = this;
        this.camera = camera;
                      
        this.visible = false;
        this.small = true;
        this.pinned = true;
        this.tooltip = true;
        this.animating = false;
        this.smooth = false;
                      
        var w = this.window = document.createElement('div');
        w.controller = this;
        w.style.display = 'none';
        w.setAttribute('class', 'live_camera small_window');
                      
//      var c = this.canvas = document.createElement('canvas');
        var c = this.canvas = document.createElement('div');
        c.width = camera_w;
        c.height = camera_h;
        c.setAttribute('class', 'image_s');
        //var ctx = c.getContext('2d');
        //ctx.fillStyle = "black";
        //ctx.fillRect(0,0,c.width,c.height);
                      
        w.appendChild(this.name = document.createElement('div'));
        this.name.setAttribute('class', 'camera_text camera_name');
        w.appendChild(this.time = document.createElement('div'));
        this.time.setAttribute('class', 'camera_text camera_time');
        w.appendChild(this.zoom = document.createElement('button'));
        this.zoom.setAttribute('class', 'camera_button camera_zoomin');
        w.appendChild(this.close = document.createElement('button'));
        this.close.setAttribute('class', 'camera_button camera_close');
                      
        var b;
        w.appendChild(b = this.time_frst = document.createElement('button'));
        b.setAttribute('class', 'camera_time_button');
        b.innerHTML = "|＜";
        b.style.left = '100px';
        b.style.display = 'none';
        w.appendChild(b = this.time_prev = document.createElement('button'));
        b.setAttribute('class', 'camera_time_button');
        b.innerHTML = "＜";
        b.style.left = '140px';
        b.style.display = 'none';
        w.appendChild(b = this.time_play = document.createElement('button'));
        b.setAttribute('class', 'camera_time_button');
        b.innerHTML = "▶";
        b.style.left = '180px';
        b.style.display = 'none';
        w.appendChild(b = this.time_next = document.createElement('button'));
        b.setAttribute('class', 'camera_time_button');
        b.innerHTML = "＞";
        b.style.left = '220px';
        b.style.display = 'none';
        w.appendChild(b = this.time_last = document.createElement('button'));
        b.setAttribute('class', 'camera_time_button');
        b.innerHTML = "＞|";
        b.style.left = '260px';
        b.style.display = 'none';

        w.appendChild(c);
                      
        this.setImage = function(index) {
            c = this.canvas;
            c.innerHTML = "";
            this.index = index;
            this.name.innerHTML = camera.l_name;
            this.time.innerHTML = "--";
            if ( camera.image && camera.image.length ) {
                if ( index < 0 )
                    index = 0;
                if ( index >= camera.image.length )
                    index = camera.image.length-1;
                var target = camera.image[index];
                if ( target.image ) {
                    c.width = target.image.width || 600;
                    c.height = target.image.height || 480;
                    target.image.style.width = '100%';
                    target.image.style.height = '100%';
                    target.image.style['pointer-events'] = 'none';
                    c.appendChild(target.image);
                }
                var jst = WRAP.DH._timeString(WRAP.DH._setTime(WRAP.DH._time(target.time),9*3600));
                var day = Number(jst.substr(6,2));
                var hour = Number(jst.substr(9,2));
                var min = Number(jst.substr(11,2));
                this.time.innerHTML = ""+day+"日 "+hour+"時 "+min+"分";

                self.time_frst.disabled = (index==camera.image.length-1);
                self.time_prev.disabled = (index==camera.image.length-1);
                self.time_play.disabled = (camera.image.length<=1);
                self.time_next.disabled = (index==0);
                self.time_last.disabled = (index==0);
            }
            else {
                self.time_frst.disabled = true;
                self.time_prev.disabled = true;
                self.time_play.disabled = true;
                self.time_next.disabled = true;
                self.time_last.disabled = true;
            }
            this.index = index;
        }
                      
        this.close.onclick = function() {
            self.hide();
        }
                      
        this.zoom.onclick = function() {
            self.smooth = true;
            if ( self.small ) {
                self.small = false;
                self.set();
            }
            else {
                self.small = true;
                self.set();
            }
        }
                      
        this.animate = function() {
            if ( !self.animating ) {
                self.time_play.innerHTML = "▶";
                return;
            }
            self.time_play.innerHTML = "■";
            var n = self.index-1;
            if ( n < 0 )
                n = self.camera.image.length-1;
            self.setImage(n);
            setTimeout(function() {
                self.animate();
            },500);
        }
                      
        this.time_frst.onclick = function() {
            self.setImage(self.camera.image.length-1);
        }
        this.time_prev.onclick = function() {
            self.setImage(self.index+1);
        }
        this.time_play.onclick = function() {
            if ((self.animating = !self.animating) )
                self.animate();
        }
        this.time_next.onclick = function() {
            self.setImage(self.index-1);
        }
        this.time_last.onclick = function() {
            self.setImage(0);
        }
                      
        w.onmousedown = function(evt){
            dragging = this;
            drag_x = w.style.left.replace(/px/, "");
            drag_y = w.style.top.replace(/px/, "");
            offset_x = evt.clientX-drag_x;
            offset_y = evt.clientY-drag_y;
            activateCameraWindow(dragging.controller);
        };
        w.onmouseup = function(/*evt*/){
            dragging = false;
        };
        w.onmousemove = function(evt){
            if ( dragging ) {
                var x = evt.clientX - offset_x;
                var y = evt.clientY - offset_y;
                dragging.controller.pinned = true;
                dragging.point = WRAP.Geo.getPoint(new WRAP.Geo.ScreenPoint(x-camera_ox, y-camera_oy));
                dragging.style.left = x + 'px';
                dragging.style.top = y + 'px';
            }
            evt._prevent = true;
            evt.preventDefault();
        };
               
        this.set = function() {
            var c = self.smooth?'smooth_tran ':'';
            c += 'live_camera';
            c += self.small?' small_window':' middle_window';
            if ( !this.tooltip && this == current_camera )
                c += ' current_window';
            self.window.setAttribute('class', c);
                      
            c = self.smooth?'smooth_tran ':'';
            c += self.small?' image_s':' image_m';
            self.canvas.setAttribute('class', c);
                      
            self.zoom.setAttribute('class', self.small?'camera_button camera_zoomin'
                                                      :'camera_button camera_zoomout');
            self.time_frst.style.display = self.small?'none':'block';
            self.time_prev.style.display = self.small?'none':'block';
            self.time_play.style.display = self.small?'none':'block';
            self.time_next.style.display = self.small?'none':'block';
            self.time_last.style.display = self.small?'none':'block';
                      
            self.zoom.style.display = self.tooltip?'none':'block';
            self.close.style.display = self.tooltip?'none':'block';
                      
            if ( self.small || !self.visible ) {
                self.animating = false;
            }
            if ( self.small )
                self.setImage(0);
                      
            if ( self.smooth ) {
                setTimeout(function(){
                    self.smooth = false;
                    self.set();
                },250);
            }
        }
                      
        this.show = function(lat, lon) {
            self.set();
            self.visible = true;
            this.window.point = new WRAP.Geo.Point(lat, lon);
            var sp = WRAP.Geo.getScreenPoint(this.window.point);
            sp.x += camera_ox;
            sp.y += camera_ox;
            this.window.style.top = "" + sp.y + "px";
            this.window.style.left = "" + sp.x + "px";
            this.window.style.display = 'block';
        }
                      
        this.hide = function() {
            this.window.style.display = 'none';
            self.visible = false;
            self.small = true;
            self.animating = false;
            self.setImage(0);
        }
                      
        base_div.appendChild(w);
        this.setImage(0);
    }
                      
    return {
        init: function(data, div) {
            base_div = div;
            initTooltip();
            initLiveCamera(data);
            WRAP.Geo.addEventHandler("mouseover", mouseOverHandler);
            WRAP.Geo.addEventHandler("mouseout", mouseOutHandler);
            WRAP.Geo.addEventHandler("touch", touchHandler);
            WRAP.Geo.addEventHandler("boundsChange", boundsChangeHandler);
            WRAP.Geo.addEventHandler("visibilityChange", visibilityChangeHandler);
        },
                        
        setTooltip: function(html) {
            setTooltip(html);
        },
                        
        showTooltip: function(x,y) {
            showTooltip(x,y);
        },
                      
        clearTooltip: function(x,y) {
            clearTooltip(x,y);
        },
                        
        getTooltip: function() {
            return getTooltip();
        },
                        
        alignLiveCamera: function() {
            for ( var i = 0 ; i < camera_window.length ; i++ ) {
                var cw = camera_window[i];
                cw.pinned = true;
            }
            var sx = base_div.clientLeft;
            var sy = base_div.clientTop;
            var ex = sx+base_div.clientWidth;
            var ey = sy+base_div.clientHeight;
            var offset = 10;
            var w = camera_sw+offset;
            var h = camera_sh+camera_header+offset;
            for ( var x = offset ; x+w < ex ; x+=w ) {
                for ( var y = offset ; y+h < ey ; y+=h ) {
                    var nd = 99999999;
                    var nearest = null;
                    for ( var i = 0 ; i < camera_window.length ; i++ ) {
                        var cw = camera_window[i];
                        if ( cw.pinned && cw.visible ) {
                            var cwsx = cw.window.style.left.replace(/px/, "");
                            var cwsy = cw.window.style.top.replace(/px/, "");
                            //var cwex = cwsx+cw.window.style.width.replace(/px/, "");
                            //var cwey = cwsy+cw.window.style.height.replace(/px/, "");
                            //if ( sx < cwex && cwsx< ex && sy < cwey && cwsy< ey ) {
                                var dx = cwsx-x;
                                var dy = cwsy-y;
                                var d = dx*dx+dy*dy;
                                if ( nd > d ) {
                                    nd = d;
                                    nearest = cw;
                                }
                            //}
                        }
                    }
                    if ( nearest ) {
                        nearest.smooth = true;
                        nearest.small = true;
                        nearest.pinned = false;
                        nearest.window.point = WRAP.Geo.getPoint(new WRAP.Geo.ScreenPoint(x, y));
                        nearest.window.style.left = x + 'px';
                        nearest.window.style.top = y + 'px';
                        nearest.set();
                    }
                }
            }
        },
                        
        mouseover:[],
        mouseout:[],
        touch:[],
        boundsChange:[],
        visibilityChange:[]
    };
                      
}());
