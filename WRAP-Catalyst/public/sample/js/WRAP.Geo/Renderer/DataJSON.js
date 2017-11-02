
WRAP.Geo.Renderer.DataJSON = function() {
    
    this.draw = function(layer, content, conf, context, style, data, revision, dl) {
        content = null;
        context = null;
        
        var root = data.query("data").value();
        if ( !root || !root.position || !root.data ) {
            return;
        }
        
        var valid = true;
        if ( this.content_revision != revision.content ) {
            valid = false;
            this.content_revision = revision.content;
        }
        
        if ( this.conf_revision != revision.conf ) {
            valid = false;
            this.conf_revision = revision.conf;
        }
        
        if ( this.style_revision != revision.style ) {
            valid = false;
            this.style_revision = revision.style;
        }
        
        if ( valid )
            return;
        
console.log("draw:"+layer.name());
        
        dl.length = 0;

        var style_name = "default";
        
        var features = root.position.features;
        if ( !features ) {
            features = [];
            if ( root.type == "Feature" )
                features.push(root);
        }
        
        var render_types = conf.Attributes.features;
        
        var points = {};
        
        var duplicated = 0;
        var length = features.length;
        for ( var i = 0 ; i < length ; i++ ) {
            var item = features[i];
            var prop = item.properties;
            if ( !prop )
                continue;
            var geometry = item.geometry;
            if ( !geometry )
                continue;
            if ( points[prop.position_id] )
                duplicated++;
            points[prop.position_id] = item;
        }
        
        var count = root.data.data.length;
        for ( var i = 0 ; i < count ; i++ ) {
            var item = root.data.data[i];
            
            var style = null;
            for ( var j = 0 ; j < render_types.length ; j++ ) {
                var selector = render_types[j].selector;
                if ( selector ) {
                    if ( selector.type == "key_value" ) {
                        if ( item[selector.key] == selector.value ) {
                            style = render_types[j].style;
                            break;
                        }
                    }
                }
                else {
                    style = render_types[j].style;
                    break;
                }
            }
            
            var ts = style && style[style_name];
            if ( !ts )
                continue;
        
            var geo = points[item.id];
            var geometry = geo.geometry;
            if ( !geometry )
                continue;

            if ( item.display_flag === false )
                continue;
            
            if ( geometry.type == "Point" ) {
                var point = geometry.coordinates;
                if ( ts.type == "image" ) {
                    var feature = new WRAP.Geo.Feature.Image({
                        point:point,
                        image:ts.url,
                        width:ts.width,
                        height:ts.height,
                        offsetX:ts.offset_x,
                        offsetY:ts.offset_y,
                        rotation:ts.rotation
                    });
                    feature.geo = geo;
                    feature.data = item;
                    dl.push(feature);
                }
                else if ( ts.type == "point" ) {
                    var feature = new WRAP.Geo.Feature.Point({
                        point:point,
                        strokeStyle:ts.line_color,
                        strokeWidth:ts.line_width,
                        fillStyle:ts.point_color,
                        pointSize:ts.point_size
                    });
                    feature.geo = geo;
                    feature.data = item;
                    dl.push(feature);
                }
            }
            else if ( geometry.type == "MultiPoint" ) {
                for ( var k = 0 ; k <= geometry.coordinates.length ; k++ ) {
                    var point = geometry.coordinates[k];
                    if ( ts.type == "image" ) {
                        var feature = new WRAP.Geo.Feature.Image({
                            point:point,
                            image:ts.url,
                            width:ts.width,
                            height:ts.height,
                            offsetX:ts.offset_x,
                            offsetY:ts.offset_y,
                            rotation:ts.rotation
                        });
                        feature.geo = geo;
                        feature.data = item;
                        dl.push(feature);
                    }
                    else if ( ts.type == "point" ) {
                        var feature = new WRAP.Geo.Feature.Point({
                            point:point,
                            strokeStyle:ts.line_color,
                            strokeWidth:ts.line_width,
                            fillStyle:ts.point_color,
                            pointSize:ts.point_size
                        });
                        feature.geo = geo;
                        feature.data = item;
                        dl.push(feature);
                    }
                }
            }
            else if ( geometry.type == "LineString" || geometry.type == "MultiLineString" ) {
                var points = geometry.coordinates;
                if ( points ) {
                    var feature = new WRAP.Geo.Feature.GeoLine({
                        path:points,
                        lineWidth:ts.line_width,
                        strokeStyle:ts.line_color
                    });
                    feature.geo = geo;
                    feature.data = item;
                    dl.push(feature);
                }
            }
            else if ( geometry.type == "Polygon" ) {
                var points = geometry.coordinates;
                if ( points ) {
                    var feature = new WRAP.Geo.Feature.GeoLine({
                        path:points,
                        lineWidth:ts.line_width,
                        strokeStyle:ts.line_color,
                        fillStyle:ts.fill_color,
                        fillImage:ts.fill_image
                    });
                    feature.geo = geo;
                    feature.data = item;
                    dl.push(feature);
                }
            }
            else if ( geometry.type == "MultiPolygon" ) {
                for ( var l = 0 ; l <= geometry.coordinates.length ; l++ ) {
                    var points = geometry.coordinates[l];
                    if ( points ) {
                        var feature = new WRAP.Geo.Feature.GeoLine({
                            path:points,
                            lineWidth:ts.line_width,
                            strokeStyle:ts.line_color,
                            fillStyle:ts.fill_color,
                            fillImage:ts.fill_image
                        });
                        feature.geo = geo;
                        feature.data = item;
                        dl.push(feature);
                    }
                }
            }
        }
        WRAP.Geo.invalidate();
console.log("  display list -> "+dl.length);
    }
}

