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
    "lodash",
    "src/oskari/Logger", 
    "src/oskari/LocaleManager", 
    "src/oskari/ClassManager", 
    "src/oskari/BundleManager"], function(_, Logger, LocaleManager, ClassManager, BundleManager) {

    // Add a sequence counter to Oskari
    var sequences = {};
    var getSeqNextVal = function(type) {
        if (!sequences[type]) {
            sequences[type] = 1;
        } else {
            sequences[type] += 1;
        }
        return sequences[type];
    };
    var Oskari = {
        VERSION : "2.0.0",
        clazz : {},
        log : {},
        getSeqNextVal : getSeqNextVal
    };

    // Copying all logger functions to Oskari.log
    _.forIn(Logger, function(value, key, object) {
        if(typeof value === 'function') {
            Oskari.log[key] = function() {
                return value.apply(Logger,arguments);
            }
        }
    });

    // Copying all locale functions to Oskari
    _.forIn(LocaleManager, function(value, key, object) {
        if(typeof value === 'function') {
            Oskari[key] = function() {
                return value.apply(LocaleManager,arguments);
            }
        }
    });

    // Copying all class functions to Oskari.clazz
    _.forIn(ClassManager, function(value, key, object) {
        if(typeof value === 'function') {
            Oskari.clazz[key] = function() {
                return value.apply(ClassManager,arguments);
            }
        }
    });
    // Copying all bundle functions to Oskari
    _.forIn(BundleManager, function(value, key, object) {
        if(typeof value === 'function') {
            Oskari[key] = function() {
                return value.apply(BundleManager, arguments);
            }
        }
    });
    window.Oskari = Oskari;
    return Oskari;
});



