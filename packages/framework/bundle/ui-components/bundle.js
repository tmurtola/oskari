/**
 * Adds user interface components
 *
 * @class Oskari.userinterface.bundle.ui.ComponentsBundle
 */
Oskari.clazz.define("Oskari.userinterface.bundle.ui.ComponentsBundle", function() {

}, {
    /**
     * @method create does nothing since the bundle just adds a bunch of files to use.
     * @return {Oskari.userinterface.bundle.ui.ComponentsBundleInstance}
     */
    "create" : function() {
    },
    /**
     * @method update called by the bundle manager to inform on changes in
     * bundlage
     */
    "update" : function(manager, bundle, bi, info) {
    }
}, {
    /**
     * @static
     * @property protocol protocols implemented by this bundle
     */
    "protocol" : ["Oskari.bundle.Bundle"],
    "source" : {
        /**
         * @static
         * @property source.scripts
         *
         */
        "scripts" : [{
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Component.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/FormComponent.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Accordion.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/AccordionPanel.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/TabContainer.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/TabDropdownContainer.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/TabPanel.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Badge.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Alert.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Popup.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/PopupService.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Overlay.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Button.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Form.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/UIHelper.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/FormInput.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Popover.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/Grid.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/GridModel.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/ProgressSpinner.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/VisualizationForm.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/visualization-form/AreaForm.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/visualization-form/LineForm.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/component/visualization-form/DotForm.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../libraries/jquery/plugins/jquery-placeholder/jquery.placeholder.js"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/visualizationform.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/divman.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/accordion.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/tab.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/modal.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/badge.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/alert.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/forminput.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/grid.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/popup.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/button.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/overlay.css"
        }, {
            "type" : "text/css",
            "src" : "../../../../bundles/framework/divmanazer/resources/css/popover.css"
        }],
        "locales" : [{
            "lang" : "fi",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/resources/locale/fi.js"
        }, {
            "lang" : "sv",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/resources/locale/sv.js"
        }, {
            "lang" : "en",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/resources/locale/en.js"
        }, {
            "lang" : "cs",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/resources/locale/cs.js"
        }, {
            "lang" : "de",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/resources/locale/de.js"
        }, {
            "lang" : "es",
            "type" : "text/javascript",
            "src" : "../../../../bundles/framework/divmanazer/resources/locale/es.js"
        }]
    },
    "bundle" : {
        /**
         * @static
         * @property bundle.manifest
         */
        "manifest" : {
            "Bundle-Identifier" : "ui-components",
            "Bundle-Name" : "ui-components",
            "Bundle-Tag" : {
                "mapframework" : true
            },

            "Bundle-Author" : [{
                "Name" : "jjk",
                "Organisation" : "nls.fi",
                "Temporal" : {
                    "Start" : "2009",
                    "End" : "2011"
                },
                "Copyleft" : {
                    "License" : {
                        "License-Name" : "EUPL",
                        "License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale" : {
                "fi" : {
                    "Name" : " kpI",
                    "Title" : " kpI"
                },
                "en" : {}
            },
            "Bundle-Version" : "1.0.0",
            "Import-Namespace" : ["Oskari"],
            "Import-Bundle" : {}
        }
    }
});

Oskari.bundle_manager.installBundleClass("ui-components", "Oskari.userinterface.bundle.ui.ComponentsBundle");
