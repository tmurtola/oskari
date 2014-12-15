/*
 * mapmodule/ol2 currently consists of
 * - maplib, which is the OpenLayers source codes with proj4js
 * - mapfull, which is an abstraction of the base map module
 * - mapmodule-plugin, which is a collection of map plugins for a specific map-module.
 * - module, which is this file that combines everything together.
 *
 * These files should be refactored so that the maplib can be more easily be changed.
 * All logic should be placed into base. Base should contain the non-implementation specific details.
 *
 * mapmodule-plugin should be renamed to plugin and refactored to contain only maplib specific code.
 *
 * mapfull and module should be combined and dynamically load plugins from plugin.
 *
 * When refactoring, the code should be modfied to use some modular structure so that dependencies are managed. This will enable
 * fully dynamic plugin loading where the maplib could be changed on the fly and all necessary plugins are loaded as needed.
 */

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
    Oskari.bundleCls('oskariui');

    Oskari.bundleCls('mapmodule-plugin');

    return mapfull;
});