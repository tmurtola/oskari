require.config({
  baseUrl: "/Oskari/", // the base is set to requirejs lib to help requiring 3rd party libs
  paths: { // some path shortcuts to ease declarations
    "oskari": "src/oskari/oskari",
    "oskari-with-app": "src/oskari/oskari-with-app",
    //"oskari-with-loader": "src/oskari/oskari-with-loader",
    //"jquery": "/libraries/jquery/jquery-1.10.2",
    //"jquery-paikkatietoikkuna": "/mml-2.0-theme/js/pack.js",
    //"jquery-legacy": "libraries/jquery/jquery-1.7.1.min",
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
      // don't load any version of jquery so we get the one defined on paikkatietoikkuna/theme-mml
      //"jquery": "jquery-legacy",
      //"jquery": "jquery-paikkatietoikkuna",
      //"underscore": "lodash",
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
    "statsgrid": {
      deps: ['dragevent']
    },
    "jquery-cometd": {
      deps: ['org/cometd']
    },
    "oskari-with-app": {
      deps: ['oskari']
    },
    "oskari": {
      exports: "Oskari"
    },
    "backbone": {
      exports: "Backbone",
      deps: ['jquery', 'lodash']
    },
    "lodash": {
      exports: "_"
    }
  },
  waitSeconds: 30
});

define(function() {
    var getAppSetupParams = {},
        key;

    // populate url with possible control parameters
    if (typeof window.controlParams === 'object') {
        for (key in window.controlParams) {
            if (window.controlParams.hasOwnProperty(key)) {
                getAppSetupParams[key] = window.controlParams[key];
            }
        }
    }

    return {
    	url : window.ajaxUrl,
    	params : getAppSetupParams
    }
});