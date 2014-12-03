define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/myplacesimport/domain/UserLayer",
    "bundles/framework/bundle/myplacesimport/domain/UserLayerModelBuilder",
    "bundles/framework/bundle/myplacesimport/plugin/UserLayersLayerPlugin",
    "bundles/framework/bundle/myplacesimport/locale/fi",
    "bundles/framework/bundle/myplacesimport/locale/sv",
    "bundles/framework/bundle/myplacesimport/locale/en"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("mapuserlayers").category({create: function () {
            return null;
        },update: function (manager, bundle, bi, info) {
            manager.alert("RECEIVED update notification " + info);
        }})
});