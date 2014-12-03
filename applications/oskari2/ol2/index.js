// GLOBAL
// TODO: move to jsp and add value from db
MAPLIB = "ol2";

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
    "backbone": "libraries/backbone/backbone-1.1.2",
    "lodash": "libraries/lodash/2.3.0/lodash",
    "has": "libraries/has/has-with-oskari-tests"
  },
  map: {
    // '*' means all modules will get 'jquery-private'
    // for their 'jquery' dependency.
    "*": {
      "oskari": "oskari-with-app",
      "jquery": "jquery-migrate",
      "underscore": "lodash",
      // TODO: rename openlayers-default-theme to map or something
      // these are map engine specific and are static due to the build tool
      "openlayers-default-theme": "src/oskari/map-ol2/module",
      "mapanalysis": "src/framework/mapanalysis/module",
      "mapfull": "src/mapping/mapmodule/ol2/mapfull/module",
      "mapmyplaces": "src/framework/mapmyplaces/module",
      "mapuserlayers": "src/framework/mapuserlayers/module",
      "mapstats": "src/framework/mapstats/module",
      "mapwfs2": "src/framework/mapwfs2/module",
      "mapwmts": "src/framework/mapwmts/module",
      "maparcgis": "src/arcgis/maparcgis/module",
      // the rest should not depend on map engine
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

    // 'jquery-private' wants the real jQuery module
    // though. If this line was not here, there would
    // be an unresolvable cyclic dependency.
    "jquery-migrate": {
      "jquery": "jquery"
    }
  },
  shim: {
    "jquery-ui": {
      exports: "$",
      deps: ['jquery']
    },
    "jquery-cookie": {
      exports: "$",
      deps: ['jquery']
    },
    "jquery-cometd": {
      exports: "$",
      deps: ['org/cometd', 'jquery']
    },
    "dragevent": {
      exports: "$",
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

        function getURLParameter(name) {
            var re = name + '=' + '([^&]*)(&|$)';
            var value = RegExp(re).exec(location.search);
            if (value && value.length && value.length > 1) {
                value = value[1];
            }
            if (value) {
                return decodeURI(value);
            }
            return null;
        }

        function gfiParamHandler(sandbox) {
            if (getURLParameter('showGetFeatureInfo') != 'true') {
                return;
            }
            var lon = sandbox.getMap().getX();
            var lat = sandbox.getMap().getY();
            var mapModule = sandbox.findRegisteredModuleInstance('MainMapModule');
            var px = mapModule.getMap().getViewPortPxFromLonLat({
                lon: lon,
                lat: lat
            });
            sandbox.postRequestByName('MapModulePlugin.GetFeatureInfoRequest', [lon, lat, px.x, px.y]);
        }

        var config = "json!applications/oskari2/ol2/appsetupconfig.json";
        if (window.ajaxUrl) {
            // populate url with possible control parameters
            var getAppSetupParams = "";
            if (typeof window.controlParams == 'object') {
                for (var key in controlParams) {
                    // FIXME: URLENCODE!!!
                    getAppSetupParams += "&" + key + "=" + controlParams[key];
                }
            }

            config = "json!" + window.ajaxUrl + "action_route=GetAppSetup" + getAppSetupParams;
        }

        /* loading configuration */
        require([config], function(appSetup) {

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
        });
    }
);