# Oskari API changelog

This document describes changes to the public API from Oskari frontend perspective (requests, events, conf/state, services). RPC-developers can check if the request/event API has changed
when the service provider gives notice about Oskari version being upgraded. Oskari bundle/core-developers can check for changes in the bundles they depend on.

Each addition is tagged with [add], [mod], [rem] telling if it's a new feature, modifies the current functionality or if something has been removed.

Some extra tags:
- [rpc] tag indicates that the change affects RPC API
- [breaking] tag indicates that the change is not backwards compatible

## 1.38

#### [mod] [rpc] MapModulePlugin.AddFeaturesToMapRequest

If some feature's style must be updated (for example for highlighting it on click), the first parameter of request should be key-value-object that identifiers the specific feature existing on the map. Request will check if the feature with given property exists on the map and will update its style according to the style given in the options object.

```javascript
var featureProperty = {'id': 'F1'}; // key is feature property name, value is the property matching value to style
var options = {
    featureStyle: {
        fill: {
            color: '#ff0000'
        },
        stroke : {
            color: '#ff0000',
            width: 5
        },
        text : {
            scale : 1.3,
            fill : {
                color : 'rgba(0,0,0,1)'
            },
            stroke : {
                color : 'rgba(255,255,255,1)',
                width : 2
            }
        }
    }
};
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [featureProperty, options]);
 ```

## 1.37

### mapmodule

#### [mod] [rpc] AddMarkerRequest

Improved request to more readably and changed option names.
Custom SVG and external graphic icon properties changed.

External icon changes:
- iconUrl -property not used any more, use instead shape property
- shape -property, tell here external icon url
- offsetX, tell here where marker icon center x point should be. If not setted used 16 (center point)
- offsetY, tell here where marker icon center y point should be. If not setted used 16 (center point)

For example:
```javascript
    var MARKER_ID = "external_marker";
    var data = {
        x: 386020,
        y: 6670057,
        shape: 'http://demo.paikkatietoikkuna.fi/Oskari/resources/framework/bundle/mapmodule-plugin/images/marker.png',
        offsetX: 16, // center point x position from left to right
        offsetY: 0 // center point y position from bottom to up
    };
    channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);
```

Custom SVG icon changes:
- shape -property object not needed. Tell here now the svg data, for example ```<svg>...</svg>```
- offsetX, tell here where marker icon center x point should be. If not setted used 16 (center point)
- offsetY, tell here where marker icon center y point should be. If not setted used 16 (center point)

For example:
```javascript
    var MARKER_ID = "happy_face_marker";
    var data = {
            x: 411650.70779123,
            y: 6751897.3481153,
            msg : '',
            shape: '<svg width="32" height="32"><g fill="#9955ff" transform="matrix(0.06487924,0,0,0.06487924,0,1.73024e-6)"><g><path d="M 246.613,0 C 110.413,0 0,110.412 0,246.613 c 0,136.201 110.413,246.611 246.613,246.611 136.2,0 246.611,-110.412 246.611,-246.611 C 493.224,110.414 382.812,0 246.613,0 Z m 96.625,128.733 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m -196.743,0 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m 100.738,284.184 c -74.374,0 -138.225,-45.025 -165.805,-109.302 l 48.725,0 c 24.021,39.5 67.469,65.885 117.079,65.885 49.61,0 93.058,-26.384 117.079,-65.885 l 48.725,0 C 385.46,367.892 321.608,412.917 247.233,412.917 Z" /></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></g><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /></svg>',
            offsetX: 16, // center point x position from left to right
            offsetY: 16, // center point y position from bottom to up
            size: 3
        };
        channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);
```

Old request also working well but user that uses old way request and these properties are informed to warning log messages. ```Old way requests it's recommended to switch to the new format.```

#### [mod] [rpc] MapModulePlugin.AddFeaturesToMapRequest

If some feature's style must be updated (for example for highlighting it on click), the first parameter of request should be key-value-object that identifiers the specific feature existing on the map. Request will check if the feature with given property exists on the map and will update its style according to the style given in the options object.  

