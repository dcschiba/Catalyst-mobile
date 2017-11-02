/**
 * 緯度経度・座標クラス
 *
 *      // Coordinates
 *      var pos = new WRAP.Core.Coordinates(40.0*60, 140.0*60)
 *      console.log("minutes: lat="+pos.lat()+" ,"+pos.lon());
 *      //[Log] minutes: lat=2400 ,8400
 *      console.log("degrees: lat="+pos.latDegrees()+" ,"+pos.lonDegrees());
 *      //[Log] degrees: lat=40 ,140
 *
 * @class WRAP.Core.Coordinates
 * @constructor
 * @param lat {Number} 緯度座標（分）＊省略時０
 * @param lon {Number} 経度座標（分）＊省略時０
 */

WRAP.Core.Coordinates = function(lat, lon) {
    
    
    /**
     * 緯度（分）を返す
     * @method lat
     * @return {Number} (分)
     **/
    this.lat = function() {
        return this._lat;
    }
    
    /**
     * 経度（分）を返す
     * @method lon
     * @return {Number} (分)
     **/
    this.lon = function() {
        return this._lon;
    }
    
    /**
     * 緯度（度）を返す
     * @method latDegrees
     * @return {Number} (度)
     **/
    this.latDegrees = function() {
        return this._lat/60.0;
    }
    
    /**
     * 経度（分）を返す
     * @method lonDegrees
     * @return {Number} (度)
     **/
    this.lonDegrees = function() {
        return this._lon/60.0;
    }
    
    this._lat = parseFloat(lat||0);
    this._lon = parseFloat(lon||0);
    if ( this._lon < -10800 )
        this._lon += 21600;
    else if ( this._lon >= 10800 )
        this._lon -= 21600;
}
