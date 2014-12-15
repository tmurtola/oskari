/* GENERATED with grunt bundle2module, do not modify manually */
define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/geometryeditor/plugin/DrawFilterPlugin",
    "bundles/framework/bundle/geometryeditor/request/StartDrawFilteringRequest",
    "bundles/framework/bundle/geometryeditor/request/StartDrawFilteringRequestHandler",
    "bundles/framework/bundle/geometryeditor/request/StopDrawFilteringRequest",
    "bundles/framework/bundle/geometryeditor/request/StopDrawFilteringRequestHandler",
    "bundles/framework/bundle/geometryeditor/event/FinishedDrawFilteringEvent",
    "libraries/clipper/clipper",
    "libraries/jsts/jsts",
    "bundles/framework/bundle/geometryeditor/locale/fi",
    "bundles/framework/bundle/geometryeditor/locale/sv",
    "bundles/framework/bundle/geometryeditor/locale/en"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("geometryeditor").category({create: function () {
            return null;
        },update: function (manager, bundle, bi, info) {
            manager.alert("RECEIVED update notification " + info);
        }})
});