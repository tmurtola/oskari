define([
    "oskari",
    "mapfull",
    "has",
    "bundles/framework/bundle/myplaces2/service/MyPlacesWFSTStore"
], function (Oskari, mapfull, has) {
    if (has("map-ol2")) {
        // Do nothing
    } else if (has("map-ol3")) {
        Oskari.cls('Oskari.mapframework.bundle.myplaces2.service.MyPlacesWFSTStore').category({
            connect: function () {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            },
            getCategories: function (cb) {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            },
            getMyPlaces: function (cb) {
                // TODO: port to ol3
                console.log('Not implemented ol3 support yet');
                return false;
            }            
        });
    } else if (has("map-cesium")) {
        Oskari.cls('Oskari.mapframework.bundle.myplaces2.service.MyPlacesWFSTStore').category({
            connect: function () {
                // TODO: port to Cesium
                console.log('Not implemented Cesium support yet');
                return false;
            },
            getCategories: function (cb) {
                // TODO: port to Cesium
                console.log('Not implemented Cesium support yet');
                return false;
            },
            getMyPlaces: function (cb) {
                // TODO: port to Cesium
                console.log('Not implemented Cesium support yet');
                return false;
            }
        });
    } else if (has("map-leaflet")) {
        Oskari.cls('Oskari.mapframework.bundle.myplaces2.service.MyPlacesWFSTStore').category({
            connect: function () {
                // TODO: port to Leaflet
                console.log('Not implemented Leaflet support yet');
                return false;
            },
            getCategories: function (cb) {
                // TODO: port to Leaflet
                console.log('Not implemented Leaflet support yet');
                return false;
            },
            getMyPlaces: function (cb) {
                // TODO: port to Leaflet
                console.log('Not implemented Leaflet support yet');
                return false;
            }
        });
    } else {
        // Unknown maplib
        throw Error("Developer error: Unknown MAPLIB, ensure MAPLIB is globally defined.");
    }
});

    
