/**
 * An Oskari bundle registry
 */

define(function() {

        var serial = 0;
        var bundleDefinitions = {};
        var sources = {};
        var bundleInstances = {};
        var bundles = {};

        /*
         * CACHE for lookups state management
         */
        var bundleDefinitionStates = {};

        var bundleSourceStates = {};

        /* CACHE for statuses */
        var bundleStates = {};

        var triggers = [];

        var loaderStateListeners = [];

        /**
         * @private @method _purge
         */
        var _purge = function () {
            var p;

            for (p in sources) {
                if (sources.hasOwnProperty(p)) {
                    delete sources[p];
                }
            }
            for (p in bundleDefinitionStates) {
                if (bundleDefinitionStates.hasOwnProperty(p)) {
                    delete bundleDefinitionStates[p].loader;
                }
            }
            for (p in bundleSourceStates) {
                if (bundleSourceStates.hasOwnProperty(p)) {
                    delete bundleSourceStates[p].loader;
                }
            }
        };
        /**
         * @private @method _install
         * installs bundle
         * DOES not INSTANTIATE only register bundleDefinition as function
         * declares any additional sources required
         *
         * @param {string}   biid             Bundle implementation id
         * @param {function} bundleDefinition Bundle registration function
         * @param {Object}   srcFiles         Source files
         * @param {Object}   bundleMetadata   Bundle metadata
         *
         */
    var _install = function (biid, bundleDefinition, srcFiles, bundleMetadata) {
            var me = this,
                defState = bundleDefinitionStates[biid],
                srcState;

            if (defState) {
                defState.state = 1;
                Oskari.log.debug('SETTING STATE FOR BUNDLEDEF ' + biid +
                    ' existing state to ' + defState.state);
            } else {
                defState = {
                    state: 1
                };

                bundleDefinitionStates[biid] = defState;
                Oskari.log.debug('SETTING STATE FOR BUNDLEDEF ' + biid +
                    ' NEW state to ' + defState.state);
            }
            defState.metadata = bundleMetadata;

            bundleDefinitions[biid] = bundleDefinition;
            sources[biid] = srcFiles;

            srcState = bundleSourceStates[biid];
            if (srcState) {
                if (srcState.state === -1) {
                    Oskari.log.debug('Triggering loadBundleSources for ' +
                        biid + ' at loadBundleDefinition');
                    // TODO: hook loader?
                    /*
                    window.setTimeout(function () {
                        me.loadBundleSources(biid);
                    }, 0);
*/
                } else {
                    Oskari.log.debug('Source state for ' + biid +
                        ' at loadBundleDefinition is ' + srcState.state);
                }
            }
            postChange(null, null, 'bundle_definition_loaded');
        };

        /**
         * @private @method _update
         * Fires any pending bundle or bundle instance triggers
         *
         * @param {Object} bundle         Bundle
         * @param {Object} bundleInstance Bundle instance
         * @param {string} info           Info
         *
         */
        var _update = function (bundle, bundleInstance, info) {
            // resolves any bundle dependencies
            // this must be done before any starts
            // TO-DO
            // - bind package exports and imports
            // - bind event imports and exports
            // - bind request exports ( and imports)
            // - bind any Namespaces (== Globals imported )
            // - fire any pending triggers
            var me = this,
                n,
                t;

            Oskari.log.debug('Update called with info ' + info);

            for (n = 0; n < triggers.length; n += 1) {
                t = triggers[n];
                t.execute(me);
            }
        };
       var postChange = function (bundle, bundleInstance, info) {
	            var me = this,
	                i,
	                instance,
	                bndl;

	            if (info === null || info === undefined) {
	                throw new TypeError('postChange(): Missing info');
	            }

	            _update(bundle, bundleInstance, info);
	            // bundles
	            for (i in bundles) {
	                if (bundles.hasOwnProperty(i)) {
	                    bndl = bundles[i];
	                    bndl.update(me, bundle, bundleInstance, info);
	                }
	            }
	            // and instances
	            for (i in bundleInstances) {
	                if (bundleInstances.hasOwnProperty(i)) {
	                    instance = bundleInstances[i];
	                    if (instance) {
	                        instance.update(Oskari, bundle, bundleInstance, info);
	                    }
	                }
	            }
	        };

	return {

	        /**
	         * @public @method postChange
	         * Posts a notification to bundles and bundle instances.
	         *
	         * @param {Object=} bundle         Bundle
	         * @param {Object=} bundleInstance Bundle instance
	         * @param {string}  info           Info
	         *
	         */
	        postChange: postChange,
			notifyLoaderStateChanged : function (bundleLoader, finished) {
	            var i,
	                callback;

	            if (loaderStateListeners.length === 0) {
	                return;
	            }
	            for (i = 0; i < loaderStateListeners.length; i += 1) {
	                callback = loaderStateListeners[i];
	                callback(bundleLoader, finished);
	            }
	        },
	        /**
	         * @public @method registerLoaderStateListener
	         *
	         * @param {function(Bundle_loader, boolean)} callback Callback function
	         *
	         */
	        registerLoaderStateListener: function (callback) {
	            loaderStateListeners.push(callback);
	        },
	        /**
	         * @public @method installBundleClass
	         * Installs a bundle defined as Oskari native Class.
	         *
	         * @param {string} biid      Bundle implementation ID
	         * @param {string} className Class name
	         *
	         */
	        installBundleClass: function (biid, className) {
	            var classmeta = Oskari.clazz.getMetadata(className),
	                bundleDefinition = Oskari.clazz.builder(className),
	                sourceFiles = classmeta.meta.source,
	                bundleMetadata = classmeta.meta.bundle;

	            _install(
	                biid,
	                bundleDefinition,
	                sourceFiles,
	                bundleMetadata
	            );
	        },
	        /**
	         * @public @method installBundleClassInfo
	         * Installs a bundle defined as Oskari native Class
	         *
	         * @param {string} biid      Bundle implementation ID
	         * @param {Object} classInfo ClassInfo
	         *
	         */
	        installBundleClassInfo: function (biid, classInfo) {
	            var bundleDefinition = Oskari.clazz.getBuilderFromClassInfo(classInfo),
	                bundleMetadata = classInfo._metadata,
	                sourceFiles = {};

	            if (biid === null || biid === undefined) {
	                throw new TypeError('installBundleClassInfo(): Missing biid');
	            }

	            if (classInfo === null || classInfo === undefined) {
	                throw new TypeError(
	                    'installBundleClassInfo(): Missing classInfo'
	                );
	            }

	            _install(
	                biid,
	                bundleDefinition,
	                sourceFiles,
	                bundleMetadata
	            );
	        }
	}
});