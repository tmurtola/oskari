
define([
    "src/oskari/1.5/oskari-extensions",
    "src/oskari/2.0/ConfigurableModule",
    "src/oskari/2.0/ExtendableEvent",
    "src/oskari/2.0/ExtendableRequest",
    "src/oskari/2.0/OskariObject"
], function(Oskari, ConfigurableModule, ExtendableEvent, ExtendableRequest, OskariObject) {
    Oskari.VERSION = '2.0.0';
    Oskari.Module = ConfigurableModule.create();
    Oskari.Event = ExtendableEvent.create();
	Oskari.Request = ExtendableRequest.create();
    Oskari.Object = OskariObject;
    return Oskari;
});