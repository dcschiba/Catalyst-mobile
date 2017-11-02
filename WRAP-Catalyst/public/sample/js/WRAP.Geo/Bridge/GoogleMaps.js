
WRAP.Geo.setGoogleMaps = function(map) {

    WRAP.Geo.map = new WRAP.Geo.Bridge.GoogleMaps(map);
    var GoogleMaps = WRAP.Geo.map.map;
    
    function OverlayMapType(tileSize) {
        this.tileSize = tileSize;
    }
    
    OverlayMapType.prototype.getTile = function(coord, z, ownerDocument) {
        var m = Math.pow(2,z);
        var x = coord.x%m;
        var y = m-coord.y-1;
        var id = WRAP.Geo.map.tileID(z,y,x);
        var cvs = document.getElementById(id);
//console.log("g_tile="+id);
        if ( cvs )
            return cvs;
        cvs = ownerDocument.createElement('canvas');
        cvs.id = id;
        cvs.width = 256, cvs.height = 256;
        cvs.ctx = cvs.getContext("2d");
        cvs.pix = cvs.ctx.createImageData(256,256);
        setTimeout(function() { WRAP.Geo.render(); }, 10);
        return cvs;
    }
  
    WRAP.Geo.map.overland_layer = new OverlayMapType(new google.maps.Size(256, 256));
    WRAP.Geo.map.overland_layer_index = GoogleMaps.overlayMapTypes.length;
    GoogleMaps.overlayMapTypes.push(null); // reserve maptype placeholder
    
    WRAP.Geo.map.setOverLandLayer(true);
    return WRAP.Geo.map;
}

