require.config({
  baseUrl: "/Oskari/", // the base is set to requirejs lib to help requiring 3rd party libs
  paths: { // some path shortcuts to ease declarations
    "oskari": "src/oskari/oskari",
    "oskari-with-app": "src/oskari/oskari-with-app",
    "oskari-with-loader": "src/oskari/oskari-with-loader",
    "jquery": "libraries/jquery/jquery-1.10.2",
    "jquery-ui": "libraries/jquery/jquery-ui-1.9.2.custom",
    "jquery-cookie": "libraries/jquery/plugins/jquery.cookie",
    "org/cometd": "libraries/cometd/cometd",
    "jquery-cometd": "libraries/jquery/plugins/jquery.cometd",
    "dragevent": "libraries/jquery/jquery.event.drag-2.0.min",
    "jquery-migrate": "libraries/jquery/jquery-migrate-1.2.1-modified",
    "css": "libraries/requirejs/lib/css",
    "json": "libraries/requirejs/lib/json",
    "domReady": "libraries/requirejs/lib/domReady",
    "text": "libraries/requirejs/lib/text",
    "i18n": "libraries/requirejs/lib/i18n",
    "normalize": "libraries/requirejs/lib/normalize",
    "backbone": "libraries/backbone/backbone-1.0.0",
    "lodash": "libraries/lodash/2.3.0/lodash",
    "has": "libraries/has/has-with-oskari-tests"
  },
  map: {
    // '*' means all modules will get 'jquery-migrate'
    // for their 'jquery' dependency.
    "*": {
      "oskari": "oskari-with-app",
      "jquery": "jquery-migrate",
      "underscore": "lodash",
      // TODO: rename openlayers-default-theme to maplib
      "openlayers-default-theme": "src/mapmodule/ol2/maplib",
      "mapfull": "src/mapmodule/ol2/module",
      // the rest does not depend on maplib
      "mapanalysis": "src/framework/mapanalysis/module",
      "mapmyplaces": "src/framework/mapmyplaces/module",
      "mapuserlayers": "src/framework/mapuserlayers/module",
      "mapstats": "src/framework/mapstats/module",
      "mapwfs2": "src/framework/mapwfs2/module",
      "mapwmts": "src/framework/mapwmts/module",
      "maparcgis": "src/arcgis/maparcgis/module",
      "admin-layerselector": "src/integration/admin-layerselector/module",
      "admin-layerrights": "src/framework/admin-layerrights/module",
      "divmanazer": "src/framework/divmanazer/module",
      "toolbar": "src/framework/toolbar/module",
      "statehandler": "src/framework/statehandler/module",
      "infobox": "src/framework/infobox/module",
      "search": "src/framework/search/module",
      "routesearch": "src/framework/routesearch/module",
      "layerselector2": "src/framework/layerselector2/module",
      "layerselection2": "src/framework/layerselection2/module",
      "personaldata": "src/framework/personaldata/module",
      "featuredata2": "src/framework/featuredata2/module",
      "maplegend": "src/framework/maplegend/module",
      "userguide": "src/framework/userguide/module",
      "ui-components": "src/framework/ui-components/module",
      "backendstatus": "src/framework/backendstatus/module",
      "postprocessor": "src/framework/postprocessor/module",
      "publisher": "src/framework/publisher/module",
      "guidedtour": "src/framework/guidedtour/module",
      "statsgrid": "src/statistics/statsgrid/module",
      "publishedgrid": "src/statistics/publishedgrid/module",
      "publishedmyplaces2": "src/framework/publishedmyplaces2/module",
      "publishedstatehandler": "src/framework/publishedstatehandler/module",
      "metadataflyout": "src/catalogue/metadataflyout/module",
      "metadatacatalogue": "src/catalogue/metadatacatalogue/module",
      "printout": "src/framework/printout/module",
      "coordinatedisplay": "src/framework/coordinatedisplay/module",
      "analyse": "src/analysis/analyse/module",
      "myplaces2": "src/framework/myplaces2/module",
      "myplacesimport": "src/framework/myplacesimport/module",
      "promote": "src/framework/promote/module",
      "oskariui": "src/framework/oskariui/module",
      "rpc": "src/framework/rpc/module"      
    },

    // 'jquery-migrate' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
    "jquery-migrate": {
      "jquery": "jquery"
    }
  },
  shim: {
    "jquery-ui": {
      deps: ['jquery']
    },
    "jquery-cookie": {
      deps: ['jquery']
    },
    "jquery-cometd": {
      deps: ['org/cometd', 'jquery']
    },
    "dragevent": {
      deps: ['jquery']
    },
    "oskari": {
      exports: "Oskari"
    },
    "backbone": {
      exports: "Backbone",
      deps: ['jquery', 'underscore']
    },
    "lodash": {
      exports: "_"
    }
  },
  waitSeconds: 30
});

/* loading base requirements */
require(["jquery", "oskari-with-app", "domReady"],
    /**
     * ... now we have jQuery and Oskari
     */
    function(jQuery, Oskari) {

        var getAppSetupParams = {},
            key,
            hostIdx,
            pathIdx;

        if (!ajaxUrl) {
            jQuery('#mapdiv').append('Unable to start');
            return;
        }

        function getURLParameter(name) {
            var re = name + '=' + '([^&]*)(&|$)',
                value = new RegExp(re).exec(location.search);
            if (value && value.length && value.length > 1) {
                value = value[1];
            }
            if (value) {
                return decodeURI(value);
            }
            return null;
        }

        // returns empty string if parameter doesn't exist
        // otherwise returns '<param>=<param value>&'
        function getAdditionalParam(param) {
            var value = getURLParameter(param);
            if (value) {
                return param + '=' + value + '&';
            }
            return '';
        }

        function gfiParamHandler(sandbox) {
            if (getURLParameter('showGetFeatureInfo') !== 'true') {
                return;
            }
            var lon = sandbox.getMap().getX(),
                lat = sandbox.getMap().getY(),
                mapModule = sandbox.findRegisteredModuleInstance('MainMapModule'),
                px = mapModule.getMap().getViewPortPxFromLonLat({
                    lon: lon,
                    lat: lat
                });
            sandbox.postRequestByName('MapModulePlugin.GetFeatureInfoRequest', [lon, lat, px.x, px.y]);
        }

        // remove host part from url
        if (ajaxUrl.indexOf('http') === 0) {
            hostIdx = ajaxUrl.indexOf('://') + 3;
            pathIdx = ajaxUrl.indexOf('/', hostIdx);
            ajaxUrl = ajaxUrl.substring(pathIdx);
        }

        // populate url with possible control parameters
        if(ssl) {
            ajaxUrl += "ssl=" + ssl + "&";
        }

        // populate url with possible control parameters
        if (typeof window.controlParams === 'object') {
            for (key in window.controlParams) {
                if (window.controlParams.hasOwnProperty(key)) {
                    getAppSetupParams[key] = window.controlParams[key];
                }
            }
        }

        if (!language) {
            // default to finnish
            language = 'fi';
        }

        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            data : getAppSetupParams,
            url: ajaxUrl + 'action_route=GetAppSetup',
            success: function(appSetup) {
                Oskari.setLang(language);

                Oskari.Application
                    .create()
                    .setStartupSequence(appSetup.startupSequence)
                    .setConfiguration(appSetup.configuration)
                    .start()
                    .success(function() {
                        var sb = Oskari.getSandbox();
                        gfiParamHandler(sb);
                    });
            },
            error: function (jqXHR, textStatus) {
                if (jqXHR.status !== 0) {
                    jQuery('#mapdiv').append('Unable to start');
                }
            }
        });
    }
);