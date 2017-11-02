
WRAP.Geo.Renderer.DistanceCalculator = function() {
//    this.lat_s = 35.6508;
//    this.lon_s = 140.0418;
//    this.lat_e = 35.6508;
//    this.lon_e = 140.0618;
    this.lat_s = 35.68944;
    this.lon_s = 139.69167;
    this.lat_e = 34.68639;
    this.lon_e = 135.52;
    this.distance = 0;
    this.feature_s = null;
    this.feature_e = null;
    this.feature_l = null;
    var self = this;
    
    this.render = function(layer, dl, data, conf) {
        dl.length = 0;

        this.feature_s = new WRAP.Geo.Feature("image");
        this.feature_s.set(layer, data);
        this.feature_s.point = new WRAP.Geo.Point(this.lat_s*60, this.lon_s*60);
        this.feature_s.image = "img/pin_r.png";
        this.feature_s.width = 32;
        this.feature_s.height = 32;
        this.feature_s.offset_x = 16;
        this.feature_s.offset_y = 32;
        this.feature_s.draggable = true;
        dl.push(this.feature_s);
        
        this.feature_e = new WRAP.Geo.Feature("image");
        this.feature_e.set(layer, data);
        this.feature_e.point = new WRAP.Geo.Point(this.lat_e*60, this.lon_e*60);
        this.feature_e.image = "img/pin_b.png";
        this.feature_e.width = 32;
        this.feature_e.height = 32;
        this.feature_e.offset_x = 16;
        this.feature_e.offset_y = 32;
        this.feature_e.draggable = true;
        dl.push(this.feature_e);
        
        
        var path = [];
        path.push(new WRAP.Geo.Point(this.lat_s*60, this.lon_s*60));
        path.push(new WRAP.Geo.Point(this.lat_e*60, this.lon_e*60));
        this.feature_l = new WRAP.Geo.Feature("line");
        this.feature_l.path = path;
        this.feature_l.strokeStyle = 'rgba(100,200,200,0.8)';
        this.feature_l.strokeWidth = 2;
        this.feature_l.geodesic = true;
        dl.push(this.feature_l);
        
        function updateDistance() {
//            console.log("s="+self.lat_s+","+self.lon_s+" e="+self.lat_e+","+self.lon_e);
            if ( self.feature_l.line ) {
                var path = [];
                path.push(new WRAP.Geo.Point(self.lat_s*60, self.lon_s*60));
                path.push(new WRAP.Geo.Point(self.lat_e*60, self.lon_e*60));
                WRAP.Geo.setLinePath(self.feature_l.line, path);
            }
            if ( layer.updateDistance ) {
                var distance = WRAP.Geo.getDistance(new WRAP.Geo.Point(self.lat_s*60, self.lon_s*60),
                                                    new WRAP.Geo.Point(self.lat_e*60, self.lon_e*60));
                layer.updateDistance(self.lat_s, self.lon_s, self.lat_e, self.lon_e, distance);
            }
        }
        
        this.feature_s.drag = function(lat, lon) {
            self.lat_s = lat;
            self.lon_s = lon;
            updateDistance();
        }
        
        this.feature_e.drag = function(lat, lon) {
            self.lat_e = lat;
            self.lon_e = lon;
            updateDistance();
        }
        
        updateDistance();
    }
}


