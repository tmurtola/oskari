define([
	"oskari",
	"mapfull",
	"has",
	"bundles/framework/bundle/printout/plugin/LegendPlugin"
], function (Oskari, mapfull, has) {
    if (has("map-ol2")) {
    	// Do nothing
	} else if (has("map-ol3")) {
		Oskari.cls('Oskari.mapframework.bundle.printout.plugin.LegendPlugin').category({
			init : function () {
				// TODO: port _initImpl and related to OL3
				console.log('Not implemented OL3 support yet');
			}
		});
	} else if (has("map-cesium")) {
		Oskari.cls('Oskari.mapframework.bundle.printout.plugin.LegendPlugin').category({
			init : function () {
				// TODO: port _initImpl and related to Cesium
				console.log('Not implemented Cesium support yet');
			}
		});
	} else if (has("map-leaflet")) {
		Oskari.cls('Oskari.mapframework.bundle.printout.plugin.LegendPlugin').category({
			init : function () {
				// TODO: port _initImpl and related to Leaflet
				console.log('Not implemented Leaflet support yet');
			}
		});
    } else {
    	// Unknown maplib
    	throw Error("Developer error: Unknown MAPLIB, ensure MAPLIB is globally defined.");
    }
});