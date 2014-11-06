define([
	"oskari",
	"jquery",
	"libraries/proj4js-1.0.1/proj4js-compressed",
	"css!resources/openlayers/theme/default/style.css",
	"libraries/OpenLayers/OpenLayers.2_13_1-full-map"
], function(Oskari, jQuery) {
	Oskari.bundleCls('openlayers-default-theme');

	return Oskari.bundleCls("ol2").category({
		'__name': 'lib-ol2',
		getName: function() {
			return this.__name;
		},
		create: function() {
			return this;
		},
		update: function(manager, bundle, bi, info) {

		},
		start: function() {
			var path = "/Oskari/resources/openlayers";
			OpenLayers.ImgPath = path + '/img/';
		},
		stop: function() {
			// delete OpenLayers...just joking
		}
	})
});