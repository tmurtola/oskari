/*
 * PoC: API for Oskari 2.0
 *
 */
define([
    "lodash",
    "src/oskari/2.0/oskari-extensions",
    "src/oskari/base/module"
], function(_ , Oskari) {
    //Oskari.VERSION = "2.1.0"; // Overwrite

    var _startApplication = function(callback) {
        // start app
        var me = this,

            // start modules in the given startupSequence order
            startupSequence = Oskari.getApplicationSetup().startupSequence,
            startupSequenceLength = startupSequence.length,
            modules = [];

        var startModules = function(moduleArray, callback) {
            if (moduleArray.length === 0) {
                if (callback) {
                    callback();
                }
                return Oskari;
            }
            var moduleItem = moduleArray.shift(),
                moduleName = moduleItem.bundlename,
                instancename = moduleItem.bundleinstancename || moduleName;

            require([moduleName], function(module) {
                module.start(instancename);
                // recursively start all modules
                startModules(moduleArray, callback);
            }, function(err) {
                var msg = "Error starting module: " + moduleName;
                if(moduleName !== instancename) {
                    msg = msg + ' as ' + instancename;
                }
                Oskari.log.warn(msg + ". Skipping!");
                // recursively start all modules
                startModules(moduleArray, callback);
            });
        };
        startModules(startupSequence, callback);
    };
    /* Simplified Application API for Oskari 2.0 */

    /* Generic shortcuts */
     Oskari.create = function() {
        return Oskari;
     };

     Oskari.setStartupSequence = function(seq) {
        Oskari.getApplicationSetup().startupSequence = seq || [];
        return Oskari;
     };

    var _result,
        _successFunc;
    Oskari.start = function() {
        _startApplication(function(result) {
            if (_successFunc)
                _successFunc(result);
            else
                _result = result;

            Oskari.log.enableDebug(true);
        });
        return this;
    };
    Oskari.success = function(s) {
        if (_result)
            s(_result);
        else
            _successFunc = s;
        return this;
    };

    Oskari.Application = Oskari;
   
    return Oskari;
});