```javascript
var featureProperty = {'id': 'F1'}; // key is feature property name, value is the property matching value to style
var options = {
    featureStyle: {
        fill: {
            color: '#ff0000'
        },
        stroke : {
            color: '#ff0000',
            width: 5
        },
        text : {
            scale : 1.3,
            fill : {
                color : 'rgba(0,0,0,1)'
            },
            stroke : {
                color : 'rgba(255,255,255,1)',
                width : 2
            }
        }
    },
    layerId: 'VECTOR'
};
channel.postRequest('MapModulePlugin.AddFeaturesToMapRequest', [featureProperty, options]);
 ```

## 1.36

### infobox

#### [mod] [rpc] ShowInfoBoxRequest

**Changes not backwards compatible!**

Request is modified to allow giving multiple additional parameters (hidePrevious, colourScheme, font) in one options-object. Request now allows giving mobileBreakpoints as one parameter. MobileBreakpoints means the size of the screen in pixels to start showing infobox in mobile mode.

It is now also possible to define links and buttons to infobox content and give them information that is shown in InfoboxActionEvent when link/button is clicked.

Request is modified also so that infobox can be shown for the marker. This can done by giving marker id instead of lonlat in position-object. If marker id and lon/lat is defined, then infobox is tried to show for marker, if marker is not found then infobox is shown for defined coordinates. If infobox cannot be shown, then it is informed in InfoBox.InfoBoxEvent.

