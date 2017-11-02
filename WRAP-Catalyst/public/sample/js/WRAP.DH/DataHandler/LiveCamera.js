WRAP.DH.DataHandler.LiveCamera = function(reference, conf, base) {
    
    var time_range = 3600*10;      // 10hour
    var max_image = 10;
    
    var self = this;
    
    self.initial = true;
    self.ref = reference;
    self.name = conf.Name;
    self.update_interval = parseFloat(conf.Attributes.UpdateInterval);
    self.auto_update = false;
    
    this.load = function(ref, cb) {
        var depth = ref._path.length;
        if ( depth < 3 ) {
            console.log("Load LiveCamera Info (autou pdate="+self.auto_update+")");
            
            if ( !base.data || self.auto_update ) {
                WRAP.DH._get(conf.Attributes.CameraMaster, "LiveCamera Master", function(data) {
                    if ( data ) {
                        if ( !base.data )
                            base.data = {};
                        var master = data.split("\n");
                        var camera_num = 0;
                        for ( var i = 0 ; i < master.length ; i++ ) {
                            var camera = master[i];
                            if ( camera.length ) {
                                camera_num++;
                                if ( !base.data[camera] )
                                    base.data[camera] = {};
                                base.data[camera].active = true;
                            }
                        }
                        var count = 0;
                        for ( var key in base.data ) {
                            if ( !base.data[key].active ) {
                                delete base.data[key];
                            }
                            else {
                                delete base.data[key].active;
                                var info_url = conf.Attributes.CameraServer+"/info/public/camera_master/"+key;
                             
                                if ( WRAP.DH.Test.Camera )
                                    info_url = "https://pt-wrap01.wni.co.jp/Mercury/sample/pri/data/LIVE_CAMERA/test/"+key+"/info.json";

                                WRAP.DH._getJSON(info_url, "LiveCamera Info", function(info) {
                                    if ( info ) {
                                        if ( base.data[info.AREA] ) {
                                            var c = base.data[info.AREA];
                                            c.area_name = info.AREA;
                                            c.e_name = info.Shibakoen;
                                            c.l_name = info.LNAME;
                                            c.company = info.COMPNY;
                                            c.jpscsn = info.JPSCSN;
                                            c.lat = parseFloat(info.LATD)*60.0;
                                            c.lon = parseFloat(info.LOND)*60.0;
                                            c.dir = (info.DIR!=-1)?info.DIR*(360/16):undefined;
                                            c.gid = info.GID;
                                            if ( !self.initial || conf.Attributes.InitialLoad ) {
                                                ref.query("data").query(info.AREA).load(
                                                    function(/*r*/) {
                                                        if ( ++count >= camera_num ) {
                                                            self.initial = false;
                                                            cb("completed", ref);
                                                        }
                                                    });
                                            }
                                            else {
                                                if ( ++count >= camera_num ) {
                                                    self.initial = false;
                                                    cb("completed", ref);
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if ( ++count >= camera_num ) {
                                            self.initial = false;
                                            cb("completed", ref);
                                        }
                                    }
                                });
                            }
                        }
                        
                    }
                    else {
                        WRAP.DH._error("LiveCamera Master not found.");
                        cb("error", null);
                    }
                            
                    if ( self.auto_update && self.update_interval > 0 ) {
                        setTimeout(function() {
                            self.ref.load();
                        }, self.update_interval*1000);
                    }
                });
            }
        }
        else if ( depth >= 3 ){
            var name = ref._path[2];
            
            var now = WRAP.DH._currentTime();
            var from = WRAP.DH._setTime(now,-time_range);
            var time_start = WRAP.DH._timeString(from,"","","");
            var time_end = WRAP.DH._timeString(now,"","","");

            var image_url = conf.Attributes.CameraServer+"/date/public/"+name+"/"+time_start+"/"+time_end+"/";
                         
            if ( WRAP.DH.Test.Camera )
                image_url = "https://pt-wrap01.wni.co.jp/Mercury/sample/pri/data/LIVE_CAMERA/test/"+name+"/files.json";
                         
            WRAP.DH._getJSON(image_url, "LiveCamera File List", function(files) {
                if ( files && files.keys ) {
                    if ( base.data[name] ) {
                        files.keys.sort(function(a,b) {
                            if ( a > b ) return -1;
                            if ( a < b ) return 1;
                            return 0;
                        });
                        var t = base.data[name].image;
                        var n = base.data[name].image = [];
                        var image_count = 0;
                        for ( var i = 0 ; i < files.keys.length ; i++ ) {
                            var file = files.keys[i].split(".");
                            var file_time = WRAP.DH._time(file[0]);
                            var time = WRAP.DH._timeString(file_time);
                            var image = null;
                            var requested = false;
                         
                            if ( t ) {
                                for ( var j = 0 ; j < t.length ; j++ ) {
                                    if ( t[j].time == time ) {
                                        requested = true;
                                        image = t[j].image;
                                        break;
                                    }
                                }
                            }
                            if ( (depth>3 || i == 0) || requested ) {
                                var target;
                                n.push(target={time:time, image:image});
                                if ( !requested ) {
                                    var img = new Image();
                                    target.image = img;
                                    img.target = target;
                                    img.onload = function() {
                                    }
                                    img.onerror = function() {
                                        img.onerror = null;
                                        img.src = "img/broken_img.png";
                                    }
                                    var file_time = WRAP.DH._time(time);
                                    var fts = WRAP.DH._timeString(file_time, "", "", "");
                                    var image_url = conf.Attributes.CameraServer+"/img/public/"+name+"/"+fts+".jpeg";
                                          
                                    if ( WRAP.DH.Test.Camera )
                                        image_url = "https://pt-wrap01.wni.co.jp/Mercury/sample/pri/data/LIVE_CAMERA/test/"+name+"/"+fts+".jpeg";
                                    //console.log("load Image "+image_url);
                                    img.src = image_url;
                                }
                                else {
                                }
                             }
                             if ( ++image_count >= max_image )
                                break;
                        }
                    }
                }
                cb("completed", ref);
            });
        }
    }
    
    if ( self.update_interval > 0 )
        self.ref.load();
}
