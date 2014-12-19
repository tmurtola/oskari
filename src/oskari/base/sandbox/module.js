define([
	"oskari",
// TODO: update or remove duplicate sandbox files, for now let's use the Oskari 1 versions
/*	"./sandbox",
	"./sandbox-key-listener-methods",
	"./sandbox-map-layer-methods",
	"./sandbox-map-methods",
	"./sandbox-abstraction-methods",*/
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