define([
    "libraries/geostats/geostats-0.9.min",
    "libraries/geostats/jenks.util",
    "bundles/statistics/bundle/statsgrid/instance"
    ], function (geostats, jenks, instance) {
    // load helper to make geostats global
    window.geostats = geostats;
});