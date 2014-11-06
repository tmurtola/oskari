/*
 * During transition use files from sources
 * TODO: move files from sources here and use packages to include correct files in phase 2 of the transition
 */

define(["src/oskari/oskari",
	"sources/framework/core/core",
	"sources/framework/core/core-enhancement-methods",
	"sources/framework/core/core-key-listener-methods",
	"sources/framework/core/core-map-layer-methods",
	"sources/framework/core/core-map-methods"

], function(Oskari) {
	Oskari.bundleCls('core-base');
	Oskari.bundleCls('core-map');
});