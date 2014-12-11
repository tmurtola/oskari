define([
    "oskari",
    "mapfull",
    "has",
    "bundles/framework/bundle/mapwfs2/plugin/WfsLayerPlugin"
], function (Oskari, mapfull, has) {
    if (has("map-ol2")) {
        // Do nothing
    } else if (has("map-ol3")) {
        Oskari.cls('Oskari.mapframework.bundle.mapwfs2.plugin.WfsLayerPlugin').category({
            _initImpl: function() {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            },
            getGrid: function() {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            },
            refreshCaches: function() {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            }
        });
    } else if (has("map-cesium")) {
        Oskari.cls('Oskari.mapframework.bundle.mapwfs2.plugin.WfsLayerPlugin').category({
            _initImpl: function() {
                // TODO: port to Cesium
                console.log('Not implemented Cesium support yet');
                return false;
            }
        });
    } else if (has("map-leaflet")) {
        Oskari.cls('Oskari.mapframework.bundle.mapwfs2.plugin.WfsLayerPlugin').category({
            _initImpl: function() {
                // TODO: port to Leaflet
                console.log('Not implemented Leaflet support yet');
                return false;
            }
        });
    } else {
        // Unknown maplib
        throw Error("Developer error: Unknown MAPLIB, ensure Oskari.MAPLIB is defined.");
    }
});