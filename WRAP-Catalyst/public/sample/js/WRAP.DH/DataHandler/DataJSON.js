
WRAP.DH.DataHandler.DataJSON = function(reference, conf, base) {
    
    var self = this;
    
    self.name = conf.Name;
    self.ref = reference;
    self.update_interval = parseFloat(conf.Attributes.UpdateInterval);
    self.position = null;
    base.data = {};
    
    this.load = function(ref, cb) {
        var point_file = conf.Attributes.PointFile;
        var data_file = conf.Attributes.DataFile;
        if ( WRAP.DH.customer ) {
            if ( point_file.indexOf("%user%") >= 0 )
                point_file = point_file.replace(/%user%/g, WRAP.DH.user);
            if ( point_file.indexOf("%customer%") >= 0 )
                point_file = point_file.replace(/%customer%/g, WRAP.DH.customer);
            if ( data_file.indexOf("%user%") >= 0 )
                data_file = data_file.replace(/%user%/g, WRAP.DH.user);
            if ( data_file.indexOf("%customer%") >= 0 )
                data_file = data_file.replace(/%customer%/g, WRAP.DH.customer);
        }
        
        WRAP.DH._getJSON(point_file, conf.Name, function(data) {
console.log("loaded:"+point_file);
                base.data.position = data;
                if ( base.data.data )
                    cb("completed", ref);
        });

        WRAP.DH._getJSON(data_file, conf.Name, function(data) {
console.log("loaded:"+data_file);
            base.data.data = data
            if ( base.data.position )
                cb("completed", ref);
                 
            if ( self.update_interval > 0 ) {
                setTimeout(function() {
                    self.ref.load();
                }, self.update_interval*1000);
            }
        });
    }

    this.reload = function() {
        this.load(self.reference, function() {});
    }
    
    if ( self.update_interval > 0 )
        self.ref.load();
}

