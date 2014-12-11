console.log('mapmodule load start');
define([
    "oskari",
    "jquery-ui",
    "src/mapmodule/ol3/mapfull/module",
    "lodash",
    "mapwmts",
    "mapwfs2",
    "mapmyplaces",
    "mapstats",
    "mapanalysis",
    "mapuserlayers",
    "maparcgis",
    "oskariui",
    "ui-components",
    "src/mapmodule/ol3/mapmodule-plugin/module"
], function(Oskari, jQuery, mapfull, _) {
    console.log('mapmodule ready', mapfull);
    Oskari.bundleCls('oskariui');

    Oskari.bundleCls('mapmodule-plugin');

    Oskari
        .cls("Oskari.mapframework.bundle.mapfull.MapFullBundleInstance")
        .category({
            nomaprender: true,
            _handleProjectionDefs: function (defs) {
                var defaultDefs = [
                        ["urn:ogc:def:crs:EPSG:6.3:3067", "+proj=utm +zone=35 +ellps=GRS80 +units=m +no_defs"],
                        ["EPSG:4326", "+title=WGS 84 +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"]
                    ];
                if (_.isArray(defs)) {
                    proj4.defs(defs);
                } else if (_.isObject(defs)) {
                    // Note! arrays are also Objects
                    for (proj in defs) {
                        proj4.defs(proj, defs[proj]);
                    }
                } else {
                    proj4.defs(defaultDefs);
                }
            }
        });

    return mapfull;
});