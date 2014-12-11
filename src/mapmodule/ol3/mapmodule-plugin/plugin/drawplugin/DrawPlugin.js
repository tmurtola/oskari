define([
    "oskari",
    "mapfull",
    "has",
    "bundles/framework/bundle/map-module/plugin/DrawPlugin"
], function (Oskari, mapfull, has) {
    if (has("map-ol2")) {
        // Do nothing
    } else if (has("map-ol3")) {
        Oskari.cls('Oskari.mapframework.ui.module.common.mapmodule.DrawPlugin').category({
            _initImpl: function() {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            }
        });
    } else if (has("map-cesium")) {
        Oskari.cls('Oskari.mapframework.ui.module.common.mapmodule.DrawPlugin').category({
            _initImpl: function() {
                // TODO: port to Cesium
                console.log('Not implemented Cesium support yet');
                return false;
            }
        });
    } else if (has("map-leaflet")) {
        Oskari.cls('Oskari.mapframework.ui.module.common.mapmodule.DrawPlugin').category({
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