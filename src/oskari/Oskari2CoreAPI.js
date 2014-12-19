
define(function() {

	return function(ClassManager, BundleManager) {
		/* o2 clazz module  */
	    var baseClassFor = {
	    	'bundle' : "Oskari.mapframework.bundle.extension.ExtensionBundle"
	    };
	    var sequences = {};
	    function getSequence(type) {
	        if (!sequences[type]) {
	            sequences[type] = 1;
	        } else {
	            sequences[type] += 1;
	        }
	        return sequences[type];
	    };

		var me = {
	        /* entry point to new class API see Oskari.ClazzWrapper above */
	        cls : function(clazzName, ctor, protoProps, metas) {

	            var clazzInfo = undefined;

	            if (clazzName == undefined) {
	                clazzName = ['Oskari', '_', getSequence('Class')].join('.');
	            } else {
	                clazzInfo = ClassManager.lookup(clazzName);
	            }

	            if (clazzInfo && clazzInfo._constructor && !ctor) {
	                // lookup
	            } else {
	                clazzInfo = ClassManager.define(clazzName, ctor ||
	                function() {
	                }, protoProps, metas || {});
	            }

	            return ClassManager.create('Oskari.ClazzWrapper', clazzInfo, clazzName);
	        },
	        bundleCls : function(bundleId, className) {

		        if (!bundleId) {
		            bundleId = (['__', getSequence('Bundle')].join('_'));
		        }

	            var rv = me.cls(className, function () {}, {
	                update: function () {}
	            }, {
	                protocol: ['Oskari.bundle.Bundle', baseClassFor.bundle],
	                manifest: {
	                    'Bundle-Identifier': bundleId
	                }
	            });
	            BundleManager.installBundleClassInfo(bundleId, rv.classInfo);

	            rv.___bundleIdentifier = bundleId;

	            rv.loc = function (properties) {
	                properties.key = this.___bundleIdentifier;
	                // TODO: LocaleManager
	                Oskari1BuilderAPI.registerLocalization(properties);
	                return rv;
	            };

	            // FIXME instanceId isn't used for anything?
	            rv.start = function (instanceId) {
	                var bid = this.___bundleIdentifier,
	                    bundle,
	                    bundleInstance,
	                    configProps,
	                    ip;

	                if (!fcd.bundles[bid]) {
	                    bundle = BundleManager.createBundle(bid, bid);
	                    fcd.bundles[bid] = bundle;
	                }

	                bundleInstance = BundleManager.createInstance(bid);
	                fcd.bundleInstances[bid] = bundleInstance;

	                configProps = fcd.getBundleInstanceConfigurationByName(bid);
	                if (configProps) {
	                    for (ip in configProps) {
	                        if (configProps.hasOwnProperty(ip)) {
	                            bundleInstance[ip] = configProps[ip];
	                        }
	                    }
	                }
	                bundleInstance.start();
	                return bundleInstance;
	            };
	            rv.stop = function () {
	                var bundleInstance = fcd.bundleInstances[this.___bundleIdentifier];

	                return bundleInstance.stop();
	            };
	            return rv;
	        }
	    };
	    return me;
    }
});