For more detailed information, see [documentation](http://oskari.org/api/requests) and [RPC example](http://oskari.org/examples/rpc-api/rpc_example.html).

NOTE! The changes are not backwards compatible! The basic change that should be done in most use cases is to remove hidePrevious-value (true/false) from parameterlist to the options-object. Other changes may also be required. See the updated request-documentation for getting advice to update your requests.

### mapmodule

#### [mod] [rpc] AddMarkerRequest

Improved request to allow add custom svg markers. Custom marker is defined in shape-object.

```javascript
    var MARKER_ID = "happy_face_marker";
    var data = {
            x: 411650.70779123,
            y: 6751897.3481153,
            msg : '',
            shape: {
                data: '<svg width="32" height="32"><g fill="#9955ff" transform="matrix(0.06487924,0,0,0.06487924,0,1.73024e-6)"><g><path d="M 246.613,0 C 110.413,0 0,110.412 0,246.613 c 0,136.201 110.413,246.611 246.613,246.611 136.2,0 246.611,-110.412 246.611,-246.611 C 493.224,110.414 382.812,0 246.613,0 Z m 96.625,128.733 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m -196.743,0 c 21.128,0 38.256,17.128 38.256,38.256 0,21.128 -17.128,38.256 -38.256,38.256 -21.128,0 -38.256,-17.128 -38.256,-38.256 0,-21.128 17.128,-38.256 38.256,-38.256 z m 100.738,284.184 c -74.374,0 -138.225,-45.025 -165.805,-109.302 l 48.725,0 c 24.021,39.5 67.469,65.885 117.079,65.885 49.61,0 93.058,-26.384 117.079,-65.885 l 48.725,0 C 385.46,367.892 321.608,412.917 247.233,412.917 Z" /></g><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/><g/></g><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /><g transform="translate(0,-461.224)" /></svg>',
                x: 16, // center point x position
                y: 16 // center point y position
            },
            size: 3
        };
        channel.postRequest('MapModulePlugin.AddMarkerRequest', [data, MARKER_ID]);
```

### feedbackService (Open311)

#### [add] [rpc] GetFeedbackRequest

NOTE! Under construction, this is a POC solution for testing Open311 servers.

Get posted feedback data out of Open311 service.

For more detailed information, see documentation http://oskari.org/api/requests.

#### [add] [rpc] PostFeedbackRequest

NOTE! Under construction, this is a POC solution for testing Open311 servers.

Posts user's feedback data to the Open311 service.

For more detailed information, see documentation http://oskari.org/api/requests.

feedback.open331.key=     setup is required in oskari server properties
(api_key  of Open311 service)

#### [add] [rpc] GetFeedbackServiceRequest

NOTE! Under construction, this is a POC solution for testing Open311 servers

Get Open311 feedback service list.

For more detailed information, see documentation http://oskari.org/api/requests.

#### [add] [rpc] GetFeedbackServiceDefinitionRequest

NOTE! Under construction, this is a POC solution for testing Open311 servers

Get the definition of one feedback service.

For more detailed information, see documentation http://oskari.org/api/requests.

### RPC

#### [add] [rpc] New functions

setCursorStyle(cursorStyle) - function added. Functionality to change the mouse cursor on the map to any valid cursor css declaration ('crosshair','progress' etc.) supported by the browser.

An experimental **getScreenshot()** function is now available when the Oskari instance uses Openlayers 3 based mapmodule.
The function returns an empty string if screenshot could not be produced and a dataURL for png-image when successful.

Usage requires additional configuration on the map layers used on the published map!

**GetPixelMeasuresInScale([mm_measure1, mm_measure2,..],scale)** function is now available for requesting pixel values.
Input: array of mm measurements , requested scale (optional) e.g. [[210,297], 100000]
Output: array of pixel measurements , requested scale

Returns pixel mesurements for mm measurements in requested scale.
Use case: Plot paper size area on a map. See plotPlotArea-function in rpc_example.html.
If scale is not entered, function computes fit scale so that paper size area covers the whole map.

New functions to zoom map: zoomIn, zoomOut, zoomTo. All return the current zoomlevel after zooming.

## 1.35

### RPC

#### [mod] [rpc] New default event

InfoboxActionEvent is now allowed by default.

InfoBox.InfoBoxEvent is now allowed by default.

#### [add] [rpc] New event

InfoboxActionEvent is used to notify which link/button is clicked in the infobox.

#### [mod] [rpc] getAllLayers function modified

GetAllLayers now returns also minimum zoom level and maximum zoom level for the layer if layer has them defined.

```javascript
    {
        id: layerId,
        opacity: layerOpacity,
        visible: layerVisibility,
        name : layerName,
        minZoom: minZoomLevel,
        maxZoom: maxZoomLevel
    };
```

#### [mod] [rpc] New rpc-client version

The JSChannel dependency has been updated. The old version is not compatible with the new one so rpc-client needs to be updated to 2.0.1.

This fix error when sending more than one paramaeter with null values.

#### [add] [rpc] New functions

getFeatures(layerId) that gets features as geojson object grouped by layer if layerId===true. If layerId not given, will return array of layerIds.

getInfo(clientVersion) returns generic information about the Oskari instance:

```javascript
    {
        "version" : "1.35.0",
        "clientSupported" : true,
        "srs" : "EPSG:4326"
    }
```

#### [mod] [rpc] New default request

MapModulePlugin.ZoomToFeaturesRequest is now allowed by default.

InfoBox.HideInfoBoxRequest is now allowed by default.

### mapmodule - vectorlayerplugin

#### [add] [rpc] New request

MapModulePlugin.ZoomToFeaturesRequest that zooms the map so specific features are visible in the viewport (only for ol3-based maps).

#### [add] [rpc] Vector style improvement

Added functionality to provide a label text to vector features with the style object. Either a static text or dynamic labeling by a property of the feature supported.
Two ways of providing a label:

```javascript
    {
        "layers": [
            {
                "id": "EXAMPLE1",
                "style": {
                    "fill": {
                        "color": "#ff00ff"
                    },
                    "stroke": {
                        "color": "#ff00ff",
                        "width": 3
                    },
                    "text": {
                        "fill": {
                            "color": "#0000ff"
                        },
                        "stroke": {
                            "color": "#ff00ff",
                            "width": 4
                        },
                        "labelText": "Static text", //OR
                        "labelProperty":"feature_property"
                    }
                }
            }
        ]
    }
```

### search

#### [mod] [rpc] SearchRequest

The parameter given to the request should be a string that will be used to execute the search (previously an object with "searchKey" property).

#### [mod] [rpc] SearchResultEvent

The value of "requestParameters" is now the string that was given to SearchRequest.

### drawtools

#### [mod] [rpc] DrawTools.StartDrawingRequest

'showMeasure' parameter in optional object parameter has been renamed to 'showMeasureOnMap' (if true - measure result will be displayed on map near feature. Default is false.)

Changes to polygon drawing where the polygon intersects with itself. This is by default considered an invalid geometry and as such the geometry is not sent with the event.

#### [mod] [rpc] DrawingEvent

Values of geojson and data.bufferedGeoJson are now proper JSON structures instead of strings with escaped JSON.

## 1.34

Initial api version

---------------------
The file structure is

## Oskari version

### Affected bundle/API definition

#### [tags] API functionality that changes

Description about the API change