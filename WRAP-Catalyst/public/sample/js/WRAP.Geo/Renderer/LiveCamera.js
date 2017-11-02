
WRAP.Geo.Renderer.LiveCamera = function() {
    
    var dir_sep = 16;

    var icons = {t:{}, s:{}, a:{}};
    
    function make_icon(layer, icon, error) {
        icon.img = null;
        var img = new Image();
        img.onload = function() {
            icon.img = [];
            var cvs = document.createElement("canvas");
            var context = cvs.getContext("2d");
            for ( var deg = 0 ; deg < dir_sep ; deg++ ) {
                var angle = deg*(360/dir_sep)*Math.PI/180;
                cvs.width = 32;
                cvs.height = 32;
                var centerX = cvs.width/2;
                var centerY = cvs.height/2;
                context.save();
                context.translate(centerX, centerY);
                context.rotate(angle);
                context.translate(-centerX, -centerY);
                context.drawImage(img, 0, 0, 32, 32);
                context.restore();
                var url = cvs.toDataURL('image/png');
                icon.img.push(url);
            }
            WRAP.Geo.redraw(layer);
        }
        img.onerror = function() {
            icon.img = [];
            for ( var deg = 0 ; deg < dir_sep ; deg++ ) {
                icon.img.push(error);
            }
        }
        img.src = icon.url;
    }

    this.draw = function(layer, content, conf, context, style, data, revision, dl) {
        content = null;
        context = null;
        
        var root = data.query("data").value();
        if ( !root )
            return;
        
        var style = conf.Attributes.style.default;
        var icon_width = style.icon_width;
        var icon_height = style.icon_height;
        var icon_offset_x = style.icon_offset_x;
        var icon_offset_y = style.icon_offset_y;
        var icon_n = style.icon_nondir;
        var icon_t = style.icon_t;
        var icon_s = style.icon_s;
        var icon_a = style.icon_a;
        
        if ( !icon_n || !icon_t || !icon_s || !icon_a )
            return;
        
        if ( icons.a.url != icon_a ) {
            icons.a.url = icon_a;
            make_icon(layer, icons.a,icon_n);
        }
        if ( icons.s.url != icon_s ) {
            icons.s.url = icon_s;
            make_icon(layer, icons.s,icon_s);
        }
        if ( icons.t.url != icon_t ) {
            icons.t.url = icon_t;
            make_icon(layer, icons.t,icon_n);
        }
        if ( !icons.a.img || !icons.s.img || !icons.t.img ) {
            setTimeout(function() {
                WRAP.Geo.redraw(layer);
            }, 500);
            return;
        }
        
        var valid = true;
        if ( this.content_revision != revision.content ) {
            valid = false;
            this.content_revision = revision.content;
        }
        
        if ( valid )
            return;
        
console.log("draw:"+layer.name());
        
        dl.length = 0;
        
        for ( var key in root ) {
            var c = root[key];
            if ( c.lat && c.lon ) {
                var image;
                if ( !c.dir ) {
                    image = icon_n;
                }
                else {
                    var dir = Math.floor((c.dir+(360/(dir_sep*2)))/(360/dir_sep));
                    dir = dir%dir_sep;
                    image = icons.s.img[dir];
                }
                var feature = new WRAP.Geo.Feature.Image({
                    point:[c.lon/60.0, c.lat/60.0],
                    image:image,
                    width:icon_width,
                    height:icon_height,
                    offsetX:icon_offset_x,
                    offsetY:icon_offset_y
                });
                feature.set(layer, data.query("data."+key));
                dl.push(feature);
            }
        }
        WRAP.Geo.invalidate();
console.log("  display list -> "+dl.length);
    }
}

