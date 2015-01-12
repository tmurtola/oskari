define(["src/oskari/1.5/oskari-extensions"], function(Oskari) {

    var defaultIdentifier = 0;
    var ConfigurableModule = Oskari.cls('Oskari.Module', function() {
//        console.log("CREATED CONFIGURABLE MODULE as BASE for MODULES");
    }, {
        extend: function(props) {
            // Bundles are structured to modules, however the refactoring is done gradually.
            // TODO: Change Oskari.bundleCls to Oskari.moduleClass
            var moduleClass = Oskari.bundleCls(props.identifier);

            moduleClass.category(props);
            moduleClass.category({
                create: function() {
                    Oskari.log.debug("CREATING MODULE INSTANCE ", this.extension, this.identifier, this.locale, this.configuration);
                    var instance =
                        this.extension.create(this.identifier || '_' + (++defaultIdentifier), this.locale);

                    var configProps = this.configuration || {};

                    for (ip in configProps) {
                        if (configProps.hasOwnProperty(ip)) {
                            instance.conf[ip] = configProps[ip];
                        }
                    }

                    Oskari.log.debug("- INSTANCE", instance, "post conf");
                    return instance;
                }

            });

            Oskari.log.debug("DECLARED MODULE CLASS", moduleClass);
            return moduleClass;
        }

    });
	return ConfigurableModule;
});