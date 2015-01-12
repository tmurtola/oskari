define([
	"src/oskari/1.5/oskari-extensions",
	"sources/framework/sandbox/sandbox",
	"sources/framework/sandbox/sandbox-key-listener-methods",
	"sources/framework/sandbox/sandbox-map-layer-methods",
	"sources/framework/sandbox/sandbox-map-methods",
	"sources/framework/sandbox/sandbox-abstraction-methods",
	"sources/framework/sandbox/sandbox-state-methods"
], function(Oskari) {
	Oskari.bundleCls('sandbox-base');
	Oskari.bundleCls('sandbox-map');
});