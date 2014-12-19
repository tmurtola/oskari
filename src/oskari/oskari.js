/* 
 * 
 * Oskari 2.0 class system 
 * 
 * This module implements Oskari clazz system and bundle management.
 * 
 * Supports class definintion, inheritance, method categories,
 * class metadata, class implementation in separate files.
 *
 * Supports async loading with class stubs and post definition
 * inheritance and method category changes.
 * 
 * Concepts bundle and bundle instance are used to compose
 * application from a set of extension modules.
 * 
 * This is free software.
 *
 */
define("oskari", [
    "src/oskari/LocaleManager", 
    "src/oskari/ClassManager", 
    "src/oskari/Oskari2CoreAPI"], function(LocaleManager, ClassManager, O2API) {

    var isDebug = false,
        hasConsole = window.console && window.console.debug,
        logMsg = function (msg) {
            if (!isDebug) {
                return;
            }

            if (!hasConsole) {
                return;
            }
            window.console.debug(msg);

        };
    // TODO: BundleManager missing!!
    var api = O2API(ClassManager, null);
    var me = {
        VERSION : "2.0.0",
        debug : logMsg,
        clazz : {},
        _baseClassFor : {
            'bundle' : "Oskari.mapframework.bundle.extension.ExtensionBundle"
        },
        cls : api.cls,
        bundleCls : api.bundleCls
    };


    // Copying all locale functions to Oskari
    for(var func in LocaleManager) {
        var value = LocaleManager[func];
        if(typeof value === 'function') {
            me[func] = function() {
                return value.apply(LocaleManager,arguments);
            }
        }
    }

    // Copying all class functions to Oskari
    for(var func in ClassManager) {
        var value = ClassManager[func];
        if(typeof value === 'function') {
            me.clazz[func] = function() {
                //debugger;
                return value.apply(ClassManager,arguments);
            }
        }
    }

        
    window.Oskari = me;
    /**
     * singleton instance of the class system
     *
    var clazz_singleton = new ClassManager();
    var cs = clazz_singleton;
     */
    return me;
});



