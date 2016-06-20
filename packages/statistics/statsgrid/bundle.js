/**
 * @class Oskari.statistics.statsgrid.StatsGridBundle
 *
 * Definitpation for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.statistics.statsgrid.StatsGridBundle",
    /**
     * @method create called automatically on construction
     * @static
     */

    function () {

    }, {
        "create": function () {
            return Oskari.clazz.create("Oskari.statistics.statsgrid.StatsGridBundleInstance",
                'statsgrid');
        }
    }, {
        "protocol": ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
        "source": {
            "scripts": [{
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/instance.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/service/StatisticsService.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/service/ClassificationService.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/service/StateService.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/service/Cache.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/GridModeView.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/StatsView.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/components/RegionsetSelection.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/components/IndicatorSelection.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/components/IndicatorParameters.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/components/Datatable.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/event/IndicatorEvent.js"
            }, {
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/event/RegionsetChangedEvent.js"
            }, {
                "type": "text/css",
                "src": "../../../bundles/statistics/statsgrid2016/resources/css/style.css"
            }, {
                "type" : "text/javascript",
                "expose" : "geostats",
                "src" : "../../../libraries/geostats/1.5.0/lib/geostats.min.js"
            }, {
                "type": "text/css",
                "src" : "../../../libraries/geostats/1.5.0/lib/geostats.css"
            }, {
                "src": "../../../libraries/chosen/1.5.1/chosen.jquery.js",
                "type": "text/javascript"
            }, {
                "src": "../../../libraries/chosen/1.5.1/chosen.css",
                "type": "text/css"
            }],
            "locales": [{
                "lang": "fi",
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/resources/locale/fi.js"
            }, {
                "lang": "en",
                "type": "text/javascript",
                "src": "../../../bundles/statistics/statsgrid2016/resources/locale/en.js"
            }]
        },
        "bundle": {
            "manifest": {
                "Bundle-Identifier": "statsgrid",
                "Bundle-Name": "statsgrid",
                "Bundle-Author": [{
                    "Name": "jjk",
                    "Organisatpation": "nls.fi",
                    "Temporal": {
                        "Start": "2013",
                        "End": "2013"
                    },
                    "Copyleft": {
                        "License": {
                            "License-Name": "EUPL",
                            "License-Online-Resource": "http://www.paikkatietoikkuna.fi/license"
                        }
                    }
                }],
                "Bundle-Verspation": "1.0.0",
                "Import-Namespace": ["Oskari"],
                "Import-Bundle": {}
            }
        },

        /**
         * @static
         * @property dependencies
         */
        "dependencies": ["jquery"]

    });

Oskari.bundle_manager.installBundleClass("statsgrid", "Oskari.statistics.statsgrid.StatsGridBundle");
