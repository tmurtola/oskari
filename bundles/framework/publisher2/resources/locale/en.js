Oskari.registerLocalization(
{
    "lang": "en",
    "key": "Publisher2",
    "value": {
        "tile": {
            "title": "Map publishing"
        },
        "flyout": {
            "title": "Create Embedded Map"
        },
        "published": {
            "title": "Embedded Map Saved",
            "desc": "The embedded map has been saved. Publish it on your website by copying this code to the html code on your website:"
        },
        "edit": {
            "popup": {
                "title": "Opening embedded map…",
                "msg": "Updating embedded map…"
            }
        },
        "BasicView": {
            "title": "Create Embedded Map",
            "titleEdit": "Update Embedded Map",
            "domain": {
                "title": "Basic settings",
                "label": "Website address (without http and www prefixes)",
                "placeholder": "Website address",
                "tooltip": "Type a website URL-address without prefixes or a subpage address. For example: homepage.com."
            },
            "name": {
                "label": "Map name (required)",
                "placeholder": "Map name",
                "tooltip": "Type a map name. Please note the language used on the map."
            },
            "language": {
                "label": "Language",
                "options": {
                    "fi": "Finnish",
                    "sv": "Swedish",
                    "en": "English"
                },
                "tooltip": "Select a language to be used on the final map. It affects the user interface and text on the map. Note! The language selection is not visible on the preview.",
                "languageChangedDisclaimer":"Note! The language selection is not visible on the preview."
            },
            "size": {
                "label": "Map Size",
                "tooltip": "Select preview mode."
            },
            "maptools": {
                "label": "Tools",
                "tooltip": "Select available map tools. Check a placement in the map preview.",
                "ScaleBarPlugin": "Scale bar",
                "IndexMapPlugin": "Index map",
                "PanButtons": "Pan tool",
                "Portti2Zoombar": "Zoom bar",
                "MyLocationPlugin": "Center to location",
                "ControlsPlugin": "Pan by mouse",
                "SearchPlugin": "Place search",
                "FeaturedataPlugin": "Feature data",
                "GetInfoPlugin": "Feature query tool",
                "PublisherToolbarPlugin": "Map tools",
                "selectDrawLayer": "Select map layer",
                "LayerSelectionPlugin": "Map layers menu",
                "CoordinateToolPlugin": "Coordinate tool",
                "CrosshairTool":"Show map focal point",
                "toolbarToolNames": {
                    "history_back": "Move to previous view",
                    "history_forward": "Move to next view",
                    "measureline": "Measure distance",
                    "measurearea": "Measure area",
                    "drawTools": "Drawing tools",
                    "point": "Adding own places",
                    "line": "Allow point features",
                    "area": "Allow line features"
                },
                "layers": {
                    "add": "Allow area features",
                    "label": "Map Layers",
                    "addselect": "Add a drawing layer to map layers.",
                    "defaultLayer": "(Default map layer)",
                    "useAsDefaultLayer": "Use as default"
                },
                "myplaces": {
                    "label": "My map layers"
                },
                "layerselection": {
                    "info": "Select the background map layer. You can select the default background map layer in the map preview.",
                    "selectAsBaselayer": "Select as baselayer"
                }
            },
            "toollayout": {
                "label": "Tool Placement",
                "tooltip": "Select a placement for map tools.",
                "lefthanded": "Lefthanded",
                "righthanded": "Righthanded",
                "userlayout": "Custom placement",
                "usereditmode": "Start editing",
                "usereditmodeoff": "Finish editing"
            },
            "data": {
                "label": "Thematic maps",
                "tooltip": "Show thematic maps on the map.",
                "grid": "Show thematic data in table",
                "allowClassification": "Allow classification"
            },
            "layout": {
                "label": "Graphic Layout",
                "fields": {
                    "colours": {
                        "label": "Color scheme",
                        "placeholder": "Color scheme",
                        "buttonLabel": "Select",
                        "light_grey": "Light gray",
                        "dark_grey": "Dark gray",
                        "blue": "Blue",
                        "red": "Red",
                        "green": "Green",
                        "yellow": "Yellow",
                        "custom": "My colour scheme",
                        "customLabels": {
                            "bgLabel": "Identifier background",
                            "titleLabel": "Identifier text",
                            "headerLabel": "Placename",
                            "iconLabel": "Icon",
                            "iconCloseLabel": "Dark",
                            "iconCloseWhiteLabel": "Light"
                        }
                    },
                    "fonts": {
                        "label": "Font style"
                    },
                    "toolStyles": {
                        "label": "Tool style",
                        "default": "Default style",
                        "rounded-dark": "Rounded (dark)",
                        "rounded-light": "Rounded (light)",
                        "sharp-dark": "Angular (dark)",
                        "sharp-light": "Angular (light)",
                        "3d-dark": "Three-dimensional (dark)",
                        "3d-light": "Three-dimensional (light)"
                    }
                },
                "popup": {
                    "title": "Select Color Scheme",
                    "close": "Close",
                    "gfiDialog": {
                        "title": "Feature Info",
                        "featureName": "Preview",
                        "featureDesc": "The selected color scheme affects a graphic layout of feature and map layer popup info wimdows."
                    }
                }
            },
            "sizes": {
                "small": "Small",
                "medium": "Medium",
                "large": "Large",
                "fill": "Space filling",
                "custom": "Custom size",
                "width": "width",
                "height": "height",
                "separator": "x"
            },
            "buttons": {
                "save": "Save",
                "saveNew": "Save new map",
                "ok": "OK",
                "replace": "Update map",
                "cancel": "Cancel",
                "add": "Add map layer"
            },
            "confirm": {
                "replace": {
                    "title": "Do you want to update this map?",
                    "msg": "Updates are shown immediately on the map. You do not need to update the html code on your website."
                }
            },
            "layerselection": {
                "label": "Map Layers",
                "info": "Select the map layers to show on the published map",
                "tooltip": "The background layer is shown at the bottom layer on the map. If you select several background maps, only one of them can be visible at a time. User can select a background layer in the user interface. Please select a default background map in the map preview.",
                "promote": "Do you want to show also orthophotos on the map?"
            },
            "preview": "Map preview",
            "location": "Location and zoom level",
            "zoomlevel": "Zoom level",
            "help": "Help",
            "error": {
                "title": "Error",
                "size": "The map size is invalid. Width must be at least 30 pixels and height at least 20 pixels. Use a point as a decimal separator.",
                "domain": "The website is required. Please type an address and try again.",
                "domainStart": "The website is invalid. Please type an address without http or www prefixes and try again.",
                "name": "The map name is required. Plese type a name and try again.",
                "nohelp": "The user guide is not available.",
                "saveFailed": "The embedded map could not be saved.",
                "nameIllegalCharacters": "The map name contains illegal characters. Allowed characters are letters (a-z, A-Z, å, ä, ö, Å, Ä, Ö), numbers (0-9), spaces and hyphens (-). Please correct the name and try again.",
                "domainIllegalCharacters": "The website address contains illegal characters. Type a website URL-address without prefixes or a subpage address. For example: homepage.com. Allowed characters are letters (a-z, A-Z, å, ä, ö, Å, Ä, Ö), numbers (0-9) and special characters (-, _, ., !, ~, *, ' and ()). Please correct the address and try again."
            }
        },
        "NotLoggedView": {
            "text": "Welcome to publish embedded map on your website. Please log in or register first.",
            "signup": "Log in",
            "signupUrl": "/web/fi/login",
            "register": "Register",
            "registerUrl": "/web/fi/login?p_p_id=58&p_p_lifecycle=1&p_p_state=maximized&p_p_mode=view&p_p_col_id=column-1&p_p_col_count=1&saveLastPath=0&_58_struts_action=%2Flogin%2Fcreate_account"
        },
        "StartView": {
            "text": "Welcome to publish embedded map on your website.",
            "touLink": "Show Terms of Use",
            "layerlist_title": "Publishable map layers open in map window:",
            "layerlist_empty": "No publishable map layers are open in the map window. Please check publishable map layers in the Selected Layers menu.",
            "layerlist_denied": "Unpublishable map layers open in map window:",
            "denied_tooltip": "These map layers are not publishable in embedded maps. Data producers have not granted permissions for publishing. Please check publishable map layers in the Selected Layers menu.",
            "myPlacesDisclaimer": "NOTE! If you are using this map layer in an embedded map, the map layer will be published.",
            "buttons": {
                "continue": "Continue",
                "continueAndAccept": "Accept and continue",
                "cancel": "Cancel",
                "close": "Close"
            },
            "tou": {
                "notfound": "Terms of Use could not be found.",
                "reject": "Reject",
                "accept": "Accept"
            }
        },
        "layer": {
            "show": "Show",
            "hide": "Hide",
            "hidden": "The map layer is temporarily hidden.",
            "rights": {
                "can_be_published_map_user": {
                    "label": "Publishable",
                    "tooltip": "The map layer is publishable in embedded maps. The weekly user amount can be limited."
                }
            }
        },
        "layerFilter": {
            "buttons": {
                "publishable": "Publishable"
            },
            "tooltips": {
                "publishable": "Show only publishable map layers."
            }
        }
    }
}
);