
WRAP.DH.DataHandler.TMS = function(reference, conf, base) {
    
    var self = this;
    
    self.name = conf.Name;
    self.ref = reference;

    self.tile_cache = new WRAP.DH._cache(1000);
    self.data_cache = new WRAP.DH._cache(200);
    
    self.api = conf.Attributes.API;
    self.file = conf.Attributes.File;
    self.grid = conf.Attributes.DataGrid;
    self.bbox = self.grid.BoundingBox;
    self.ycoordinate = self.grid.YCoordinate || 1;
    self.min_z = self.grid.MinZoom;
    self.max_z = self.grid.MaxZoom;
    self.update_interval = parseFloat(conf.Attributes.UpdateInterval);
    
    this.load = function(ref, cb) {
        var file = conf.Attributes.TimeList;
        if ( file ) {
            WRAP.DH._getJSON(file, "Timelist", function(data) {
                if ( data.timelist ) {
                    base.timelist = data.timelist;
                    cb("completed", ref);
                }
                else if ( data.validtime ) {
                    base.validtime = data.validtime;
                    cb("completed", ref);
                }
                else {
                    if ( self.api == 'satdb' ) {
                        base.validtime = [];
                        for ( var i = 0 ; i < data.length ; i++ ) {
                            var t = data[i].split("_");
                            if ( t.length > 0 ) {
                                var s = t[t.length-1];
                                s = s.substr(0,8) + "T" + s.substr(8,6) + "00";
                                base.validtime.push(s);
                            }
                        }
                        cb("completed", ref);
                        return;
                    }
                             
                    WRAP.DH._error(self.name + " Timelist format.");
                    cb("error", null);
                }

                if ( self.update_interval > 0 ) {
                    setTimeout(function() {
                        self.ref.load();
                    }, self.update_interval*1000);
                }
            });
        }
    }

    
    function filePath(content, tile) {
        var path = [];
        
        var elements = (content.element&&Array.isArray(content.element))?content.element.length:0;
        if ( elements ) {
            for ( var i = 0 ; i < elements ; i++ ) {
                var file = self.file;
                for ( var key in content ) {
                    var v = content[key];
                    if ( key == 'element' )
                        v = content[key][i];
                    var t = "%"+key+"%";
                    if ( file.indexOf(t) >= 0 )
                        file = file.replace(t, v);
                }
                if ( tile ) {
                    for ( var key in tile ) {
                        var t = "%"+key+"%";
                        if ( file.indexOf(t) >= 0 )
                            file = file.replace(t, tile[key]);
                    }
                }
                path.push({file:file, index:i});
            }
        }
        else {
            var file = self.file;
            for ( var key in content ) {
                var v = content[key];
                if ( self.api == 'satdb' && key == 'validtime' )
                    v = v.substr(0,8)+v.substr(9,4);
                var t = "%"+key+"%";
                if ( file.indexOf(t) >= 0 )
                    file = file.replace(t, v);
            }
            if ( tile ) {
                for ( var key in tile ) {
                    var t = "%"+key+"%";
                    if ( file.indexOf(t) >= 0 )
                        file = file.replace(t, tile[key]);
                }
            }
            path.push({file:file, index:0});
        }
        
        return path;
    }
    
    function makeTileKey(content, tile_id, option) {
        var tile_key = "";
        var count = 0;
        for ( var key in content ) {
            var v = content[key];
            if ( Array.isArray(v) && v.length ) {
                var t = v[0];
                for ( var i = 0 ; i < v.length ; i++ ) {
                    t += ("+"+v[i]);
                }
            }
            if ( count++ )
                tile_key += "/";
            tile_key += v;
        }
        tile_key += "/"+tile_id;
        if ( option )
            tile_key += "/"+option;
        return tile_key;
    }
    
    this.getTile = function(content, tile_id, option) {
        var tile = this.tile_cache.get(makeTileKey(content, tile_id, option));
        if ( tile && tile.data )
            return tile.data;
//console.log("getTile false"+ makeTileKey(content, z, y, x));
        return null;
    }
    
    this.loadTile = function(content, tile_id, option, z, y, x, cood, bbox, cb) {
        cood = null;
        
        var key = makeTileKey(content, tile_id, option);
        if ( self.tile_cache.get(key) ) {
            cb();
            return;
        }
        if ( self.bbox ) {
            var north = bbox.north/60;
            var south = bbox.south/60;
            var west = bbox.west/60;
            var east = bbox.east/60;
            if ( self.bbox.North < south || self.bbox.South > north
            　|| ( (self.bbox.East < west || self.bbox.West > east)
                && (self.bbox.East+360 < west || self.bbox.West+360 > east) ) ) {
                var tile = {
                    empty:true,
                    data:new Uint8Array(4*256*256)
                };
                self.tile_cache.set(key, tile);
                cb();
                return;
            }
        }
        
        var tx = x, ty = y, tz = z;
        if ( z > self.max_z ) {
            var d = Math.pow(2,(z-self.max_z));
            tz = self.max_z;
            ty = Math.floor(y/d);
            tx = Math.floor(x/d);
            var tid = "M/"+tz+"/"+ty+"/"+tx;
            var tkey = makeTileKey(content, tid, option);
            var tile = self.tile_cache.get(tkey);
            if ( tile && tile.data ) {
                if ( tile.data.canvas ) {
                    var sw = Math.floor(256/d);
                    var canvas = document.createElement('canvas');
                    canvas.width = 256;
                    canvas.height = 256;
                    var ctx = canvas.getContext("2d");
                    var id = ctx.getImageData(0, 0, 256, 256);
                    var mx = x-tx*d;
                    var my = d-1-(y-ty*d);
                    var src = tile.data.data;
                    var dst = id.data;
                    var sy = my*sw;
                    var sx = mx*sw;
                    if ( d < 256 ) {
                        for ( var y = 0 ; y < sw ; y++ ) {
                            var sdy = y*d;
                            for ( var x = 0 ; x < sw ; x++ ) {
                                var sdx = x*d;
                                var s = ((sy+y)*256+(sx+x))*4;
                                var r = src[s], g = src[s+1], b = src[s+2], a = src[s+3];
                                for ( var dy = 0 ; dy < d ; dy++ ) {
                                    var i = ((sdy+dy)*256+sdx)*4;
                                    for ( var dx = 0 ; dx < d ; dx++ ) {
                                        dst[i++] = r;
                                        dst[i++] = g;
                                        dst[i++] = b;
                                        dst[i++] = a;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        var i = 0;
                        var s = (sy*256+sx)*4;
                        var r = src[s], g = src[s+1], b = src[s+2], a = src[s+3];
                        for ( var y = 0 ; y < 256 ; y++ ) {
                            for ( var x = 0 ; x < 256 ; x++ ) {
                                dst[i++] = r;
                                dst[i++] = g;
                                dst[i++] = b;
                                dst[i++] = a;
                            }
                        }
                    }
                    var tile = {
                        width:256,
                        height:256,
                        canvas:canvas,
                        ctx:ctx,
                        data:id.data
                    };
                    self.tile_cache.set(key, tile);
                    cb();
                }
                else {
                    var tile = {
                        empty:true,
                        data:new Uint8Array(4*256*256)
                    };
                    self.tile_cache.set(key, tile);
                    cb();
                }
                return;
            }
            key = tkey;
        }
        
        if ( self.ycoordinate == -1 )
            ty = Math.pow(2,tz) - 1 - ty;
        var data_file = filePath(content, {z:tz, y:ty, x:tx});
        var img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = function() {
            var canvas = document.createElement('canvas');
            canvas.width = 256;
            canvas.height = 256;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var id = ctx.getImageData(0, 0, 256, 256)
            var tile = {
                width:256,
                height:256,
                canvas:canvas,
                ctx:ctx,
                data:id.data
            }
            self.tile_cache.set(key, tile);
            cb();
        };
        img.onerror = function() {
            var tile = {
                empty:true,
                data:new Uint8Array(4*256*256)
            };
            self.tile_cache.set(key, tile);
            cb();
        };
        img.src = data_file[0].file;
    }
    
    if ( self.update_interval > 0 )
        self.ref.load();
}

