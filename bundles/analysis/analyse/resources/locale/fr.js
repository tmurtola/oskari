Oskari.registerLocalization(
{
    "lang": "fr",
    "key": "Analyse",
    "value": {
        "title": "Analysis <font color=red>(BETA)</font>",
        "flyouttitle": "Analysis <font color=red>(BETA)</font>",
        "desc": "",
        "btnTooltip": "Analysis",
        "NotLoggedView": {
            "text": "Only logged user can create analysis.",
            "signup": "Log in",
            "signupUrl": "/web/en/login",
            "register": "Register",
            "registerUrl": "/web/en/login?p_p_id=58&p_p_lifecycle=1&p_p_state=maximized&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&saveLastPath=0&_58_struts_action=%2Flogin%2Fcreate_account"
        },
        "AnalyseView": {
            "title": "Analysis",
            "content": {
                "label": "Map layers",
                "drawToolsLabel": "Feature Tools",
                "tooltip": "Select one map layer for analysis. You can search more map layers by clicking \"Add map layer\" and selecting a map layer from the list. You can focus your map view to the place you  want by dragging the map with a mouse or by clicking \"Search places\" and searching the place you want.",
                "drawToolsTooltip": "By feature tools you can add new temporary features for analysis or cut an existing feature by cropping a part of it. You can add and cut point, line and area features.",
                "features": {
                    "title": "Add",
                    "buttons": {
                        "cancel": "Cancel",
                        "finish": "Done"
                    },
                    "tooltips": {
                        "point": "Add a temporary point feature.",
                        "line": "Add a temporary line feature.",
                        "area": "Add a temporary area feature."
                    },
                    "modes": {
                        "area": "Temporary area",
                        "line": "Temporary line",
                        "point": "Temporary point"
                    }
                },
                "drawDialog": {
                    "point": {
                        "title": "Adding a point",
                        "add": "Add one or more points by clicking the map and click \"Done\" button after that. By clicking \"Cancel\" button you can delete the points you have drawn without saving them. After clicking \"Done\" button new features will be shown at the data list with the name \"Temporary point X\" where X is the order number of the point."
                    },
                    "line": {
                        "title": "Adding a line",
                        "add": "Add a line by clicking its breaking points (incl. starting and ending points). Finish the drawing by double clicking. You can draw one or more lines. When the lines are ready, click \"Done\" button. By clicking \"Cancel\" button you can delete the lines you have drawn without saving them. After clicking \"Done\" button new features will be shown at the data list with the name \"Temporary line X\" where X is the order number of the line."
                    },
                    "area": {
                        "title": "Adding an area",
                        "add": "Add an area by clicking its breaking points (incl. starting point). Finish the drawing by double clicking. You can draw one or more areas. When the areas are ready, click \"Done\" button. By clicking \"Cancel\" button you can delete the areas you have drawn without saving them. After clicking \"Done\" button new features will be shown at the data list with the name \"Temporary area X\" where X is the order number of the area."
                    }
                },
                "drawFilter": {
                    "title": "Clipping",
                    "buttons": {
                        "cancel": "Cancel",
                        "finish": "Done"
                    },
                    "tooltip": {
                        "point": "Define the clipping points and clip the line based on the clipping points.",
                        "line": "Define the clipping line and clip the area based on the clipping line.",
                        "edit": "Define the clipping area and clip the area based on the clipping area.",
                        "remove": "Remove the clipping."
                    },
                    "dialog": {
                        "modes": {
                            "point": {
                                "title": "Clipping the line based on points",
                                "message": "There are two marker points on the selected line at the starting and ending points. If the starting and ending point are at the same point, the markers are on top of one another. The marker points out the cutting points for the line. By moving the markers you can select only one part of the line. The selected part will be shown as red. When you have made a cutting ready click the \"Done\" button. Now you can use a cut line for analysis."
                            },
                            "line": {
                                "title": "Clipping the area with a line",
                                "message": "Draw a line through the area to be clipped by clicking its breaking points (incl. starting and ending points). Finish the drawing by double clicking. You can move breakpoints by dragging them with mouse. The cut area is shown as blue. You can change the cut area by clicking another area. When the cutting is ready, click the \"Done\" button. Now you can use a cut area for analysis."
                            },
                            "edit": {
                                "title": "Clipping the area with another area",
                                "message": "Draw an area on the area to be clipped by clicking its breaking points (incl. starting point). Finish the drawing by double clicking. You can move breakpoints by dragging them with mouse. The cut area is shown as blue. You can change the cut area by clicking another area. When the cutting is ready, click the \"Done\" button. Now you can use a cut area for analysis."
                            }
                        }
                    }
                },
                "selectionTools": {
                    "title": "Selection",
                    "description": "Selection applies only to the selected maplayer",
                    "button": {
                        "empty": "Remove selection"
                    }
                },
                "search": {
                    "title": "Search the places",
                    "resultLink": "Import to the analysis"
                }
            },
            "method": {
                "label": "Method",
                "tooltip": "Select first data and after that the method",
                "options": [
                    {
                        "id": "oskari_analyse_buffer",
                        "label": "Buffer",
                        "classForMethod": "buffer",
                        "selected": true,
                        "tooltip": "By the method \"Buffer\" you can add the buffers around the selected objects. You can define the buffer size by yourself. After making buffers you can use them as a base for other analysis."
                    },
                    {
                        "id": "oskari_analyse_aggregate",
                        "label": "Key ratios computation",
                        "classForPreview": "aggregate",
                        "tooltip": "By the method \"Key ratios computation\" you can count different key ratios (e.g. average and sum) based on the selected features. \nAuthorised features are not counted."
                    },
                    {
                        "id": "oskari_analyse_union",
                        "label": "Union",
                        "classForPreview": "union",
                        "tooltip": "By the method \"Union\" you can join the selected features to one new feature."
                    },
                    {
                        "id": "oskari_analyse_intersect",
                        "label": "Clipping",
                        "classForPreview": "clip",
                        "tooltip": "By the method \"Clipping\" you can clip the selected features by the features of another analyse layer. The result includes only those of selected features whose area is inside of the features of the clipping map layer."
                    },
                    {
                        "id": "oskari_analyse_layer_union",
                        "label": "Union of the intersecting features",
                        "classForPreview": "intersect",
                        "tooltip": ""
                    },
                    {
                        "id": "oskari_analyse_areas_and_sectors",
                        "label": "Multiple buffers",
                        "classForPreview": "areas_and_sectors",
                        "tooltip": "By the method \"Multiple buffers\" you can add multiple buffers around the selected features. You can define the buffer size and the number of buffers."
                    },
                    {
                        "id": "oskari_analyse_difference",
                        "label": "Difference computation",
                        "classForPreview": "difference",
                        "tooltip": ""
                    },
                    {
                        "id": "oskari_analyse_spatial_join",
                        "label": "Spatial join",
                        "classForPreview": "spatial_join",
                        "tooltip": ""
                    }
                ]
            },
            "aggregate": {
                "label": "Key ratio",
                "labelTooltip": "Tunnusluvut, jotka lasketaan kohteiden ominaisuustietojen perusteella.",
                "options": [
                    {
                        "id": "oskari_analyse_Count",
                        "label": "Count",
                        "selected": true
                    },
                    {
                        "id": "oskari_analyse_Sum",
                        "label": "Sum"
                    },
                    {
                        "id": "oskari_analyse_Min",
                        "label": "Minimum"
                    },
                    {
                        "id": "oskari_analyse_Max",
                        "label": "Maximum"
                    },
                    {
                        "id": "oskari_analyse_Average",
                        "label": "Average"
                    },
                    {
                        "id": "oskari_analyse_StdDev",
                        "label": "Standard deviation"
                    },
                    {
                        "id": "oskari_analyse_Median",
                        "label": "Median"
                    },
                    {
                        "id": "oskari_analyse_NoDataCnt",
                        "label": "The number of authorised features"
                    }
                ],
                "attribute": "Select the attribute",
                "footer": "Authorised features are not counted"
            },
            "buffer_size": {
                "label": "Buffer size",
                "labelTooltip": "Vyöhykkeen koko metreinä tai kilometreinä.",
                "tooltip": "Give the buffer size."
            },
            "buffer_units": {
                "m": "meters",
                "km": "kilometers"
            },
            "analyse_name": {
                "label": "Analysis name",
                "labelTooltip": "Analyysiä kuvaava nimi",
                "tooltip": "Give the analysis a name."
            },
            "settings": {
                "label": "Parameters",
                "tooltip": "Give parameters for the analysis. The parameters depend on the selected filter and method."
            },
            "intersect": {
                "target": "The layer to be intersected",
                "targetLabelTooltip": "Analyysitaso, jonka kohteita leikataan leikkaavan tason kohteilla.",
                "label": "Intersecting layers",
                "labelTooltip": "Analyysitaso, jonka kohteilla leikattavan tason kohteita leikataan."
            },
            "union": {
                "label": "The layer to be combined"
            },
            "layer_union": {
                "label": "The layers to be combined",
                "labelTooltip": "Analyysitasot, joiden kohteet viedään samalle tasolle.",
                "notAnalyseLayer": "Select one analysis layer.",
                "noLayersAvailable": "The layers with similar attributes could not be found. You can search the layers by clicking \"Add map layer\"."
            },
            "areas_and_sectors": {
                "label": "Vyöhykkeet ja sektorit",
                "labelTooltip": "Vyöhykkeiden koko metreinä tai kilometreinä sekä vyöhykkeiden ja sektorien lukumäärä.",
                "area_count": "The number of the buffers",
                "area_size": "The buffer size",
                "sector_count": "The number of the sectors",
                "area_count_tooltip": "Give the number of the buffers.",
                "area_size_tooltip": "Give the buffer size.",
                "sector_count_tooltip": "Give the number of the sectors."
            },
            "difference": {
                "firstLayer": "First layer",
                "secondLayer": "Second layer",
                "field": "",
                "keyField": ""
            },
            "spatial": {
                "label": "Spatial operator",
                "options": [
                    {
                        "id": "oskari_analyse_intersect",
                        "label": "Intersect",
                        "selected": true
                    },
                    {
                        "id": "oskari_analyse_contains",
                        "label": "Contains"
                    }
                ]
            },
            "spatial_join": {
                "firstLayerTooltip": "Ensimmäinen yhdistettävä taso, jolta ominaisuustiedot haetaan.",
                "firstLayerFieldTooltip": "Ensimmäisen tason ominaisuustiedot, jotka otetaan analyysiin mukaan. Valitse enintään 10 ominaisuustietoa.",
                "secondLayerTooltip": "Toinen yhdistettävä taso, jolta ominaisuustiedot haetaan.",
                "secondLayerFieldTooltip": "Toisen tason ominaisuustiedot, jotka otetaan lopputulokseen mukaan. Valitse enintään 10 ominaisuustietoa."
            },
            "params": {
                "label": "The attributes to be included in the result",
                "aggreLabel": "The attributes for key ratios",
                "aggreLabelTooltip": "Ominaisuustiedot, jotka otetaan analyysiin mukaan. Valitse enintään 10 ominaisuustietoa.",
                "labelTooltip": "Ominaisuustiedot, jotka otetaan analyysiin mukaan. Valitse enintään 10 ominaisuustietoa.",
                "tooltip": "",
                "options": [
                    {
                        "id": "oskari_analyse_all",
                        "selected": true,
                        "label": "All"
                    },
                    {
                        "id": "oskari_analyse_none",
                        "label": "None"
                    },
                    {
                        "id": "oskari_analyse_select",
                        "label": "Select from the list"
                    }
                ]
            },
            "output": {
                "label": "Layout",
                "color_label": "The feature style",
                "colorset_tooltip": "Select styles for the features with diferent geometry.",
                "tooltip": "Select the suitable style for features at the analysis to be done.",
                "random_color_label": "Random colours"
            },
            "buttons": {
                "save": "Save and finish",
                "analyse": "Create analysis",
                "data": "Add the map layers"
            },
            "help": "Help",
            "success": {
                "layerAdded": {
                    "title": "Analysis succeeded.",
                    "message": "The new analysis layer {layer} has been added."
                }
            },
            "error": {
                "title": "Error",
                "invalidSetup": "The parameters contain errors.",
                "noParameters": "The analysis layer or parameters are not defined.",
                "noLayer": "The analysis layer is not selected.",
                "noAnalyseUnionLayer": "You need at least two analysis levels for this method. Select at least another analysis level.",
                "invalidMethod": "The unknown method:",
                "bufferSize": "The buffer size is invalid.",
                "illegalCharacters": "Give the buffer size as numbers.",
                "nohelp": "No guide was not found.",
                "saveFailed": "Saving the analysis failed. Please try again later.",
                "loadLayersFailed": "Loading the analysis failed. Please try again later.",
                "loadLayerTypesFailed": "Searching the field types of the analysis layer failed. Please try again later.",
                "Analyse_parameter_missing": "The parameters for the analysis are missing. Please give the parameters.",
                "Unable_to_parse_analysis": "The parameters for the analysis are invalid. Please give the parameters again.",
                "Unable_to_get_WPS_features": "The features could not be retrieved. Please try again later.",
                "WPS_execute_returns_Exception": "The analysis could not be processed. Please try again later.",
                "WPS_execute_returns_no_features": "The analysis result has no features.",
                "Unable_to_process_aggregate_union": "The key ratios for the union could not be computed. Please try again later.",
                "Unable_to_get_features_for_union": "The features fot the key ratios computation could not be retrieved. Please try again later.",
                "Unable_to_store_analysis_data": "Saving the analysis failed. Please try again later.",
                "Unable_to_get_analysisLayer_data": "Getting the data for analysis failed. Please try again later.",
                "timeout": "Analysis request timed out. Please try again later.",
                "error": "Analysis failed because of a unknown reason. Please try again later.",
                "parsererror": "The server returned invalid data for analysis. Please try again later."
            },
            "infos": {
                "title": "Info",
                "layer": "The layer",
                "over10": "has over 10 attributes. Select at most 10 attributes for the analysis. The list of attributes is at Parameters menu after you have chosen the analyse method."
            }
        },
        "StartView": {
            "text": "You can make statistical analysis for geographical data products including feature data. After saving analyse results you can use them later.",
            "infoseen": {
                "label": "Do not show this message again."
            },
            "buttons": {
                "continue": "Start analysis",
                "cancel": "Cancel"
            }
        },
        "categoryform": {
            "name": {
                "label": "Name",
                "placeholder": "Give the map layer a name"
            },
            "drawing": {
                "label": "NOT TRANSLATED",
                "point": {
                    "label": "Point",
                    "color": "Colour",
                    "size": "Size"
                },
                "line": {
                    "label": "Line",
                    "color": "Colour",
                    "size": "Thickness"
                },
                "area": {
                    "label": "Area",
                    "fillcolor": "Fill-in colour",
                    "linecolor": "Line colour",
                    "size": "Line thickness"
                }
            },
            "edit": {
                "title": "Edit map layer",
                "save": "Save",
                "cancel": "Back"
            }
        },
        "personalDataTab": {
            "grid": {
                "name": "Name",
                "delete": "Delete"
            },
            "title": "Analysis",
            "confirmDeleteMsg": "Do you want to delete the analysis layer:",
            "buttons": {
                "ok": "OK",
                "cancel": "Cancel",
                "delete": "Delete"
            },
            "notification": {
                "deletedTitle": "Delete analysis layer",
                "deletedMsg": "Analysis layer has been deleted."
            },
            "error": {
                "title": "Error!",
                "generic": "System error occurred. Please try again later."
            }
        }
    }
}
);