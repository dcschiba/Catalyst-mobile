
WRAP.Geo.Renderer.WindArrow = function() {

    this.style_revision;
    this.context_revision;
    
    this.image = null;
    this.arrow_step = 0;
    this.image_width = 32;
    this.image_height = 64;
    
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
        
        function makeWindArrow(image, canvas, ctx, face) {
            for ( var w = 5 ; w <= 100 ; w+= 5) {
                ctx.clearRect(0,0,canvas.width,canvas.height);
                
                var scale = 1.5;
                var offsetY = 4;
                var lastY = 24;
                var center = {x:canvas.width/2, y:canvas.height-1};
                var n = w;
                n *= 2;
                n /= 10;
                n = Math.round(n);
                n *= 10;
                n /= 2;
                if(n>=50) lastY += 5*Math.floor(n/50);
                if(n>0) {
                    ctx.beginPath();
                    ctx.moveTo(center.x, center.y);
                    ctx.lineTo(center.x, center.y+(-lastY - (n<6 ? 4 : 0))*scale);
                    ctx.stroke();
                };
                while(n>=50) {
                    ctx.beginPath();
                    ctx.moveTo(center.x, center.y+(-lastY)*scale);
                    ctx.lineTo(center.x +(10*face)*scale, center.y+(-lastY+1.5)*scale);
                    ctx.lineTo(center.x, center.y+(-lastY+5)*scale);
                    ctx.lineTo(center.x, center.y+(-lastY)*scale);
                    ctx.stroke();
                    n -= 50;
                    lastY -= (offsetY+2.5);
                }
                if(w > 50) lastY -= 2;
                while(n>=10) {
                    ctx.moveTo(center.x, center.y+(-lastY)*scale);
                    ctx.lineTo(center.x+(10*face)*scale, center.y+(-lastY-4)*scale);
                    n -= 10;
                    lastY -= offsetY;
                }
                if(n>=5) {
                    ctx.moveTo(center.x, center.y+(-lastY)*scale);
                    ctx.lineTo(center.x+(7*face)*scale, center.y+(-lastY-3)*scale);
                    n -= 5;
                    lastY -= offsetY;
                }
                ctx.stroke();
                image.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            }
        }
        
        function makeCalmLine(image, canvas, ctx) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var scale = 1.5;
            var lastY = 24;
            var center = {x:canvas.width/2, y:canvas.height-1};
            ctx.beginPath();
            ctx.moveTo(center.x, center.y);
            ctx.lineTo(center.x, center.y+(-lastY-4)*scale);
            ctx.stroke();
            image.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        }
        
        function makeCalmMark(image, canvas, ctx) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            ctx.beginPath();
            ctx.arc(canvas.width/2,canvas.height-6,3,0,Math.PI*2,true);
            ctx.stroke();
            image.push(ctx.getImageData(0,0,canvas.width,canvas.height));
        }
        
        if ( !this.image ) {
            this.image = [];
            
            var canvas = document.createElement('canvas');
            canvas.width = this.image_width;
            canvas.height = this.image_height;
            var ctx = canvas.getContext("2d");
            
            ctx.strokeStyle = s.color;
            ctx.fillStyle = s.color;
            ctx.lineCap = 'round';
            ctx.lineWidth = 1.5;
            
            makeWindArrow(this.image, canvas, ctx, 1.0);
            this.arrow_step = this.image.length;
            makeWindArrow(this.image, canvas, ctx, -1.0);
            makeCalmLine(this.image, canvas, ctx);
            makeCalmMark(this.image, canvas, ctx);
        }

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

        dl.length = 0;
        for ( var i = 0 ; i < data_tile.length ; i++ ) {
            var data = data_tile[i].data;
            for ( var j = 0 ; j < data.length ; j++ ) {
                var v = data[j];
                if ( !v.value || v.value.length != 2 || isNaN(v.value[0]) || isNaN(v.value[1]) )
                    continue;
                
                //convert m/s to knots: 1m/s = 1.943844 knots
                var u_spd = v.value[0]+data_offset;
                var v_spd = v.value[1]+data_offset;
                var speed = Math.sqrt(u_spd*u_spd + v_spd*v_spd) * 1.943844;
                var dir = 0;
                if ( speed > 0 ) {
                    dir = Math.atan2(u_spd, v_spd) * (180 / Math.PI);
                    dir -= 180;
                    if (dir < 0) {
                        dir += 360;
                    }
                }
                
                var feature;
                var iw = this.image_width*0.6;
                var ih = this.image_height*0.6;
                
                var index = Math.floor(speed/5.0) -1;
                if ( index >= this.arrow_step )
                    index = this.arrow_step-1;
                var r = dir;
                var x = -iw/2;
                var y = -ih;
                if ( index == -1 ) {
                    if ( Math.floor(speed) > 0 ) {
                        index = this.image.length-2;
                    }
                    else {
                        r = 0;
                        y += 5;
                        index = this.image.length-1;
                    }
                }
                else {
                    if ( v.lat < 0 )
                        index += this.arrow_step;
                }
                feature = new WRAP.Geo.Feature.Image({
                    point:[v.lon,v.lat],
                    image:this.image[index],
                    width:iw,
                    height:ih,
                    offsetX:x,
                    offsetY:y,
                    rotation:r
                });
                dl.push(feature);
                feature.geo = {
                    geometry: {
                        type:"Point",
                        coordinates:[v.lon,v.lat]
                    },
                    properties: {
                        u:u_spd,
                        v:v_spd,
                        speed:speed,
                        direction:dir
                    }
                };
                
/*
                    var text = speed.toFixed(digit);
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
*/
            }
        }
        
        this.context_revision = context.revision;
        WRAP.Geo.invalidate();
    }
}


