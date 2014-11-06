define([
    "oskari",
    "jquery",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/event/FinishedDrawingEvent",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/event/AddedFeatureEvent",
    "bundles/framework/bundle/myplaces2/event/MyPlaceHoverEvent",
    "bundles/framework/bundle/myplaces2/event/MyPlacesChangedEvent",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/event/SelectedDrawingEvent",
    "bundles/framework/bundle/myplaces2/model/MyPlace",
    "bundles/framework/bundle/myplaces2/model/MyPlacesCategory",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/DrawPlugin",
    "bundles/framework/bundle/myplaces2/plugin/HoverPlugin",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/request/StopDrawingRequest",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/request/StartDrawingRequest",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/request/GetGeometryRequest",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/request/GetGeometryRequestHandler",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/request/StartDrawingRequestHandler",
    "bundles/framework/bundle/mapmodule-plugin/plugin/drawplugin/request/StopDrawingRequestHandler",
    "bundles/framework/bundle/myplaces2/request/EditPlaceRequest",
    "bundles/framework/bundle/myplaces2/request/EditCategoryRequest",
    "bundles/framework/bundle/myplaces2/request/DeleteCategoryRequest",
    "bundles/framework/bundle/myplaces2/request/PublishCategoryRequest",
    "bundles/framework/bundle/myplaces2/request/EditRequestHandler",
    "bundles/framework/bundle/myplaces2/service/MyPlacesService",
    "bundles/framework/bundle/myplaces2/service/MyPlacesWFSTStore",
    "bundles/framework/bundle/myplaces2/view/MainView",
    "bundles/framework/bundle/myplaces2/view/PlaceForm",
    "bundles/framework/bundle/myplaces2/view/CategoryForm",
    "bundles/framework/bundle/publishedmyplaces2/ButtonHandler",
    "bundles/framework/bundle/publishedmyplaces2/CategoryHandler",
    "bundles/framework/bundle/publishedmyplaces2/instance",
    "css!resources/framework/bundle/publishedmyplaces2/css/publishedmyplaces.css",
    "bundles/framework/bundle/publishedmyplaces2/locale/fi",
    "bundles/framework/bundle/publishedmyplaces2/locale/sv",
    "bundles/framework/bundle/publishedmyplaces2/locale/en",
    "bundles/framework/bundle/publishedmyplaces2/locale/cs",
    "bundles/framework/bundle/publishedmyplaces2/locale/de",
    "bundles/framework/bundle/publishedmyplaces2/locale/es"
], function(Oskari,jQuery) {
    return Oskari.bundleCls("publishedmyplaces2").category({create: function () {
		return Oskari.clazz.create("Oskari.mapframework.bundle.publishedmyplaces.PublishedMyPlacesBundleInstance");
	},update: function (manager, bundle, bi, info) {
		manager.alert("RECEIVED update notification " + info);
	}})
});