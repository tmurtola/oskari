define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/guidedtour/instance",
    "libraries/jquery/plugins/jquery.cookie",
    "css!resources/framework/bundle/guidedtour/css/style.css",
    "bundles/framework/bundle/guidedtour/locale/bg",
    "bundles/framework/bundle/guidedtour/locale/cs",
    "bundles/framework/bundle/guidedtour/locale/da",
    "bundles/framework/bundle/guidedtour/locale/de",
    "bundles/framework/bundle/guidedtour/locale/en",
    "bundles/framework/bundle/guidedtour/locale/es",
    "bundles/framework/bundle/guidedtour/locale/et",
    "bundles/framework/bundle/guidedtour/locale/fi",
    "bundles/framework/bundle/guidedtour/locale/ka",
    "bundles/framework/bundle/guidedtour/locale/el",
    "bundles/framework/bundle/guidedtour/locale/hr",
    "bundles/framework/bundle/guidedtour/locale/hu",
    "bundles/framework/bundle/guidedtour/locale/lv",
    "bundles/framework/bundle/guidedtour/locale/nl",
    "bundles/framework/bundle/guidedtour/locale/pl",
    "bundles/framework/bundle/guidedtour/locale/pt",
    "bundles/framework/bundle/guidedtour/locale/ro",
    "bundles/framework/bundle/guidedtour/locale/sr",
    "bundles/framework/bundle/guidedtour/locale/sl",
    "bundles/framework/bundle/guidedtour/locale/sk",
    "bundles/framework/bundle/guidedtour/locale/sq",
    "bundles/framework/bundle/guidedtour/locale/sv",
    "bundles/framework/bundle/guidedtour/locale/uk"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("guidedtour").category({create: function () {
            var me = this;
            var inst = Oskari.clazz.create(
                "Oskari.framework.bundle.guidedtour.GuidedTourBundleInstance"
            );
            return inst;
        },update: function (manager, bundle, bi, info) {}})
});