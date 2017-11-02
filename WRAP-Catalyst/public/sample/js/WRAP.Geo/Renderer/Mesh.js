
WRAP.Geo.Renderer.Mesh = function() {
    var self = this;
    
    this.palette = null;
    this.palette_value_min = 0;
    this.palette_value_max = 0;
    this.palette_gradient = true;
    this.palette_scale = 10;
    this.palette_step = 1;
    
    this.setPalette = function(style) {
        if ( !self.palette && style.palette ) {
            self.palette = [];
            self.palette_gradient = style.palette_gradient;
            self.palette_step = style.palette_step || 1;
            self.palette_scale = 1.0/self.palette_step;
            
            var p = style.palette;
            var l = [];
            for ( var i = 0 ; i < p.length ; i++ ) {
                var s = [];
                var value = p[i].value;
                if ( i == 0 ) {
                    this.palette_value_min = value;
                    this.palette_value_max = value;
                }
                else {
                    if ( this.palette_value_min > value )
                        this.palette_value_min = value;
                    if ( this.palette_value_max < value )
                        this.palette_value_max = value;
                }
                s.push(value);
                var color = WRAP.Geo.parseColor(p[i].color);
                s.push(color[0]);
                s.push(color[1]);
                s.push(color[2]);
                s.push(color[3]);
                l.push(s);
            }

            var m = 0;
            for ( var v = self.palette_value_min ; v <= self.palette_value_max ; v+=self.palette_step ) {
                while ( m < l.length-1 && v >= l[m+1][0] )
                    m++;
                if ( m == l.length-1 ) {
                    self.palette.push([
                       parseInt(l[m][1]),
                       parseInt(l[m][2]),
                       parseInt(l[m][3]),
                       parseInt(l[m][4])
                   ]);
                }
                else {
                    var sr = l[m][1];
                    var sg = l[m][2];
                    var sb = l[m][3];
                    var sa = l[m][4];
                    if ( self.palette_gradient ) {
                        var r = (v-l[m][0])/(l[m+1][0]-l[m][0]);
                        var er = l[m+1][1];
                        var eg = l[m+1][2];
                        var eb = l[m+1][3];
                        var ea = l[m+1][4];
                        self.palette.push([
                           parseInt(sr+(er-sr)*r),
                           parseInt(sg+(eg-sg)*r),
                           parseInt(sb+(eb-sb)*r),
                           parseInt((sa+(ea-sa)*r))
                        ]);
                    }
                    else {
                        self.palette.push([
                           parseInt(sr),
                           parseInt(sg),
                           parseInt(sb),
                           parseInt(sa)
                        ]);
                    }
                }
            }
        }
    }
    
    this.getColor = function(value) {
        var index = Math.floor((value-self.palette_value_min)*self.palette_scale);
        if ( index < 0 || index >= self.palette.length )
            return [0,0,0,0];
        return self.palette[index];
    }

    this.draw = function(layer, content, conf, context, style, data, revision, dl) {
        
        var valid = true;
        if ( this.context_revision != revision.context ) {
            valid = false;
            this.context_revision = revision.context;
        }

        if ( this.content_revision != revision.content ) {
            valid = false;
            this.content_revision = revision.content;
        }

        if ( this.conf_revision != revision.conf ) {
            valid = false;
            this.conf_revision = context.conf;
        }
        
        if ( this.style_revision != revision.style ) {
            valid = false;
            this.style_revision = revision.style;
            this.palette = null;
        }
        
        if ( valid )
            return;
        
        var data_offset = conf.Attributes.data_offset || 0;
        
        var s = conf.Attributes.style.default;
        if ( style && conf.Attributes.style[style] )
            s = conf.Attributes.style[style];
        if ( !s )
            return;
        
        this.setPalette(s);
        var sampling = (s.fill_type!='block')?'interpolate':'nearest';
        var fill = s.fill_type;
        var contour = s.contour;
        
//console.log("rendering Mesh");
        var data_tile = [];
        for ( var i = 0 ; i < context.tiles.length ; i++ ) {
            var tile = context.tiles[i];
            if ( !(data_tile[i] = data._handler().getTile(content, tile.id, sampling)) ) {
                data._handler().loadTile(content, tile.id, sampling, tile.z, tile.y, tile.x, tile.cood, tile.bounds,
                    function() {
                        WRAP.Geo.redraw(layer);
                    });
                return;
            }
        }
        
        dl.length = 0;
        for ( var i = 0 ; i < data_tile.length ; i++ ) {
            var src = data_tile[i];
            if ( !src || src.empty )
                continue;
            
            var tile = context.tiles[i];
            var pix = tile.ctx.createImageData(256,256);
            var s = src.data;
            var d = pix.data;
            
            if ( fill ) {
//var min = 0;
//var max = 0;
                var m = 0;
                for ( var y = 0 ; y < 256 ; y++ ) {
                    for ( var x = 0 ; x < 256 ; x++ ) {
                        var p = m*4;
                        var value = s[m++];
                        if ( isNaN(value) )
                            continue;
                        value += data_offset;
//if ( min > value )
//    min = value;
//if ( max > value )
//    max = value;
                        var col = this.getColor(value);
                        d[p] = col[0];
                        d[p+1] = col[1];
                        d[p+2] = col[2];
                        d[p+3] = col[3];
                    }
                }
            }
//console.log("tile="+tile.id+" min="+min+" max="+max);

            var label = [];
            if ( contour ) {
                var min = 0;
                var max = 0;
                for ( var p = 0 ; p < 65536 ; p++ ) {
                    var value = s[p];
                    if ( p == 0 ) {
                        min = max = value;
                    }
                    else {
                        if ( min > value )
                           min = value;
                        if ( max < value )
                            max = value;
                    }
                }
                
                for ( var j = 0 ; j < contour.length ; j++ ) {
                    var c = contour[j];
                    var color = c.strokeStyle;
                    color = color.replace(/rgba\(/g, "").replace(/ /g, "").replace(/\)/g, "");
                    var cc = color.split(",");
                    col = [];
                    col.push(parseInt(cc[0]));
                    col.push(parseInt(cc[1]));
                    col.push(parseInt(cc[2]));
                    col.push(parseInt(parseFloat(cc[3])*255));
                    
                    var value = c.base - data_offset;
                    for ( var n = 0 ; n < c.num ; n++ ) {
                        if ( min <= value && value <= max ) {
                            var ll = -1;
                            var lx = 0, ly = 0;
                            
                            var index = 0;
                            for ( y = 0 ; y < 256 ; y++ ) {
                                var py = (y==0)?0:-256;
                                var ny = (y==255)?0:256;
                                for ( x = 0 ; x < 256 ; x++ ) {
                                    var px = (x==0)?0:-1;
                                    var nx = (x==255)?0:1;
                                    var vc = s[index];
                                    if ( vc >= value ) {
                                        var vt = s[index+py];
                                        var vl = s[index+px];
                                        var vr = s[index+nx];
                                        var vb = s[index+ny];
                                        if ( vt < value || vl < value || vr < value || vb < value ) {
                                            d[index*4] = col[0];
                                            d[index*4+1] = col[1];
                                            d[index*4+2] = col[2];
                                            d[index*4+3] = col[3];
                                            
                                            var l = Math.abs(x-128)+Math.abs(y-128);
                                            if ( ll < 0 || l < ll ) {
                                                ll = l;
                                                lx = x;
                                                ly = y;
                                            }
                                        }
                                    }
                                    index++;
                                }
                            }
                            
                            if ( 20 < lx && lx <= 236 && 20 < ly && ly <= 236 ) {
                                label.push({x:lx, y:ly, value:value+data_offset, color:c.textColor});
                            }
                        }
                        value += c.interval;
                    }
                }
            }
            feature = new WRAP.Geo.Feature.Tile({
                tile:tile,
                imageData:pix
            });
            dl.push(feature);
            
            for ( var l = 0 ; l < label.length ; l++ ) {
                var center = (128*256+128)*2;
                var lat = tile.cood[center];
                var lon = tile.cood[center+1];
                var feature;
                feature = new WRAP.Geo.Feature.Text({
                    point:[lon, lat],
                    text:label[l].value,
                    fontSize:12,
                    fillStyle:label[l].color,
                    offsetX:label[l].x-128,
                    offsetY:label[l].y-128,
                    align:'center'
                });
                dl.push(feature);
            }
        }
        
//        WRAP.Geo._tileCheck(context, dl);
        
        WRAP.Geo.invalidate();
    }
}


