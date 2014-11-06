define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/layerselection2/instance",
    "./Flyout",
    "bundles/framework/bundle/layerselection2/Tile",
    "css!resources/framework/bundle/layerselection2/css/style.css",
    "bundles/framework/bundle/layerselection2/locale/bg",
    "bundles/framework/bundle/layerselection2/locale/cs",
    "bundles/framework/bundle/layerselection2/locale/da",
    "bundles/framework/bundle/layerselection2/locale/de",
    "bundles/framework/bundle/layerselection2/locale/en",
    "bundles/framework/bundle/layerselection2/locale/es",
    "bundles/framework/bundle/layerselection2/locale/et",
    "bundles/framework/bundle/layerselection2/locale/fi",
    "bundles/framework/bundle/layerselection2/locale/ka",
    "bundles/framework/bundle/layerselection2/locale/el",
    "bundles/framework/bundle/layerselection2/locale/hr",
    "bundles/framework/bundle/layerselection2/locale/hu",
    "bundles/framework/bundle/layerselection2/locale/lv",
    "bundles/framework/bundle/layerselection2/locale/es",
    "bundles/framework/bundle/layerselection2/locale/nl",
    "bundles/framework/bundle/layerselection2/locale/pl",
    "bundles/framework/bundle/layerselection2/locale/pt",
    "bundles/framework/bundle/layerselection2/locale/ro",
    "bundles/framework/bundle/layerselection2/locale/sr",
    "bundles/framework/bundle/layerselection2/locale/sl",
    "bundles/framework/bundle/layerselection2/locale/sk",
    "bundles/framework/bundle/layerselection2/locale/sq",
    "bundles/framework/bundle/layerselection2/locale/sv",
    "bundles/framework/bundle/layerselection2/locale/uk"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("layerselection2").category({create: function () {
        var me = this;
        var inst = Oskari.clazz.create("Oskari.mapframework.bundle.layerselection2.LayerSelectionBundleInstance");

        return inst;

    },update: function (manager, bundle, bi, info) {

    }})
});