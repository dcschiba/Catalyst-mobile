
WRAP.Geo.Renderer.Lightning = function() {
    
    this.draw = function(layer, content, conf, context, style, data, revision, dl) {
        context = null;
        content = null;
        style = null;
        
        var root = data.query("data").value();
        if ( !root )
            return;
        
        var valid = true;
        if ( this.conf_revision != revision.conf ) {
            valid = false;
            this.conf_revision = revision.conf;
        }
        
        if ( this.data_revision != revision.data ) {
            valid = false;
            this.style_data = revision.data;
        }
        
        if ( valid )
            return;
        
console.log("draw:"+layer.name());
        
        var style = conf.Attributes.style.default;
        var icon_width = style.icon_width;
        var icon_height = style.icon_height;
        var icon_offset_x = style.icon_offset_x;
        var icon_offset_y = style.icon_offset_y;
        var icon = style.icon;
        
        dl.length = 0;
        
        
        var features = root.features;
        if ( !features ) {
            features = [];
            if ( root.type == "Feature" )
                features.push(root);
        }
        
        var length = features.length;
        for ( var i = 0 ; i < length ; i++ ) {
            var item = features[i];
            var geometry = item.geometry;
            if ( !geometry )
                continue;
            if ( geometry.type == "Point" ) {
                var prop = item.properties;
                if ( prop && prop.display_flag === false )
                    continue;
                
                var ut = WRAP.DH._time(prop.announced_date);
                var t = WRAP.DH._time(prop.obs_time);
                var e = WRAP.DH._elapsed(t, ut)/60;
//console.log("item "+i+" elapsed="+e);
                for ( var j = 0 ; j < icon.length ; j++ ) {
                    if ( parseInt(icon[j].ge) <= e && e < parseInt(icon[j].lt) ) {
                        var point = geometry.coordinates;
                        var feature = new WRAP.Geo.Feature.Image({
                            point:point,
                            image:icon[j].image,
                            width:icon_width,
                            height:icon_height,
                            offsetX:icon_offset_x,
                            offsetY:icon_offset_y,
                        });
                        feature.geo = item;
                        dl.push(feature);
                        break;
                    }
                }
            }
        }
        WRAP.Geo.invalidate();
    }
}

