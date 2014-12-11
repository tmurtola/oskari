define([
    "oskari",
    "jquery",
    "./instance",
    "bundles/framework/bundle/mapfull/enhancement/start-map-with-link-enhancement",
    "bundles/framework/bundle/mapfull/request/MapResizeEnabledRequest",
    "bundles/framework/bundle/mapfull/request/MapResizeEnabledRequestHandler",
    "bundles/framework/bundle/mapfull/request/MapWindowFullScreenRequest",
    "bundles/framework/bundle/mapfull/request/MapWindowFullScreenRequestHandler",
    "bundles/framework/bundle/mapfull/request/MapSizeUpdateRequest",
    "bundles/framework/bundle/mapfull/request/MapSizeUpdateRequestHandler",
    "css!resources/framework/bundle/mapfull/css/style.css",
    "bundles/framework/bundle/mapfull/locale/fi",
    "bundles/framework/bundle/mapfull/locale/sv",
    "bundles/framework/bundle/mapfull/locale/en"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("mapfull").category({create: function () {
        return Oskari.clazz.create("Oskari.mapframework.bundle.mapfull.MapFullBundleInstance");
    },update: function (manager, bundle, bi, info) {

    }})
});