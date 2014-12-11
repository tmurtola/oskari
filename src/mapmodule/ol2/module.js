console.log('mapmodule load start');
define([
    "oskari",
    "jquery-ui",
    "src/mapmodule/ol2/mapfull/module",
    "mapwmts",
    "mapwfs2",
    "mapmyplaces",
    "mapstats",
    "mapanalysis",
    "mapuserlayers",
    "maparcgis",
    "oskariui",
    "ui-components",
    "src/mapmodule/ol2/mapmodule-plugin/module"
], function(Oskari, jQuery, mapfull) {
    console.log('mapmodule ready', mapfull);
    Oskari.bundleCls('oskariui');

    Oskari.bundleCls('mapmodule-plugin');

    return mapfull;
});