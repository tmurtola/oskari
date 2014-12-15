define(["src/oskari/oskari",
	"src/mapmodule/base/model/AbstractMapLayerModel",
	"src/mapmodule/base/model/VectorLayerModel",
	"src/mapmodule/base/model/WMSLayerModel",
	"src/mapmodule/base/model/map",
/*	"./style",
	"./tool",
	"./user"*/
	"sources/framework/domain/style",
	"sources/framework/domain/tool",
	"sources/framework/domain/user"
], function(Oskari) {
	Oskari.bundleCls('domain');
});