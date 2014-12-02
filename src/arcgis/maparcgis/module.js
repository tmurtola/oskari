define([
    "oskari",
    "jquery",
    "bundles/arcgis/bundle/maparcgis/plugin/ArcGisLayerPlugin",
    "bundles/arcgis/bundle/maparcgis/domain/ArcGisLayer"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("maparcgis").category({create: function () {

		return null;
	},update: function (manager, bundle, bi, info) {
		manager.alert("RECEIVED update notification " + info);
	}})
});