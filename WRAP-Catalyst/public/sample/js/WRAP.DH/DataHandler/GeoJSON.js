
WRAP.DH.DataHandler.GeoJSON = function(reference, conf, base) {
    
    var self = this;
    
    self.name = conf.Name;
    self.ref = reference;
    self.update_interval = parseFloat(conf.Attributes.UpdateInterval);
    
    this.load = function(ref, cb) {
        var file = conf.Attributes.File;
        if ( WRAP.DH.user && file.indexOf("%user%") >= 0 )
            file = file.replace(/%user%/g, WRAP.DH.user);
        if ( WRAP.DH.customer && file.indexOf("%customer%") >= 0 )
            file = file.replace(/%customer%/g, WRAP.DH.customer);

        WRAP.DH._getJSON(file, conf.Name, function(data) {
console.log("loaded:"+file);
            base.data = data;
            if ( cb ) {
                cb("completed", ref);
            }

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

