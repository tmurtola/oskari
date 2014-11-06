define([
    "oskari",
    "jquery",
    "libraries/JSChannel/jschannel",
    "bundles/framework/bundle/rpc/instance"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("rpc").category({create: function () {
            return Oskari.clazz.create(
                "Oskari.mapframework.bundle.rpc.RemoteProcedureCallInstance"
            );
        },update: function (manager, bundle, bi, info) {}})
});