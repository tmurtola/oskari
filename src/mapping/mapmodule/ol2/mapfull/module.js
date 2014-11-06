define([
	"oskari",
	"jquery",
	"oskariui",
	"src/framework/mapmodule-plugin/module",
	"src/framework/mapfull/module",
	"mapwmts",
	"mapwfs2",
	"mapstats"
], function(Oskari, jQuery, oskariui, mapmodule, mapfull) {
	Oskari.bundleCls('oskariui');

	Oskari.bundleCls('mapmodule-plugin');

	return Oskari.bundleCls('mapfull').category({
		create: function() {
			return Oskari.cls("Oskari.mapframework.bundle.mapfull.MapFullBundleInstance").create();
		}
	});

});