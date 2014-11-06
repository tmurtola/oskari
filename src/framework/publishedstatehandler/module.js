define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/statehandler/request/SaveStateRequest",
    "bundles/framework/bundle/statehandler/request/SaveStateRequestHandler",
    "bundles/framework/bundle/statehandler/request/SetStateRequest",
    "bundles/framework/bundle/statehandler/request/SetStateRequestHandler",
    "bundles/framework/bundle/publishedstatehandler/instance",
    "bundles/framework/bundle/publishedstatehandler/state-methods"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("publishedstatehandler").category({create: function () {
            return Oskari.clazz.create(
                "Oskari.mapframework.bundle.publishedstatehandler.PublishedStateHandlerBundleInstance"
            );
        },update: function (manager, bundle, bi, info) {}})
});