
WRAP.Geo.Renderer.Image = function() {

    this.draw = function(layer, content, conf, context, style, data, revision, dl) {
        
        if ( !content )
            return;
        
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
        
        var s = conf.Attributes.style.default;
        if ( style && conf.Attributes.style[style] )
            s = conf.Attributes.style[style];
        if ( !s )
            return;
        
        var sampling = null;

        //console.log("rendering Image");
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
            if ( !src || src.empty || !src.data )
                continue;
            
            var tile = context.tiles[i];
            var pix = tile.ctx.createImageData(256,256);
            var sd = src.data;
            var dd = pix.data;
            var m = 0;
            if ( s.type == 'rgb_palette' && s.palette ) {
                var palette = s.palette;
                for ( var y = 0 ; y < 256 ; y++ ) {
                    for ( var x = 0 ; x < 256 ; x++ ) {
                        var r = sd[m];
                        var g = sd[m+1];
                        var b = sd[m+2];
                        var a = sd[m+3];
                        for ( var j = 0 ; j < palette.length ; j++ ) {
                            var col = palette[j][0];
                            if ( r == col[0] && g == col[0] && b == col[0] ) {
                                r = palette[j][0][0];
                                g = palette[j][0][1];
                                b = palette[j][0][2];
                                a = palette[j][0][3];
                                break;
                            }
                        }
                        dd[m++] = r;
                        dd[m++] = g;
                        dd[m++] = b;
                        dd[m++] = a;
                    }
                }
            }
            else if ( s.type == 'filter') {
                var rgb_offset = parseInt(s.rgb_offset) || 0;
                var opacity = parseFloat(s.opacity) || 1.0;
                for ( var y = 0 ; y < 256 ; y++ ) {
                    for ( var x = 0 ; x < 256 ; x++ ) {
                        var r = sd[m]+rgb_offset;
                        var g = sd[m+1]+rgb_offset;
                        var b = sd[m+2]+rgb_offset;
                        var a = sd[m+3]*opacity;
                        if ( r < 0 )
                            r = 0;
                        else if ( r > 255 )
                            r = 255;
                        if ( g < 0 )
                            g = 0;
                        else if ( g > 255 )
                            g = 255;
                        if ( b < 0 )
                            b = 0;
                        else if ( b > 255 )
                            b = 255;
                        dd[m++] = r;
                        dd[m++] = g;
                        dd[m++] = b;
                        dd[m++] = a;
                    }
                }
            }
            else {
                var num = sd.length;
                for ( var j = 0 ; j < num ; j++ )
                    dd[j] = sd[j];
            }
            var feature = new WRAP.Geo.Feature.Tile({
                tile:tile,
                imageData:pix
            });
            dl.push(feature);
        }
        
        WRAP.Geo.invalidate();
    }
}


