
WRAP.DH.DataHandler.GeoTiff = function(reference, conf, base) {
    
    var self = this;
    
    self.name = conf.Name;
    self.ref = reference;

    self.tile_cache = new WRAP.DH._cache(1000);
    self.data_cache = new WRAP.DH._cache(200);
    
    self.file = conf.Attributes.File;
    self.grid = conf.Attributes.DataGrid;
    self.update_interval = parseFloat(conf.Attributes.UpdateInterval);
    
    self.boundary = {
        n:self.grid.LatBase,
        w:self.grid.LonBase,
        s:self.grid.LatBase-self.grid.LatInterval*self.grid.Height,
        e:self.grid.LonBase+self.grid.LonInterval*self.grid.Width,
    }
    self.tiled = self.grid.TileSize;
    if ( self.tiled ) {
        var y_tile = 1;
        var x_tile = 1;
        var yt = self.tiled, xt = self.tiled;
        while ( yt < self.grid.Height ) {
            yt *= 2;
            y_tile++;
        }
        while ( xt < self.grid.Width ) {
            xt *= 2;
            x_tile++;
        }
        self.max_zoom = (y_tile>x_tile)?y_tile:x_tile;
    }
    
    this.load = function(ref, cb) {
        var file = conf.Attributes.TimeList;
        if ( file ) {
            WRAP.DH._getJSON(file, "Timelist", function(data) {
                if ( data.timelist ) {
                    base.timelist = data.timelist;
                    cb("completed", ref);
                }
                else if ( data.validtime ) {
                    base.validtime = data.validtime;
                    cb("completed", ref);
                }
                else {
                    WRAP.DH._error(self.name + " Timelist format.");
                    cb("error", null);
                }
                             
                if ( self.update_interval > 0 ) {
                    setTimeout(function() {
                        self.ref.load();
                    }, self.update_interval*1000);
                }
            });
        }
    }

    var fieldTagNames = {
        // TIFF Baseline
        0x013B: 'Artist',
        0x0102: 'BitsPerSample',
        0x0109: 'CellLength',
        0x0108: 'CellWidth',
        0x0140: 'ColorMap',
        0x0103: 'Compression',
        0x8298: 'Copyright',
        0x0132: 'DateTime',
        0x0152: 'ExtraSamples',
        0x010A: 'FillOrder',
        0x0121: 'FreeByteCounts',
        0x0120: 'FreeOffsets',
        0x0123: 'GrayResponseCurve',
        0x0122: 'GrayResponseUnit',
        0x013C: 'HostComputer',
        0x010E: 'ImageDescription',
        0x0101: 'ImageLength',
        0x0100: 'ImageWidth',
        0x010F: 'Make',
        0x0119: 'MaxSampleValue',
        0x0118: 'MinSampleValue',
        0x0110: 'Model',
        0x00FE: 'NewSubfileType',
        0x0112: 'Orientation',
        0x0106: 'PhotometricInterpretation',
        0x011C: 'PlanarConfiguration',
        0x0128: 'ResolutionUnit',
        0x0116: 'RowsPerStrip',
        0x0115: 'SamplesPerPixel',
        0x0131: 'Software',
        0x0117: 'StripByteCounts',
        0x0111: 'StripOffsets',
        0x00FF: 'SubfileType',
        0x0107: 'Threshholding',
        0x011A: 'XResolution',
        0x011B: 'YResolution',
        
        // TIFF Extended
        0x0146: 'BadFaxLines',
        0x0147: 'CleanFaxData',
        0x0157: 'ClipPath',
        0x0148: 'ConsecutiveBadFaxLines',
        0x01B1: 'Decode',
        0x01B2: 'DefaultImageColor',
        0x010D: 'DocumentName',
        0x0150: 'DotRange',
        0x0141: 'HalftoneHints',
        0x015A: 'Indexed',
        0x015B: 'JPEGTables',
        0x011D: 'PageName',
        0x0129: 'PageNumber',
        0x013D: 'Predictor',
        0x013F: 'PrimaryChromaticities',
        0x0214: 'ReferenceBlackWhite',
        0x0153: 'SampleFormat',
        0x0154: 'SMinSampleValue',
        0x0155: 'SMaxSampleValue',
        0x022F: 'StripRowCounts',
        0x014A: 'SubIFDs',
        0x0124: 'T4Options',
        0x0125: 'T6Options',
        0x0145: 'TileByteCounts',
        0x0143: 'TileLength',
        0x0144: 'TileOffsets',
        0x0142: 'TileWidth',
        0x012D: 'TransferFunction',
        0x013E: 'WhitePoint',
        0x0158: 'XClipPathUnits',
        0x011E: 'XPosition',
        0x0211: 'YCbCrCoefficients',
        0x0213: 'YCbCrPositioning',
        0x0212: 'YCbCrSubSampling',
        0x0159: 'YClipPathUnits',
        0x011F: 'YPosition',
        
        // EXIF
        0x9202: 'ApertureValue',
        0xA001: 'ColorSpace',
        0x9004: 'DateTimeDigitized',
        0x9003: 'DateTimeOriginal',
        0x8769: 'Exif IFD',
        0x9000: 'ExifVersion',
        0x829A: 'ExposureTime',
        0xA300: 'FileSource',
        0x9209: 'Flash',
        0xA000: 'FlashpixVersion',
        0x829D: 'FNumber',
        0xA420: 'ImageUniqueID',
        0x9208: 'LightSource',
        0x927C: 'MakerNote',
        0x9201: 'ShutterSpeedValue',
        0x9286: 'UserComment',
        
        // IPTC
        0x83BB: 'IPTC',
        
        // ICC
        0x8773: 'ICC Profile',
        
        // XMP
        0x02BC: 'XMP',
        
        // GDAL
        0xA480: 'GDAL_METADATA',
        0xA481: 'GDAL_NODATA',
        
        // Photoshop
        0x8649: 'Photoshop',
        
        // GeoTiff
        0x830E: 'ModelPixelScale',
        0x8482: 'ModelTiepoint',
        0x85D8: 'ModelTransformation',
        0x87AF: 'GeoKeyDirectory',
        0x87B0: 'GeoDoubleParams',
        0x87B1: 'GeoAsciiParams'
    };
    
    var key;
    var fieldTags = {};
    for (key in fieldTagNames) {
        fieldTags[fieldTagNames[key]] = parseInt(key);
    }
    
    var arrayFields = [fieldTags.BitsPerSample, fieldTags.ExtraSamples, fieldTags.SampleFormat, fieldTags.StripByteCounts, fieldTags.StripOffsets, fieldTags.StripRowCounts, fieldTags.TileByteCounts, fieldTags.TileOffsets];
    
    var fieldTypeNames = {
        0x0001: 'BYTE',
        0x0002: 'ASCII',
        0x0003: 'SHORT',
        0x0004: 'LONG',
        0x0005: 'RATIONAL',
        0x0006: 'SBYTE',
        0x0007: 'UNDEFINED',
        0x0008: 'SSHORT',
        0x0009: 'SLONG',
        0x000A: 'SRATIONAL',
        0x000B: 'FLOAT',
        0x000C: 'DOUBLE',
        // introduced by BigTIFF
        0x0010: 'LONG8',
        0x0011: 'SLONG8',
        0x0012: 'IFD8'
    };
    
    var fieldTypes = {};
    for (key in fieldTypeNames) {
        fieldTypes[fieldTypeNames[key]] = parseInt(key);
    }
    
    var geoKeyNames = {
        1024: 'GTModelTypeGeoKey',
        1025: 'GTRasterTypeGeoKey',
        1026: 'GTCitationGeoKey',
        2048: 'GeographicTypeGeoKey',
        2049: 'GeogCitationGeoKey',
        2050: 'GeogGeodeticDatumGeoKey',
        2051: 'GeogPrimeMeridianGeoKey',
        2052: 'GeogLinearUnitsGeoKey',
        2053: 'GeogLinearUnitSizeGeoKey',
        2054: 'GeogAngularUnitsGeoKey',
        2055: 'GeogAngularUnitSizeGeoKey',
        2056: 'GeogEllipsoidGeoKey',
        2057: 'GeogSemiMajorAxisGeoKey',
        2058: 'GeogSemiMinorAxisGeoKey',
        2059: 'GeogInvFlatteningGeoKey',
        2060: 'GeogAzimuthUnitsGeoKey',
        2061: 'GeogPrimeMeridianLongGeoKey',
        2062: 'GeogTOWGS84GeoKey',
        3072: 'ProjectedCSTypeGeoKey',
        3073: 'PCSCitationGeoKey',
        3074: 'ProjectionGeoKey',
        3075: 'ProjCoordTransGeoKey',
        3076: 'ProjLinearUnitsGeoKey',
        3077: 'ProjLinearUnitSizeGeoKey',
        3078: 'ProjStdParallel1GeoKey',
        3079: 'ProjStdParallel2GeoKey',
        3080: 'ProjNatOriginLongGeoKey',
        3081: 'ProjNatOriginLatGeoKey',
        3082: 'ProjFalseEastingGeoKey',
        3083: 'ProjFalseNorthingGeoKey',
        3084: 'ProjFalseOriginLongGeoKey',
        3085: 'ProjFalseOriginLatGeoKey',
        3086: 'ProjFalseOriginEastingGeoKey',
        3087: 'ProjFalseOriginNorthingGeoKey',
        3088: 'ProjCenterLongGeoKey',
        3089: 'ProjCenterLatGeoKey',
        3090: 'ProjCenterEastingGeoKey',
        3091: 'ProjCenterNorthingGeoKey',
        3092: 'ProjScaleAtNatOriginGeoKey',
        3093: 'ProjScaleAtCenterGeoKey',
        3094: 'ProjAzimuthAngleGeoKey',
        3095: 'ProjStraightVertPoleLongGeoKey',
        3096: 'ProjRectifiedGridAngleGeoKey',
        4096: 'VerticalCSTypeGeoKey',
        4097: 'VerticalCitationGeoKey',
        4098: 'VerticalDatumGeoKey',
        4099: 'VerticalUnitsGeoKey'
    };
    
    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
    
    
    var DataView64 = function () {
        function DataView64(arrayBuffer) {
            this._dataView = new DataView(arrayBuffer);
        }
        
        _createClass(DataView64, [
          {
              key: "getUint64",
              value: function (offset, littleEndian) {
                  var left = this.getUint32(offset, littleEndian);
                  var right = this.getUint32(offset + 4, littleEndian);
                  if (littleEndian) {
                      return left << 32 | right;
                  }
                      return right << 32 | left;
                  }
          }, {
              key: "getInt64",
              value: function (offset, littleEndian) {
                  var left, right;
                  if (littleEndian) {
                      left = this.getInt32(offset, littleEndian);
                      right = this.getUint32(offset + 4, littleEndian);
                      return left << 32 | right;
                  }
                  left = this.getUint32(offset, littleEndian);
                  right = this.getInt32(offset + 4, littleEndian);
                  return right << 32 | left;
                  }
          }, {
              key: "getUint8",
              value: function (offset, littleEndian) {
                      return this._dataView.getUint8(offset, littleEndian);
                  }
          }, {
              key: "getInt8",
              value: function (offset, littleEndian) {
                      return this._dataView.getInt8(offset, littleEndian);
                  }
          }, {
              key: "getUint16",
              value: function (offset, littleEndian) {
                      return this._dataView.getUint16(offset, littleEndian);
                  }
          }, {
              key: "getInt16",
              value: function (offset, littleEndian) {
                      return this._dataView.getInt16(offset, littleEndian);
                  }
          }, {
              key: "getUint32",
              value: function (offset, littleEndian) {
                      return this._dataView.getUint32(offset, littleEndian);
                  }
          }, {
              key: "getInt32",
              value: function (offset, littleEndian) {
                      return this._dataView.getInt32(offset, littleEndian);
                  }
          }, {
              key: "getFloat32",
              value: function (offset, littleEndian) {
                      return this._dataView.getFloat32(offset, littleEndian);
                  }
          }, {
              key: "getFloat64",
              value: function (offset, littleEndian) {
                      return this._dataView.getFloat64(offset, littleEndian);
                  }
          }, {
              key: "buffer",
              get: function () {
                  return this._dataView.buffer;
              }
        }]);
        return DataView64;
    }();
    
    function GeoTIFF(rawData, options) {
        this.dataView = new DataView64(rawData);
        options = options || {};
        this.cache = options.cache || false;
        
        var BOM = this.dataView.getUint16(0, 0);
        if (BOM === 0x4949) {
            this.littleEndian = true;
        } else if (BOM === 0x4D4D) {
            this.littleEndian = false;
        } else {
            throw new TypeError("Invalid byte order value.");
        }
        
        var magicNumber = this.dataView.getUint16(2, this.littleEndian);
        if (this.dataView.getUint16(2, this.littleEndian) === 42) {
            this.bigTiff = false;
        } else if (magicNumber === 43) {
            this.bigTiff = true;
            var offsetBytesize = this.dataView.getUint16(4, this.littleEndian);
            if (offsetBytesize !== 8) {
                throw new Error("Unsupported offset byte-size.");
            }
        } else {
            throw new TypeError("Invalid magic number.");
        }
        
        this.fileDirectories = this.parseFileDirectories(this.getOffset(this.bigTiff ? 8 : 4));
    }
    
    GeoTIFF.prototype = {
        getOffset: function (offset) {
            if (this.bigTiff) {
                return this.dataView.getUint64(offset, this.littleEndian);
            }
            return this.dataView.getUint32(offset, this.littleEndian);
        },
            
        getFieldTypeLength: function (fieldType) {
            switch (fieldType) {
                case fieldTypes.BYTE:case fieldTypes.ASCII:case fieldTypes.SBYTE:case fieldTypes.UNDEFINED:
                    return 1;
                case fieldTypes.SHORT:case fieldTypes.SSHORT:
                    return 2;
                case fieldTypes.LONG:case fieldTypes.SLONG:case fieldTypes.FLOAT:
                    return 4;
                case fieldTypes.RATIONAL:case fieldTypes.SRATIONAL:case fieldTypes.DOUBLE:
                case fieldTypes.LONG8:case fieldTypes.SLONG8:case fieldTypes.IFD8:
                    return 8;
                default:
                    throw new RangeError("Invalid field type: " + fieldType);
            }
        },
            
        getValues: function (fieldType, count, offset) {
            var values = null;
            var readMethod = null;
            var fieldTypeLength = this.getFieldTypeLength(fieldType);
            var i;
            
            switch (fieldType) {
                case fieldTypes.BYTE:case fieldTypes.ASCII:case fieldTypes.UNDEFINED:
                    values = new Uint8Array(count);readMethod = this.dataView.getUint8;
                    break;
                case fieldTypes.SBYTE:
                    values = new Int8Array(count);readMethod = this.dataView.getInt8;
                    break;
                case fieldTypes.SHORT:
                    values = new Uint16Array(count);readMethod = this.dataView.getUint16;
                    break;
                case fieldTypes.SSHORT:
                    values = new Int16Array(count);readMethod = this.dataView.getInt16;
                    break;
                case fieldTypes.LONG:
                    values = new Uint32Array(count);readMethod = this.dataView.getUint32;
                    break;
                case fieldTypes.SLONG:
                    values = new Int32Array(count);readMethod = this.dataView.getInt32;
                    break;
                case fieldTypes.LONG8:case fieldTypes.IFD8:
                    values = new Array(count);readMethod = this.dataView.getUint64;
                    break;
                case fieldTypes.SLONG8:
                    values = new Array(count);readMethod = this.dataView.getInt64;
                    break;
                case fieldTypes.RATIONAL:
                    values = new Uint32Array(count * 2);readMethod = this.dataView.getUint32;
                    break;
                case fieldTypes.SRATIONAL:
                    values = new Int32Array(count * 2);readMethod = this.dataView.getInt32;
                    break;
                case fieldTypes.FLOAT:
                    values = new Float32Array(count);readMethod = this.dataView.getFloat32;
                    break;
                case fieldTypes.DOUBLE:
                    values = new Float64Array(count);readMethod = this.dataView.getFloat64;
                    break;
                default:
                    throw new RangeError("Invalid field type: " + fieldType);
            }
            
            // normal fields
            if (!(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
                for (i = 0; i < count; ++i) {
                    values[i] = readMethod.call(this.dataView, offset + i * fieldTypeLength, this.littleEndian);
                }
            }
            // RATIONAL or SRATIONAL
            else {
                for (i = 0; i < count; i += 2) {
                    values[i] = readMethod.call(this.dataView, offset + i * fieldTypeLength, this.littleEndian);
                    values[i + 1] = readMethod.call(this.dataView, offset + (i * fieldTypeLength + 4), this.littleEndian);
                }
            }
            
            if (fieldType === fieldTypes.ASCII) {
                return String.fromCharCode.apply(null, values);
            }
            return values;
        },
            
        getFieldValues: function (fieldTag, fieldType, typeCount, valueOffset) {
            var fieldValues;
            var fieldTypeLength = this.getFieldTypeLength(fieldType);
            
            if (fieldTypeLength * typeCount <= (this.bigTiff ? 8 : 4)) {
                fieldValues = this.getValues(fieldType, typeCount, valueOffset);
            } else {
                var actualOffset = this.getOffset(valueOffset);
                fieldValues = this.getValues(fieldType, typeCount, actualOffset);
            }
            
            if (typeCount === 1 && arrayFields.indexOf(fieldTag) === -1 && !(fieldType === fieldTypes.RATIONAL || fieldType === fieldTypes.SRATIONAL)) {
                return fieldValues[0];
            }
            
            return fieldValues;
        },
            
        parseGeoKeyDirectory: function (fileDirectory) {
            var rawGeoKeyDirectory = fileDirectory.GeoKeyDirectory;
            if (!rawGeoKeyDirectory) {
                return null;
            }
            
            var geoKeyDirectory = {};
            for (var i = 4; i < rawGeoKeyDirectory[3] * 4; i += 4) {
                var key = geoKeyNames[rawGeoKeyDirectory[i]],
                location = rawGeoKeyDirectory[i + 1] ? fieldTagNames[rawGeoKeyDirectory[i + 1]] : null,
                count = rawGeoKeyDirectory[i + 2],
                offset = rawGeoKeyDirectory[i + 3];
                
                var value = null;
                if (!location) {
                    value = offset;
                } else {
                    value = fileDirectory[location];
                    if (typeof value === "undefined" || value === null) {
                        throw new Error("Could not get value of geoKey '" + key + "'.");
                    } else if (typeof value === "string") {
                        value = value.substring(offset, offset + count - 1);
                    } else if (value.subarray) {
                        value = value.subarray(offset, offset + count - 1);
                    }
                }
                geoKeyDirectory[key] = value;
            }
            return geoKeyDirectory;
        },
            
        parseFileDirectories: function (byteOffset) {
            var nextIFDByteOffset = byteOffset;
            var fileDirectories = [];
            
            while (nextIFDByteOffset !== 0x00000000) {
                var numDirEntries = this.bigTiff ? this.dataView.getUint64(nextIFDByteOffset, this.littleEndian) : this.dataView.getUint16(nextIFDByteOffset, this.littleEndian);
                
                var fileDirectory = {};
                
                for (var i = byteOffset + (this.bigTiff ? 8 : 2), entryCount = 0; entryCount < numDirEntries; i += this.bigTiff ? 20 : 12, ++entryCount) {
                    var fieldTag = this.dataView.getUint16(i, this.littleEndian);
                    var fieldType = this.dataView.getUint16(i + 2, this.littleEndian);
                    var typeCount = this.bigTiff ? this.dataView.getUint64(i + 4, this.littleEndian) : this.dataView.getUint32(i + 4, this.littleEndian);
                    //console.log("tifftag="+fieldTag);
                    
                    fileDirectory[fieldTagNames[fieldTag]] = this.getFieldValues(fieldTag, fieldType, typeCount, i + (this.bigTiff ? 12 : 8));
                }
                fileDirectories.push([fileDirectory, this.parseGeoKeyDirectory(fileDirectory)]);
                
                nextIFDByteOffset = this.getOffset(i);
            }
            return fileDirectories;
        }
    };
    
    
    
    var loadImage = function (filename, cb) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', filename);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function (/*e*/) {
//            var TIFFTAG_IMAGEWIDTH = 256;
//            var TIFFTAG_IMAGELENGTH = 257;
//            var TIFFTAG_SAMPLEFORMAT = 339;
            var SAMPLEFORMAT_IEEEFP = 3;

            if ( !Module ) {
                console.log("WRAP.ASM Module not found.");
                cb(filename, []);
                return;
            }
            
            Module.printErr = function(msg) {
                //console.log(msg);
                msg = null;
            }
            
            if ( !Module.tmpFileID )
                Module.tmpFileID = 1;
            else
                Module.tmpFileID += 1;
            var file = String(Module.tmpFileID) + '.tiff';
            Module.FS.createDataFile('/', file, new Uint8Array(xhr.response), true, false);
            var tiff = Module.ccall('TIFFOpen', 'number', ['string', 'string'], [file,'r']);
            if ( !tiff ) {
                console.log("Tiff load error. "+file);
                cb(filename, []);
                return;
            }
            
            var geotiff = new GeoTIFF(this.response);
            var data = geotiff.fileDirectories && geotiff.fileDirectories[0] && geotiff.fileDirectories[0][0];
            var width = data.ImageWidth;    //Module.ccall('GetField', 'number', ['number', 'number'], [tiff, TIFFTAG_IMAGEWIDTH]);
            var height = data.ImageLength;  //Module.ccall('GetField', 'number', ['number', 'number'], [tiff, TIFFTAG_IMAGELENGTH]);
            var format = data.SampleFormat && data.SampleFormat[0];  //Module.ccall('GetField', 'number', ['number', 'number'], [tiff, TIFFTAG_SAMPLEFORMAT]);
            //console.log("file load completed width="+width+" height="+height+" format="+format );
            
            var raster = Module.ccall('_TIFFmalloc', 'number', ['number'], [width * height * 4]);
            //console.log("raster  "+raster);
            var result;
            if ( format == SAMPLEFORMAT_IEEEFP ) {
                result = Module.ccall('TIFFReadEncodedStrip', 'number',
                                      ['number','number','number','number'],
                                      [tiff,0,raster,width * height * 4]);
            }
            else {
                result = Module.ccall('TIFFReadRGBAImageOriented', 'number',
                                      ['number','number','number','number','number','number'],
                                      [tiff,width,height,raster,1,0]);
            }
            if (result === 0) {
                console.log('GeoTiff Data Parse Error');
                cb([]);
                return;
            }
            //console.log("result  "+result);
            
            var data;
            if ( format == SAMPLEFORMAT_IEEEFP )
                data = Module.HEAPF32.subarray(raster/4, raster + width * height);
            else
                data = Module.HEAPU8.subarray(raster, raster + width * height * 4);

            var values = [];
            var count = width*height;
            
//var min = data[0];
//var max = data[0];
            var v;
            for (var i = 0 ; i < count ; i++ ) {
                if ( format == SAMPLEFORMAT_IEEEFP ) {
                    v = data[i];
//if ( min > v )
//    min = v;
//if ( max < v )
//    max = v;
                }
                else {
                    v = (data[i*4+0]<<16)+(data[i*4+1]<<8)+data[i*4+2];
                    v /= 1000.0;
                }
                values[i] = v;
            }
//console.log("file="+file+" min="+min+" max="+max);
            Module.ccall('_TIFFfree', 'number', ['number'], [raster]);
            Module.ccall('TIFFClose', 'number', ['number'], [tiff]);
            
            cb(filename, values);
        };
        xhr.onerror = function (/*e*/) {
            var values = [];
            cb(filename, values);
        }
        xhr.send();
    };
        
    function filePath(content, tile) {
        var path = [];
        
        var elements = (content.element&&Array.isArray(content.element))?content.element.length:0;
        if ( elements ) {
            for ( var i = 0 ; i < elements ; i++ ) {
                var file = self.file;
                for ( var key in content ) {
                    var v = content[key];
                    if ( key == 'element' )
                        v = content[key][i];
                    var t = "%"+key+"%";
                    if ( file.indexOf(t) >= 0 )
                        file = file.replace(t, v);
                }
                if ( tile ) {
                    for ( var key in tile ) {
                        var t = "%"+key+"%";
                        if ( file.indexOf(t) >= 0 )
                            file = file.replace(t, tile[key]);
                    }
                }
                path.push({file:file, index:i});
            }
        }
        else {
            var file = self.file;
            for ( var key in content ) {
                var t = "%"+key+"%";
                if ( file.indexOf(t) >= 0 )
                    file = file.replace(t, content[key]);
            }
            if ( tile ) {
                for ( var key in tile ) {
                    var t = "%"+key+"%";
                    if ( file.indexOf(t) >= 0 )
                        file = file.replace(t, tile[key]);
                }
            }
            path.push({file:file, index:0});
        }
        
        return path;
    }
    
    function makeTileKey(content, tile_id, option) {
        var tile_key = "";
        var count = 0;
        for ( var key in content ) {
            var v = content[key];
            if ( Array.isArray(v) && v.length ) {
                var t = v[0];
                for ( var i = 0 ; i < v.length ; i++ ) {
                    t += ("+"+v[i]);
                }
            }
            if ( count++ )
                tile_key += "/";
            tile_key += v;
        }
        tile_key += "/"+tile_id;
        if ( option )
            tile_key += "/"+option;
        return tile_key;
    }
    
    this.getTile = function(content, tile_id, option) {
        var tile = this.tile_cache.get(makeTileKey(content, tile_id, option));
        if ( tile && tile.data )
            return tile.data;
//console.log("getTile false"+ makeTileKey(content, z, y, x));
        return null;
    }
    
    this.loadTile = function(content, tile_id, option, z, y, x, cood, bounds, cb) {
        var key = makeTileKey(content, tile_id, option);
        if ( self.tile_cache.get(key) ) {
            cb();
            return;
        }

        var data_list = [];
        if ( self.tiled ) {
//console.log("loadTile key="+key);
            
            var s_lat = cood[0];
            var s_lon = cood[1];
            var e_lat = cood[256*256*2-2];
            var e_lon = cood[256*256*2-1];
            var req_lond = Math.abs(e_lon-s_lon)/256;
            var req_latd = Math.abs(s_lat-e_lat)/256;
            
            var z = 0;
            var lond = self.grid.LonInterval;
            var latd = self.grid.LatInterval;
            while ( z < self.max_zoom ) {
                if ( lond >= req_lond && latd >= req_latd )
                    break;
                lond *= 2;
                latd *= 2;
                z++;
            }
            var sep = Math.pow(2,z);
            var tileHeight = self.grid.LatInterval*self.grid.TileSize*sep;
            var tileWidth = self.grid.LonInterval*self.grid.TileSize*sep;
            var h = Math.ceil(self.grid.Height/self.grid.TileSize);
            var w = Math.ceil(self.grid.Width/self.grid.TileSize);
            for ( var y = 0 ; y < h ; y ++ ) {
                var sy = self.grid.LatBase - y*tileHeight;
                var ey = sy - tileHeight;
                if ( e_lat > sy || ey > s_lat )
                    continue;
                for ( var x = 0 ; x < w ; x ++ ) {
                    var sx = self.grid.LonBase + x*tileWidth;
                    var ex = sx+tileWidth;
                    if ( e_lon < sx || ex < s_lon )
                        continue;
                    var data_file = filePath(content, {z:z, y:y, x:x});
                    for ( var i = 0 ; i < data_file.length ; i++ ) {
//console.log("tile="+data_file[i]);
                        var data = self.data_cache.get(data_file[i].file);
                        data_list.push({
                            file:data_file[i].file,
                            index:data_file[i].index,
                            element:data_file.length,
                            width:self.grid.TileSize,
                            height:self.grid.TileSize,
                            n:sy,
                            w:sx,
                            s:ey,
                            e:ex,
                            latInterval:self.grid.LatInterval*sep,
                            lonInterval:self.grid.LonInterval*sep,
                            data:data?data.data:null
                        });
                    }
                }
            }
        }
        else {
            var data_file = filePath(content);
            for ( var i = 0 ; i < data_file.length ; i++ ) {
                var data = self.data_cache.get(data_file[i]);
                data_list.push({
                    file:data_file[i].file,
                    index:data_file[i].index,
                    element:data_file.length,
                    width:self.grid.Width,
                    height:self.grid.Height,
                    n:self.grid.LatBase,
                    w:self.grid.LonBase,
                    s:self.grid.LatBase-self.grid.LatInterval*self.grid.Height,
                    e:self.grid.LonBase+self.grid.LonInterval*self.grid.Width,
                    latInterval:self.grid.LatInterval,
                    lonInterval:self.grid.LonInterval,
                    data:data?data.data:null
                });
            }
        }
        
        function loadComplete() {
            var completed = true;
            for ( var i = 0 ; i < data_list.length ; i++ ) {
//console.log("data_list["+i+"] data="+(data_list[i].data?"true":"false"));
//if ( data_list[i].data )
//    console.log("data_list["+i+"] data.data="+(data_list[i].data.data?"true":"false"));
                if ( !data_list[i].data || !data_list[i].data.data ) {
//console.log("!!!");
                    var data = self.data_cache.get(data_list[i].file);
                    if ( data && data.data && data.data.data ) {
                       data_list[i].data = data.data;
                        continue;
                    }
                    completed = false;
                    break;
                }
            }
            if ( completed ) {
//console.log("loadCompelte key="+key);
                if ( option == "value" ) {
                    var n = bounds.north/60.0 + 0.1;
                    var s = bounds.south/60.0;
                    var w = bounds.west/60.0 - 0.1;
                    var e = bounds.east/60.0;
                    
                    var tile = { data:[] };
                    for ( var i = 0 ; i < data_list.length ; i++ ) {
                        var d = data_list[i];
                        var v = d.data.data;
                        
                        var sep = Math.pow(2,z);
                        var ppd = 256/(360.0/sep)
                        var interval = 40;
                        var step = 1;
                        var di = d.lonInterval;
                        while ( step < 256 ) {
                            if ( di*ppd >= interval )
                                break;
                            di *= 2.0;
                            step *= 2.0;
                        }
                        
                        for ( yi = 0 ; yi < d.height ; yi+=step ) {
                            var lat = d.n - d.latInterval*yi;
                            if ( lat > n || s >= lat )
                                continue;
                            for ( xi = 0 ; xi < d.width ; xi+=step ) {
                                var lon = d.w + d.lonInterval*xi;
                                if ( lon < w || e <= lon )
                                    continue;
                                var d_index = yi*d.width+xi;
                                var vv = v[d_index];
                                if ( d.element > 1 ) {
                                    var vd = null;
                                    for ( var t = 0 ; t < tile.data.length ; t++ ) {
                                        var a = tile.data[t];
                                        if ( a.lat == lat && a.lon == lon ) {
                                            vd = a;
                                            a.value[d.index] = vv;
                                            break;
                                        }
                                    }
                                    if ( !vd ) {
                                        vd = { lat:lat, lon:lon, value:[] };
                                        vd.value[d.index] = vv;
                                        tile.data.push(vd);
                                    }
                                    
                                }
                                else {
                                    tile.data.push({lat:lat, lon:lon, value:vv});
                                }
                            }
                        }
                    }
                    self.tile_cache.set(key, tile);
                    cb();
                    return;
                }
                
                var tile = {
                    width:256,
                    height:256,
                    data:new Array(256*256)
                }
                
                var num = 256*256;
                var l = 0;
                if ( option == "interpolate") {
                    for ( var p = 0 ; p < num ; p++ ) {
                        var lat = cood[l++];
                        var lon = cood[l++];
                        for ( var i = 0 ; i < data_list.length ; i++ ) {
                            var d = data_list[i];
                            var v = d.data.data;
                            var yp = (d.n-lat)/d.latInterval;
                            var yi = Math.floor(yp);
                            if ( 0 <= yi && yi < d.height ) {
                                var xp = (lon-d.w)/d.lonInterval;
                                var xi = Math.floor(xp);
                                if ( 0 <= xi && xi < d.width ) {
                                    var d_index = yi*d.width+xi;
                                    var vv = v[d_index];
                                    
                                    if ( yi+1 < d.height && xi+1 < d.width ) {
                                        var lt = vv;
                                        var rt = v[d_index+1];
                                        var lb = v[d_index+d.width];
                                        var rb = v[d_index+d.width+1];
                                        var yr = yp-yi;
                                        var xr = xp-xi;
                                        vv = lt*(1.0-yr)*(1.0-xr)
                                           + rt*(1.0-yr)*xr
                                           + lb*yr*(1.0-xr)
                                           + rb*xr*yr;
                                    }
                                    tile.data[p] = vv;
                                }
                            }
                        }
                    }
                }
                else {  // nearest
                    for ( var p = 0 ; p < num ; p++ ) {
                        var lat = cood[l++];
                        var lon = cood[l++];
                        for ( var i = 0 ; i < data_list.length ; i++ ) {
                            var d = data_list[i];
                            var v = d.data.data;
                            var yi = Math.floor((d.n-lat)/d.latInterval);
                            if ( 0 <= yi && yi < d.height ) {
                                var xi = Math.floor((lon-d.w)/d.lonInterval);
                                if ( 0 <= xi && xi < d.width ) {
                                    var d_index = yi*d.width+xi;
                                    var vv = v[d_index];
                                    tile.data[p] = vv;
                                }
                            }
                        }
                    }
                }
                
//console.log("load complete set cache "+key);
                self.tile_cache.set(key, tile);
                cb();
            }
            return completed;
        }
            
        if ( loadComplete() ) {
            return;
        }
        
        for ( var i = 0 ; i < data_list.length ; i++ ) {
            if ( !data_list[i].data ) {
                data_list[i].data = {};
                self.data_cache.set(data_list[i].file, data_list[i].data);
//console.log("loadImage "+data_list[i].file);
                loadImage(data_list[i].file, function(file, data) {
//console.log("loaded "+file);
                          
                    var loaded = {data:data};
                    self.data_cache.set(file, loaded);
                    for ( var j = 0 ; j < data_list.length ; j++ ) {
                        if ( data_list[j].file == file ) {
                              data_list[j].data = loaded;
                              loadComplete();
                              break;
                        }
                    }
                });
            }
        }
    }
    
    if ( self.update_interval > 0 )
        self.ref.load();
}

