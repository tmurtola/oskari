define(function() {

    var _gfiParamHandler = function(sandbox) {
        if (location.search.indexOf('showGetFeatureInfo=true') == -1) {
            return;
        }
        var lon = sandbox.getMap().getX(),
            lat = sandbox.getMap().getY();
        sandbox.postRequestByName('MapModulePlugin.GetFeatureInfoRequest', [lon, lat]);
    }
    return {
        // default to finnish
    	lang : window.language || 'fi',
    	handleGFI : _gfiParamHandler
    };
});