WRAP.Geo.Bridge.GoogleMaps = function(map) {
    var self = this;
    this.map = map;
    this.markers = [];
    this.lines = [];
    this.touch = null;
    
    this.context = new WRAP.Geo.Context(this);
    
    this.zoom = map.getZoom();
    this.center = map.getCenter();
    this.projection = map.getProjection();
    this.bounds = map.getBounds();
    
    this.tileID = function(z, y, x) {
        return "G/"+z+"/"+y+"/"+x;
    }
    
    this.updateBounds = function(changing) {
        self.projection = map.getProjection();
        self.center = map.getCenter();
        self.zoom = map.getZoom();
        self.bounds = map.getBounds();
        if ( !self.bounds || !self.projection )
            return;
        var bounds = self.bounds;
        var ne = bounds.getNorthEast();
        var sw = bounds.getSouthWest();
        var nep = self.projection.fromLatLngToPoint(ne);
        var swp = self.projection.fromLatLngToPoint(sw);
        var s = Math.pow(2,self.zoom);
        var min_x = Math.floor(swp.x*s/256);
        var max_x = Math.floor(nep.x*s/256);
        var min_y = s-Math.floor(swp.y*s/256)-1;
        var max_y = s-Math.floor(nep.y*s/256)-1;
        
        function addTile(context, z, y, x) {
            var tile = context.findTile(z, y, x);
            if ( tile ) {
                tile.locked = false;
                return;
            }
//console.log("addTile z="+z+" y="+y+" x="+x);
            var cood = new Float32Array(256*256*2);
            
            var zz = Math.pow(2,parseInt(z));
            var xx = 256*(parseFloat(x))/zz;
            var yy = 256*(zz-parseFloat(y)-1)/zz;
            var offset = 1.0/zz;
            
            var c = {x:[256],y:[256]};
            for ( var i = 0 ; i < 256 ; i++ ) {
                var xxx = xx + offset*parseFloat(i);
                var yyy = yy + offset*parseFloat(i);
                var xp = self.projection.fromPointToLatLng(new google.maps.Point(xxx,yy));
                c.x[i] = xp.lng();
                if ( c.x[i] < 0 )
                    c.x[i] += 360.0;
                else if ( c.x[i] >= 360 )
                    c.x[i] -= 360.0;
                var yp = self.projection.fromPointToLatLng(new google.maps.Point(xx,yyy));
                c.y[i] = yp.lat();
            }
            var i = 0;
            for ( var yi = 0 ; yi < 256 ; yi++ ) {
                for ( var xi = 0 ; xi < 256 ; xi++ ) {
                    cood[i++] = c.y[yi];
                    cood[i++] = c.x[xi];
                }
            }
            context.addTile("M", z, y, x, cood,
                            new WRAP.Geo.Bounds(cood[0]*60.0, cood[2*256*255]*60.0, cood[2*256*256-1]*60.0, cood[1]*60.0));
        }

//console.log("updateBounds y="+min_y+"->"+max_y+" x="+min_x+"->"+max_x);
        
        if ( !changing ) {
            this.context.lockTile();
            var w = Math.pow(2,self.zoom);
            for ( var y = min_y ; y <= max_y ; y++ ) {
                if ( min_x <= max_x ) {
                    for ( var x = min_x ; x <= max_x ; x++ )
                        addTile(this.context, self.zoom, y, x);
                }
                else {
                    for ( var x = min_x ; x < w ; x++ )
                        addTile(this.context, self.zoom, y, x);
                    for ( var x = 0 ; x <= max_x ; x++ )
                        addTile(this.context, self.zoom, y, x);
                }
            }
            this.context.clearLockedTile();
        }
        
        WRAP.Geo.updateBounds(new WRAP.Geo.Bounds(ne.lat()*60.0, sw.lat()*60.0, ne.lng()*60.0, sw.lng()*60.0), changing);
    }
    
    window.setTimeout(function() {
        self.updateBounds();
    }, 1000);
    
    google.maps.event.addListener(map, 'zoom_changed', function() {
        self.updateBounds();
    });
    
    google.maps.event.addListener(map, 'bounds_changed', function() {
        if ( self.touch ) {
            if ( self.touch.feature && self.touch.feature.mouseout )
                self.touch.feature.mouseout();
                self.touch = null;
        }
        self.updateBounds(true);
    });
    
    google.maps.event.addListener(map, 'idle', function() {
        if ( self.touch ) {
            if ( self.touch.feature && self.touch.feature.mouseout )
                self.touch.feature.mouseout();
            self.touch = null;
        }
        self.updateBounds();
    });
    
    google.maps.event.addListener(map, 'mousemove', function (event) {
        self.mouse_point = new WRAP.Geo.Point(event.latLng.lat()*60, event.latLng.lng()*60);
        self.mouse_screenpoint = new WRAP.Geo.ScreenPoint(event.pixel.x, event.pixel.y);
    });
    
    google.maps.event.addListener(map, 'click', function (event) {
        self.mouse_point = new WRAP.Geo.Point(event.latLng.lat()*60, event.latLng.lng()*60);
        self.mouse_screenpoint = new WRAP.Geo.ScreenPoint(event.pixel.x, event.pixel.y);
    });

    this.setOverLandLayer = function(show) {
        this.map.overlayMapTypes.setAt(WRAP.Geo.map.overland_layer_index,
                                         show?WRAP.Geo.map.overland_layer:null);
    }
    
    this.setTile = function(tile, revision) {
        var id = self.tileID(tile.z, tile.y, tile.x);
        var cvs = document.getElementById(id);
        if ( !cvs ) {
//            console.log("Tile not found "+id);
            return;
        }
        if ( cvs.revision != revision ) {
            cvs.revision = revision;
            cvs.ctx.clearRect(0,0,256,256);
            cvs.ctx.drawImage(tile.canvas,0,0);
        }
    }
    
    this.getScreenPoint = function(pt) {
        if ( this.projection ) {
            var m = this.projection.fromLatLngToPoint(new google.maps.LatLng(pt.latDegree(), pt.lonDegree()));
            var c = this.projection.fromLatLngToPoint(this.center);
            var dx = m.x-c.x, dy = m.y-c.y;
            if ( dx < -128 ) dx += 256;
            if ( dy >= 128 ) dx -= 256;
            var s = Math.pow(2, this.zoom);
            var x = map.getDiv().offsetWidth*0.5+dx*s;
            var y = map.getDiv().offsetHeight*0.5+dy*s;
            return new WRAP.Geo.ScreenPoint(parseInt(x), parseInt(y));
        }
        return new WRAP.Geo.ScreenPoint(0,0);
    }

    this.getPoint = function(pt) {
        if ( this.projection ) {
            var x = pt.x-map.getDiv().offsetWidth*0.5;
            var y = pt.y-map.getDiv().offsetHeight*0.5;
            var c = this.projection.fromLatLngToPoint(this.center);
            var s = Math.pow(2, this.zoom);
            var px = c.x+x/s;
            var py = c.y+y/s;
            var ll = this.projection.fromPointToLatLng(new google.maps.Point(px, py));
            return new WRAP.Geo.Point(ll.lat()*60.0, ll.lng()*60.0);
        }
        return new WRAP.Geo.Point(0,0);
    }

    this.getCenterPoint = function() {
        return new WRAP.Geo.Point(self.center.lat()*60.0, self.center.lng()*60.0);
    }

    this.setCenterPoint = function(pt) {
        map.setCenter((this.center = new google.maps.LatLng(pt.latDegree(), pt.lonDegree())));
    }

    this.getZoom = function() {
        return this.zoom;
    }

    this.setZoom = function(zoom) {
        map.setZoom((this.zoom = zoom));
    }
    
    this.getPerspective = function(pts, margin) {
        if ( !this.projection || !pts || !pts.length )
            return { center:this.getCenterPoint(), zoom:this.zoom };
        if (margin === void 0)
            margin = 0;
        var lat = pts[0].lat;
        var lon = pts[0].lon;
        var min_lat = lat, max_lat = lat, min_lon = lon, max_lon = lon;
        for ( var i = 1 ; i < pts.length ; i++ ) {
            var lat = pts[i].lat;
            var d = pts[i].lon - lon;
            if ( d >= 10800 )
                lon = pts[i].lon-21600;
            else if ( l < -10800 )
                lon = pts[i].lon+21600;
            else
                lon = pts[i].lon
            if ( min_lon > lon )
                min_lon = lon;
            if ( max_lon < lon )
                max_lon = lon;
            if ( min_lat > lat )
                min_lat = lat;
            if ( max_lat < lat )
                max_lat = lat;
        }
        if ( lon < -10800 )
            lon += 21600;
        else if ( lon >= 10800 )
            lon -= 21600;
        
        var lt = this.projection.fromLatLngToPoint(new google.maps.LatLng(min_lat/60.0, min_lon/60.0));
        var rb = this.projection.fromLatLngToPoint(new google.maps.LatLng(max_lat/60.0, max_lon/60.0));
        var cy = (lt.y+rb.y)/2;
        var cx = (rb.x+lt.x)/2;
        var center = this.projection.fromPointToLatLng(new google.maps.Point(cx, cy));
        lat = center.lat();
        lon = center.lng();
        var dy = lt.y-rb.y;
        var dx = Math.abs(rb.x-lt.x);
        var w = map.getDiv().offsetWidth - margin*2;
        var h = map.getDiv().offsetHeight - margin*2;
        
        var log2 = Math.log(2);
        var yz = dy>0?(Math.log(h/dy)/log2):this.zoom;
        var xz = dx>0?(Math.log(w/dx)/log2):this.zoom;
        var zoom = Math.floor(yz<xz?yz:xz);
        if ( zoom > 19 ) zoom = 19;
        return { center:new WRAP.Geo.Point(lat*60.0, lon*60.0), zoom:zoom };
    }
    
    this.getDistance = function(p0, p1) {
        var g0 = new google.maps.LatLng(p0.latDegree(), p0.lonDegree());
        var g1 = new google.maps.LatLng(p1.latDegree(), p1.lonDegree());
        return google.maps.geometry.spherical.computeDistanceBetween(g0, g1);
    }
    
    this.getCurrentPoint = function() {
        return { point:this.mouse_point, screenpoint:this.mouse_screenpoint };
    }
    
    this.update = function() {
        
    }
    
    this.enableScroll = function(enable) {
        this.map.setOptions({draggable:enable});
    }
}


