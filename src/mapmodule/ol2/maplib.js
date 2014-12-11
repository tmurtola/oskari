define([
    "oskari",
    "libraries/OpenLayers/OpenLayers.2_13_1-full-map",
    "libraries/proj4js-1.0.1/proj4js-compressed",
    // load openlayers-default-theme css
    "css!resources/openlayers/theme/default/style.css"
], function(Oskari) {
    Oskari.MAPLIB = "ol2";
    console.log('here MAPLIB set', Oskari.MAPLIB);

    Oskari.bundleCls('openlayers-default-theme');

    return Oskari.bundleCls("ol2").category({
        '__name': 'map-ol2',
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