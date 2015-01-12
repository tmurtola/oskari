// load common and app specific configs
define(["/Oskari/applications/default/config.js",
    "/Oskari/applications/paikkatietoikkuna.fi/config.js"
], function(conf, paikkisConf) {
    if (!conf.url) {
        alert('Ajax URL not set - cannot proceed');
        return;
    }

    // populate url with possible control parameters
    if (window.ssl) {
        paikkisConf.params.ssl = window.ssl;
    }

    // loading base requirements
    require(["jquery", "oskari-with-app", "domReady"], function(jQuery, Oskari) {

        Oskari.setLang(paikkisConf.lang);
        jQuery.ajax({
            type: 'POST',
            dataType: 'json',
            data: conf.params,
            url: conf.url + 'action_route=GetAppSetup',
            success: function(appSetup) {
                Oskari.Application
                    .create()
                    .setStartupSequence(appSetup.startupSequence)
                    .setConfiguration(appSetup.configuration)
                    .start()
                    .success(function() {
                        var sb = Oskari.getSandbox();
                        paikkisConf.handleGFI(sb);
                    });
            },
            error: function(jqXHR, textStatus) {
                if (jqXHR.status !== 0) {
                    jQuery('#mapdiv').append('Unable to start');
                }
            }
        });
    });
});