
WRAP.Geo.Renderer.GridValue = function() {

    this.style_revision;
    this.context_revision;
    
    this.draw = function(layer, content, conf, context, style, data, revision, dl) {
        
        if ( this.revision && this.revision.context == revision.context )
            return;
        
        if ( this.style_revision != revision.style ) {
            this.style_revision = revision.style;
        }
        
        var data_offset = conf.Attributes.data_offset || 0;
        
        var s = conf.Attributes.style.default;
        if ( style && conf.Attributes.style[style] )
            s = conf.Attributes.style[style];
        if ( !s )
            return;

        var sampling = "value";
        
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
        
        var data_offset = conf.Attributes.data_offset || 0;
        var digit = (s.fractional_digits===undefined)?1:parseInt(s.fractional_digits);
        var offsetX = s.offset_x || 0;
        var offsetY = s.offset_y || 0;

        dl.length = 0;
        for ( var i = 0 ; i < data_tile.length ; i++ ) {
            var data = data_tile[i].data;
            for ( var j = 0 ; j < data.length ; j++ ) {
                var v = data[j];
                if ( !v.value || isNaN(v.value) )
                    continue;
                
                var text = (v.value+data_offset).toFixed(digit);
                var feature;
                feature = new WRAP.Geo.Feature.Text({
                    point:[v.lon,v.lat],
                    text:text,
                    fontSize:14,
                    fillStyle:s.color,
                    offsetX:offsetX,
                    offsetY:offsetY,
                    align:'center'
                });
                dl.push(feature);
            }
        }

        this.context_revision = context.revision;
        WRAP.Geo.invalidate();
    }
}


