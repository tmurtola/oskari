define([
    "oskari",
    "jquery",
//    "libraries/ol3/ol-v3.0.0.min",
    // use debug for debugging
    "libraries/ol3/ol-v3.0.0-debug",
    "libraries/Proj4js/proj4js-2.2.1/proj4-src",
//    "libraries/ol3/ol3-ol2-compatibility",
    "css!resources/ol3/bundle/ol3-default/css/ol-v3.0.0.css"
], function(Oskari, jQuery, ol3, Proj4) {
    Oskari.MAPLIB = "ol3";
    console.log('here MAPLIB set', Oskari.MAPLIB);

    // let's make it global for now, until we figure out how to encapsulate it properly
    window.proj4 = Proj4;

    // we need to add a few WMTS functions that have disappeared from the debug version in the used minified version
    /**
     * Request encoding. One of 'KVP', 'REST'.
     * @enum {string}
     * @api
     */
    ol.source.WMTSRequestEncoding = {
        KVP: 'KVP', // see spec §8
        REST: 'REST' // see spec §10
    };

    /**
     * @param {Object} matrixSet An object representing a matrixSet in the
     *     capabilities document.
     * @return {ol.tilegrid.WMTS} WMTS tileGrid instance.
     */
    ol.source.WMTS.createFromCapabilitiesMatrixSet = function(matrixSet) {

        /** @type {!Array.<number>} */
        var resolutions = [];
        /** @type {!Array.<string>} */
        var matrixIds = [];
        /** @type {!Array.<ol.Coordinate>} */
        var origins = [];
        /** @type {!Array.<number>} */
        var tileSizes = [];

        var supportedCRSPropName = 'supportedCRS';
        var matrixIdsPropName = 'matrixIds';
        var identifierPropName = 'identifier';
        var scaleDenominatorPropName = 'scaleDenominator';
        var topLeftCornerPropName = 'topLeftCorner';
        var tileWidthPropName = 'tileWidth';
        var tileHeightPropName = 'tileHeight';

        var projection = ol.proj.get(matrixSet[supportedCRSPropName]);
        var metersPerUnit = projection.getMetersPerUnit();


        matrixSet[matrixIdsPropName].sort(function(a, b) {
            return b[scaleDenominatorPropName] - a[scaleDenominatorPropName];
        });

        _.forEach(matrixSet[matrixIdsPropName],
            function(elt, index, array) {
                matrixIds.push(elt[identifierPropName]);
                origins.push(elt[topLeftCornerPropName]);
                resolutions.push(elt[scaleDenominatorPropName] * 0.28E-3 /
                    metersPerUnit);
                var tileWidth = elt[tileWidthPropName];
                var tileHeight = elt[tileHeightPropName];
                tileSizes.push(tileWidth);
            });

        return new ol.tilegrid.WMTS({
            origins: origins,
            resolutions: resolutions,
            matrixIds: matrixIds,
            tileSizes: tileSizes
        });
    };

    /**
     * @param {Object} wmtsCap An object representing the capabilities document.
     * @param {string} layer The layer identifier.
     * @return {olx.source.WMTSOptions} WMTS source options object.
     */
    ol.source.WMTS.optionsFromCapabilities = function(wmtsCap, layer) {
        var layers = wmtsCap['contents']['layers'];
        var l = _.find(layers, function(elt, index, array) {
            return elt['identifier'] == layer;
        });
        var matrixSet = /** @type {string} */
            (l['tileMatrixSetLinks'][0]['tileMatrixSet']);
        var format = /** @type {string} */ (l['formats'][0]);
        var idx = _.findIndex(l['styles'], function(elt, index, array) {
            return elt['isDefault'];
        });
        if (idx < 0) {
            idx = 0;
        }
        var style = /** @type {string} */ (l['styles'][idx]['identifier']);

        var dimensions = {};
        _.forEach(l['dimensions'], function(elt, index, array) {
            var key = elt['identifier'];
            var value = elt['default'];
            if (_.isUndefined(value)) {
                value = elt['values'][0];
            }
            dimensions[key] = value;
        });

        var matrixSets = wmtsCap['contents']['tileMatrixSets'];
        var matrixSetObj = matrixSets[matrixSet];

        var tileGrid = ol.source.WMTS.createFromCapabilitiesMatrixSet(
            matrixSetObj);

        var projection = ol.proj.get(matrixSetObj['supportedCRS']);

        var gets = wmtsCap['operationsMetadata']['GetTile']['dcp']['http']['get'];
        var encodings = _.keys(
            gets[0]['constraints']['GetEncoding']['allowedValues']);

        var urls;
        var requestEncoding;
        switch (encodings[0]) {
            case 'REST':
            case 'RESTful':
                // The OGC documentation is not clear if we should use REST or RESTful,
                // ArcGis use RESTful, and OpenLayers use REST.
                requestEncoding = ol.source.WMTSRequestEncoding.REST;
                urls = /** @type {Array.<string>} */
                    (l['resourceUrls']['tile'][format]);
                break;
            case 'KVP':
                requestEncoding = ol.source.WMTSRequestEncoding.KVP;
                urls = [];
                _.forEach(gets, function(elt, index, array) {
                    if (elt['constraints']['GetEncoding']['allowedValues'].hasOwnProperty(
                        ol.source.WMTSRequestEncoding.KVP)) {
                        urls.push( /** @type {string} */ (elt['url']));
                    }
                });
                break;
            default:
                console.log('FAIL: Unknown encoding!', wmtsCap, layer);
        }

        return {
            urls: urls,
            layer: layer,
            matrixSet: matrixSet,
            format: format,
            projection: projection,
            requestEncoding: requestEncoding,
            tileGrid: tileGrid,
            style: style,
            dimensions: dimensions
        };
    };

    return Oskari.bundleCls("ol3").category({
        '__name': 'map-ol3',
        getName: function() {
            return this.__name;
        },
        create: function() {
            return this;
        },
        update: function(manager, bundle, bi, info) {

        },
        start: function() {},
        stop: function() {
            // delete OpenLayers...just joking
        }
    })
});