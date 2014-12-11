define(["src/oskari/oskari",
	"src/mapping/model/AbstractMapLayerModel",
	"src/mapping/model/VectorLayerModel",
	"src/mapping/model/WMSLayerModel",
	"src/mapping/model/map",
/*	"./style",
	"./tool",
	"./user"*/
	"sources/framework/domain/style",
	"sources/framework/domain/tool",
	"sources/framework/domain/user"
], function(Oskari) {
	Oskari.bundleCls('domain');
});