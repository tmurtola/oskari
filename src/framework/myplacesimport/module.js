define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/myplacesimport/instance",
    "bundles/framework/bundle/myplacesimport/Flyout",
    "bundles/framework/bundle/myplacesimport/service/MyPlacesImportService",
    "bundles/framework/bundle/myplacesimport/UserLayersTab",
    "css!resources/framework/bundle/myplacesimport/css/style.css",
    "bundles/framework/bundle/myplacesimport/locale/fi",
    "bundles/framework/bundle/myplacesimport/locale/sv",
    "bundles/framework/bundle/myplacesimport/locale/en"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("myplacesimport").category({create: function () {
        return Oskari.clazz.create("Oskari.mapframework.bundle.myplacesimport.MyPlacesImportBundleInstance");
    },update: function (manager, bundle, bi, info) {}})
});