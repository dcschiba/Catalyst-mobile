
WRAP.Geo.setOpenLayers = function(map) {

    WRAP.Geo.map = new WRAP.Geo.Bridge.OpenLayers(map);

    return WRAP.Geo.map;
}

WRAP.Geo.Bridge.OpenLayers = function(map) {
    var self = this;
    this.tile_prefix = "o_";

    this.map = map;
    this.view = map.getView();
    
    this.context = new WRAP.Geo.Context(this);
    
    this.canvas;
    this.tile_revistion = {};
    
    this.tiles = [];
    
    this.markers = [];
    this.lines = [];
    this.touch = null;
    
    this.zoom = this.view.getZoom();
    this.center = this.view.getCenter();
//    this.projection = 0;//map.getProjection();
    this.bounds = 0;//map.getBounds();

    this.tileID = function(z, y, x) {
        return "G/"+z+"/"+y+"/"+x;
    }
    
    this.updateBounds = function(changing) {

        var extent = ol.proj.get("EPSG:3857").getExtent();
        
        self.zoom = self.view.getZoom();
        self.center = self.view.getCenter();
        var size = self.map.getSize();
        var nwp = self.map.getCoordinateFromPixel([0,0]);
        var sep = self.map.getCoordinateFromPixel(size);
        var nw = ol.proj.transform(nwp, 'EPSG:3857', 'EPSG:4326');
        var se = ol.proj.transform(sep, 'EPSG:3857', 'EPSG:4326');
        self.bounds = new WRAP.Geo.Bounds(nw[1]*60, se[1]*60,nw[0]*60, se[0]*60);
        var s = Math.pow(2,self.zoom);
//console.log("----------- "+s);
        
        nwp[0] -= extent[0];
        sep[0] -= extent[0];
        nwp[1] -= extent[1];
        sep[1] -= extent[1];
        var ew = extent[2]-extent[0];
        var eh = extent[3]-extent[1];
        nwp[0] = nwp[0]/ew*256;
        sep[0] = sep[0]/ew*256;
        nwp[1] = nwp[1]/eh*256;
        sep[1] = sep[1]/eh*256;
        
        var min_x = Math.floor(nwp[0]*s/256);
        var max_x = Math.floor(sep[0]*s/256);
        var min_y = Math.floor(sep[1]*s/256);
        var max_y = Math.floor(nwp[1]*s/256);
        
        function addTile(context, z, y, x) {
            var tile = context.findTile(z, y, x);
            if ( tile ) {
                tile.locked = false;
                return;
            }
            //console.log("addTile z="+z+" y="+y+" x="+x);
            var cood = new Float32Array(256*256*2);
            
//            var extent = ol.proj.get("EPSG:3857").getExtent();
            
            var zz = Math.pow(2,parseInt(z));
            var xx = (parseFloat(x))/zz;
            var yy = (parseFloat(y)+1)/zz;
            
            xx = xx*(extent[2]-extent[0])+extent[0];
            yy = yy*(extent[3]-extent[1])+extent[1];
            var xd = (extent[2]-extent[0])/zz/256;
            var yd = (extent[3]-extent[1])/zz/256;
            
            var c = {x:[256],y:[256]};
            for ( var i = 0 ; i < 256 ; i++ ) {
                var xxx = xx + xd*parseFloat(i);
                var yyy = yy - yd*parseFloat(i);
                var xp = ol.proj.transform([xxx,yy], 'EPSG:3857', 'EPSG:4326');
                c.x[i] = xp[0];
                if ( c.x[i] < 0 )
                    c.x[i] += 360.0;
                else if ( c.x[i] >= 360.0 )
                    c.x[i] -= 360.0;
                var yp = ol.proj.transform([xx,yyy], 'EPSG:3857', 'EPSG:4326');
                c.y[i] = yp[1];
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
        
        WRAP.Geo.updateBounds(self.bounds, changing);
//        console.log("n="+nw[1]+" s="+se[1]+"w="+nw[0]+" e="+se[0]+" zoom="+self.zoom);
//        console.log("nwp[1]="+nwp[1]+" sep[1]="+sep[1]+"nwp[0]="+nwp[0]+" sep[0]="+sep[0]);
//        console.log("min_y="+min_y+" max_y="+max_y+"min_x="+min_x+" max_x="+max_x);
    }
    
    window.setTimeout(function() {
        self.updateBounds();
    }, 1000);
    
    this.setTile = function(tile, revision) {
        if ( !self.canvas )
            return;
        
        var id = self.tileID(tile.z, tile.y, tile.x);
        if ( self.tile_revistion[id] == revision )
            return;
        self.tile_revistion[id] = revision;
        
        var extent = ol.proj.get("EPSG:3857").getExtent();
        var zz = Math.pow(2,parseInt(tile.z));
        var xx = (parseFloat(tile.x))/zz;
        var yy = (parseFloat(tile.y+1))/zz;
        xx = xx*(extent[2]-extent[0])+extent[0];
        yy = yy*(extent[3]-extent[1])+extent[1];
        

        var dst = self.map.getPixelFromCoordinate([self.canvas.extent[0], self.canvas.extent[3]]);
        var src = self.map.getPixelFromCoordinate([xx,yy]);
        
        //console.log("dst="+dst[0]+","+dst[1]+" src="+src[0]+","+src[1]);
        //console.log("pos="+(src[0]-dst[0])+","+(src[1]-dst[1]));
        
//        var x = Math.floor(src[0]-dst[0]);
//        var y = Math.floor(src[1]-dst[1]);
        var x = Math.floor(src[0])-Math.floor(dst[0]);
        
//console.log("tile x="+tile.x+" canvas x="+x);
        var y = Math.floor(src[1])-Math.floor(dst[1]);
        self.canvas.ctx.clearRect(x,y,256,256);
        self.canvas.ctx.drawImage(tile.canvas,x,y);
    }
    
    this.map.on('move', function(/*e*/) {
        self.updateBounds(true);
    });
    
    this.map.on('moveend', function(/*e*/) {
        self.updateBounds();
    });
    
    this.map.on('pointermove', function(e) {
        var point = self.map.getPixelFromCoordinate(e.coordinate);
        var ll = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
        self.mouse_point = new WRAP.Geo.Point(ll[1]*60, ll[0]*60);
        self.mouse_screenpoint = new WRAP.Geo.ScreenPoint(point[0], point[1]);
//        console.log("mouse="+point[0]+","+point[1]+" pos="+ll[1]+","+ll[0]);
    });
    
    
    var canvasFunction = function(extent, resolution, pixelRatio, size, projection) {
        resolution=null;
        pixelRatio=null;
        projection=null;
        

        self.tile_revistion = {};
        self.canvas = document.createElement('canvas');
        self.canvas.ctx = self.canvas.getContext("2d");
        self.canvas.extent = extent;
        
        var canvasWidth = size[0], canvasHeight = size[1];
        self.canvas.setAttribute('width', canvasWidth);
        self.canvas.setAttribute('height', canvasHeight);

/*
        // Canvas extent is different than map extent, so compute delta between
        // left-top of map and canvas extent.
        var mapExtent = map.getView().calculateExtent(map.getSize())
        var canvasOrigin = map.getPixelFromCoordinate([extent[0], extent[3]]);
        var mapOrigin = map.getPixelFromCoordinate([mapExtent[0], mapExtent[3]]);
        var delta = [mapOrigin[0]-canvasOrigin[0], mapOrigin[1]-canvasOrigin[1]]
        
        //console.log("canvasFunc extent "+extent[0]+","+extent[3]);
        //console.log("canvasFunc mapExtent"+mapExtent[0]+","+mapExtent[3]);
        
        var bottomLeft = ol.proj.transform(ol.extent.getBottomLeft(extent),
                                           'EPSG:3857', 'EPSG:4326');
        var topRight = ol.proj.transform(ol.extent.getTopRight(extent),
                                         'EPSG:3857', 'EPSG:4326');
        var endof_left   = bottomLeft[0];
        var endof_bottom = bottomLeft[1];
        var endof_right  = topRight[0];
        var endof_top    = topRight[1];
        
        console.log("left-bottom="+endof_left+","+endof_bottom);
        console.log("right-top="+endof_right+","+endof_top);
*/
        
        // draw test
/*
        var ctx = self.canvas.ctx;
        ctx.strokeStyle = 'rgba(255,20,20,0.6)';
        var ox = canvasWidth/2;
        var oy = canvasHeight/2;
        ctx.moveTo(ox+32,oy+32);
        ctx.lineTo(ox+32,oy+224);
        ctx.lineTo(ox+224,oy+224);
        ctx.lineTo(ox+224,oy+32);
        ctx.closePath();
        ctx.lineWidth = 3;
        ctx.stroke();
*/
//        WRAP.Geo.render();
        
        return self.canvas;
    };
    
    var canvasLayer = new ol.layer.Image({
        source: new ol.source.ImageCanvas({
            canvasFunction: canvasFunction,
            projection: 'EPSG:3857'
        })
    });
    this.map.addLayer(canvasLayer);
    
    this.getScreenPoint = function(pt) {
        if ( !pt )
            return new WRAP.Geo.ScreenPoint(0,0);
        var cood = ol.proj.transform([pt.lonDegree(), pt.latDegree()], 'EPSG:4326', 'EPSG:3857');
        if ( !cood )
            return new WRAP.Geo.ScreenPoint(0,0);
        var point = self.map.getPixelFromCoordinate(cood);
        if ( !point )
            return new WRAP.Geo.ScreenPoint(0,0);
        return new WRAP.Geo.ScreenPoint(point[0], point[1]);
    }

    this.getPoint = function(pt) {
        if ( !pt )
            return new WRAP.Geo.Point(0,0);
        var point = self.map.getCoordinateFromPixel([pt.x, pt.y]);
        if ( !point )
            return new WRAP.Geo.Point(0,0);
        var ll = ol.proj.transform(point, 'EPSG:3857', 'EPSG:4326');
        return new WRAP.Geo.Point(ll[1]*60,ll[0]*60);
    }

    this.getCenterPoint = function() {
        var cood = this.view.getCenter();
        var ll = ol.proj.transform(cood, 'EPSG:3857', 'EPSG:4326');
        return new WRAP.Geo.Point(ll[1]*60.0, ll[0]*60.0);
    }

    this.setCenterPoint = function(pt) {
        this.view.setCenter(ol.proj.transform([pt.lonDegree(), pt.latDegree()], 'EPSG:4326', 'EPSG:3857'));
    }

    this.getZoom = function() {
        return this.zoom;
    }

    this.setZoom = function(zoom) {
        this.view.setZoom((this.zoom = zoom));
    }

    this.getCurrentPoint = function() {
        return { point:this.mouse_point, screenpoint:this.mouse_screenpoint };
    }
    
    this.update = function(redraw) {
        if ( redraw )
            this.updateBounds();
        this.map.render();
    }
    
    this.enableScroll = function(enable) {
        this.map.getInteractions().forEach(function(interaction) {
            if (interaction instanceof ol.interaction.DragPan) {
                interaction.setActive(enable);
            }
        }, this);
    }
    
    
}


