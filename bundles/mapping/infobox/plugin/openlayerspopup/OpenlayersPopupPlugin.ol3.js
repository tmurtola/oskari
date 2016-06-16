/**
 * @class Oskari.mapframework.bundle.infobox.plugin.mapmodule.OpenlayersPopupPlugin
 *
 * Extends jquery by defining outerHtml() method for it. (TODO: check if we really want to do it here).
 * Provides a customized popup functionality for Openlayers map.
 */
Oskari.clazz.define(
    'Oskari.mapframework.bundle.infobox.plugin.mapmodule.OpenlayersPopupPlugin',

    /**
     * @method create called automatically on construction
     * @static
     */
    function () {
        var me = this;

        me._clazz =
            'Oskari.mapframework.bundle.infobox.plugin.mapmodule.OpenlayersPopupPlugin';
        me._name = 'OpenLayersPopupPlugin';

        me._popups = {};
        me.markers = {};
        me.markerPopups = {};

        me._mobileBreakpoints = {
            width: 500,
            height: 480
        };

        me._positionClasses = {
            'left': 'center-right',
            'right': 'center-left',
            'top':'bottom-center',
            'bottom':'top-center'
        };
    }, {

        /**
         * @private @method _initImpl
         * implements Module protocol init method - declares popup templates
         */
        _initImpl: function () {
            var me = this;

            // templates
            me._arrow = jQuery('<div class="popupHeaderArrow"></div>');
            me._header = jQuery('<div></div>');
            me._headerWrapper = jQuery('<div class="popupHeader"></div>');
            // FIXME move styles to css
            me._headerCloseButton = jQuery(
                '<div class="olPopupCloseBox icon-close-white" style="position: absolute; top: 12px;"></div>'
            );
            me._headerAdditionalButton = jQuery(
                '<div class="icon-close-white"></div>'
            );
            me._contentDiv = jQuery('<div class="popupContent"></div>');
            me._contentWrapper = jQuery('<div class="contentWrapper-infobox"></div>');
            me._actionLink = jQuery(
                '<span class="infoboxActionLinks"><a href="#"></a></span>'
            );
            me._actionTemplateWrapper = jQuery('<div class="actionTemplateWrapper"></div>');
            me._actionButton = jQuery(
                '<span class="infoboxActionLinks">' +
                '  <input type="button" />' +
                '</span>'
            );
            me._contentSeparator = jQuery(
                '<div class="infoboxLine">separator</div>'
            );
            me._popupWrapper = jQuery(
                '<div class="olPopup"></div>'
            );
        },

        /**
         * @method popup
         * @param {String} id
         *      id for popup so we can use additional requests to control it
         * @param {String} title
         *      popup title
         * @param {Object[]} contentData
         *      JSON presentation for the popup data
         * @param {OpenLayers.LonLat|Object} position
         *      lonlat coordinates where to show the popup or marker id {marker:'MARKER_ID'}
         * @param {Object} options
         *      additional options for infobox
         *
         * Displays a popup with given title and data in the given coordinates.
         *
         * contentData format example:
         * [{
         *  html: "",
         *  useButtons: true,
         *  primaryButton: "<button label>",
         *  actions : {
         *     "Tallenna" : callbackFunction,
         *     "Sulje" : callbackFunction
         * }
         * }]
         */
        popup: function (id, title, contentData, position, options, additionalTools) {
            var me = this;
            if (_.isEmpty(contentData)) {
                return;
            }
            var me = this,
                currPopup = me._popups[id],
                lon = null,
                lat = null,
                marker = null;

            if(position.marker && me.markers[position.marker]) {
                lon = me.markers[position.marker].data.x;
                lat = me.markers[position.marker].data.y;
                marker = me.markers[position.marker];
                me.markerPopups[position.marker] = id;
            } else if(position.lon && position.lat){
                lon = position.lon;
                lat = position.lat;
            } else {
                // Send a status report of the popup (it is not open)
                var evtB = me.getSandbox().getEventBuilder('InfoBox.InfoBoxEvent');
                var evt = evtB(id, false);
                me.getSandbox().notifyAll(evt);
                return;
            }

            var refresh = (currPopup &&
                    currPopup.lonlat.lon === lon &&
                    currPopup.lonlat.lat === lat);

            if (currPopup && !refresh) {
                if (me._popups[id].type === "mobile") {
                    me._popups[id].popup.dialog.remove();
                    me._popups[id].popup.__notifyListeners('close');
                } else {
                    me.close(id);
                }
                delete me._popups[id];
            }

            if (refresh) {
                contentData = currPopup.contentData.concat(contentData);
                currPopup.contentData = contentData;
            }

            me._renderPopup(id, contentData, title, {lon:lon, lat:lat}, options, refresh, additionalTools, marker);
        },

        /**
         * @method _renderPopup
         */
         _renderPopup: function (id, contentData, title, lonlat, options, refresh, additionalTools, marker) {
            var me = this,
                contentDiv = me._renderContentData(id, contentData),
                sanitizedTitle = Oskari.util.sanitize(title),
                popupContentHtml = me._renderPopupContent(id, sanitizedTitle, contentDiv, additionalTools),
                popupElement = me._popupWrapper.clone(),
                lonlatArray = [lonlat.lon, lonlat.lat],
                colourScheme = options.colourScheme,
                font = options.font,
                offsetX = 0,
                offsetY = -20,
                mapModule = me.getMapModule(),
                isMarker = (marker && marker.data) ? true : false,
                positioning = options && options.positioning && me._positionClasses && me._positionClasses[options.positioning] ? me._positionClasses[options.positioning] : "no-position-info",
                popupType,
                popupDOM,
                popup;

            jQuery(contentDiv).addClass('infoboxPopupNoMargin');

            if(isMarker){
                var markerPosition = mapModule.getSvgMarkerPopupPxPosition(marker);
                offsetX = markerPosition.x;
                offsetY = markerPosition.y;
            }

            if (!options.mobileBreakpoints) {
                options.mobileBreakpoints = me._mobileBreakpoints;
            }
            var isInMobileMode = this._isInMobileMode(options.mobileBreakpoints);

            popupElement.attr('id', id);
            if (refresh) {
                popup = me._popups[id].popup;
                if (isInMobileMode) {
                    popupType = "mobile";
                    popup.setContent(contentDiv);
                } else {
                    popupDOM = jQuery('#' + id);
                    popupType = "desktop";
                    jQuery('.olPopup').empty();
                    jQuery('.olPopup').html(popupContentHtml);
                    popup.setPosition(lonlatArray);
                    if (colourScheme) {
                        me._changeColourScheme(colourScheme, popupDOM, id);
                    }
                    if (positioning) {
                        popupDOM.addClass(positioning);
                        popupDOM.find('.popupHeaderArrow').addClass(positioning);
                    }
                }
            } else if (isInMobileMode) {
                popup = Oskari.clazz.create('Oskari.userinterface.component.Popup');
                popupType = "mobile";

                popup.createCloseIcon();
                me._showInMobileMode(popup);

                if (font) {
                    popup.setFont(font);
                }

                popup.show(sanitizedTitle, contentDiv);

                if (colourScheme) {
                    popup.setColourScheme(colourScheme);
                }
                popup.onClose(function () {
                    if (me._popups[id] && me._popups[id].type === "mobile") {
                        delete me._popups[id];
                    }
                });
                //clear the ugly backgroundcolor from the popup content
                jQuery(popup.dialog).css('background-color','inherit');
            } else {
                popupType = "desktop";
                popup = new ol.Overlay({
                    element: popupElement[0],
                    position: lonlatArray,
                    positioning: positioning,
                    offset: [offsetX, offsetY],
                    autoPan: true
                });

                mapModule.getMap().addOverlay(popup);
                jQuery(popup.getElement()).html(popupContentHtml);
                me._panMapToShowPopup(lonlatArray);

                jQuery(popup.div).css('overflow', 'visible');
                jQuery(popup.groupDiv).css('overflow', 'visible');

                popupDOM = jQuery('#' + id);
                if (positioning) {
                    popupDOM.addClass(positioning);
                    popupDOM.find('.popupHeaderArrow').addClass(positioning);
                };

                // Set the colour scheme if one provided
                if (colourScheme) {
                    me._changeColourScheme(colourScheme, popupDOM, id);
                }
                // Set the font if one provided
                if (font) {
                    me._changeFont(font, popupDOM, id);
                }
                // Fix the HTML5 placeholder for < IE10
                var inputs = popupDOM.find(
                    '.contentWrapper input, .contentWrapper textarea'
                );
                if (typeof inputs.placeholder === 'function') {
                    inputs.placeholder();
                }
            }

            me._popups[id] = {
                title: sanitizedTitle,
                contentData: contentData,
                lonlat: lonlat,
                popup: popup,
                colourScheme: colourScheme,
                font: font,
                options: options,
                isInMobileMode: isInMobileMode,
                type: popupType
            };

            if (me.adaptable && !isInMobileMode) {
                if (positioning && positioning !== 'no-position-info') {
                    me._adaptPopupSizeWithPositioning(id, refresh);
                } else {
                    me._adaptPopupSize(id, refresh);
                }
            }

            me._setClickEvent(id, popup, contentData, additionalTools, isInMobileMode);
        },

        _isInMobileMode: function (mobileBreakpoints) {
            var screenWidth = window.innerWidth,
                screenHeight = window.innerHeight;
            if (mobileBreakpoints.width) {
                if (screenWidth < mobileBreakpoints.width) {
                    return true;
                } else {
                    return false;
                }
            } else {
                if (screenHeight < mobileBreakpoints.height) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        _showInMobileMode: function (popup) {
            popup.makeModal();
            popup.overlay._overlays[0].overlay.css({opacity: 0});
            popup.overlay.followResizing(true);
            popup.overlay.bindClickToClose();
            popup.overlay.onClose(function () {
                popup.dialog.remove();
                popup.__notifyListeners('close');
            });
            popup.dialog.addClass('mobile-infobox');
        },

        /**
         * Wraps the content into popup and returns the html string.
         *
         * @method _renderPopupContent
         * @private
         * @param  {String} id
         * @param  {String} title
         * @param  {jQuery} contentDiv
         * @return {String}
         */
        _renderPopupContent: function (id, title, contentDiv, additionalTools) {
            var me = this,
                arrow = this._arrow.clone(),
                header = this._header.clone(),
                headerWrapper = this._headerWrapper.clone(),
                closeButton = this._headerCloseButton.clone(),
                resultHtml;

            closeButton.attr('id', 'oskari_' + id + '_headerCloseButton');
            header.append(title);
            headerWrapper.append(header);
            headerWrapper.append(closeButton);

            //add additional btns
            jQuery.each( additionalTools, function( index, key ){
                var additionalButton = me._headerAdditionalButton.clone();
                additionalButton.attr({
                    'id': key.name,
                    'class': key.iconCls,
                    'style': key.styles
                });
                headerWrapper.append(additionalButton);
            });


            resultHtml = arrow.outerHTML() +
                headerWrapper.outerHTML() +
                contentDiv.outerHTML();

            return resultHtml;
        },

        /**
         * Renders the content data into html presentation.
         * Also creates links/buttons for the actions.
         *
         * @method _renderContentData
         * @private
         * @param  {Object[]} contentData
         * @return {jQuery}
         */
        _renderContentData: function (id, contentData) {
            var me = this;
            return _.foldl(contentData, function (contentDiv, datum, index) {
                var contentWrapper = me._contentWrapper.clone(),
                    actions = datum.actions,
                    key,
                    actionTemplate,
                    btn,
                    link,
                    currentGroup,
                    group = -1,
                    sanitizedHtml;

                if (typeof datum.html === "string") {
                    sanitizedHtml = Oskari.util.sanitize(datum.html);
                } else if (typeof datum.html === "object") {
                    sanitizedHtml = Oskari.util.sanitize(datum.html.outerHTML());
                }

                contentWrapper.append(sanitizedHtml);

	            contentWrapper.attr('id', 'oskari_' + id + '_contentWrapper');

                if (actions) {
                    _.forEach(actions, function (action) {
                        var sanitizedActionName = Oskari.util.sanitize(action.name);
                        if (action.type === "link") {
                            actionTemplate = me._actionLink.clone();
                            link = actionTemplate.find('a');
                            link.attr('contentdata', index);
                            link.attr('id', 'oskari_' + id + '_actionLink');
                            link.append(sanitizedActionName);
                        } else {
                            actionTemplate = me._actionButton.clone();
                            btn = actionTemplate.find('input');
                            btn.attr({
                                contentdata: index,
                                value: sanitizedActionName
                            });
                        }

                        currentGroup = action.group;

                        if (currentGroup && currentGroup === group) {
                            actionTemplateWrapper.append(actionTemplate);
                        } else {
                            actionTemplateWrapper = me._actionTemplateWrapper.clone();
                            actionTemplateWrapper.append(actionTemplate);
                            contentWrapper.append(actionTemplateWrapper);
                        }
                        group = currentGroup;
                    });
                }

                contentDiv.append(contentWrapper);
                return contentDiv;
            }, me._contentDiv.clone());
        },

        _setClickEvent: function (id, popup, contentData, additionalTools, isMobilePopup) {
            var me = this,
                sandbox = this.getMapModule().getSandbox(),
                popupElement;

            if (isMobilePopup) {
                popupElement = popup.dialog[0];
            } else {
                popupElement = popup.getElement();
            }

            popupElement.onclick = function(evt) {
                var link = jQuery(evt.target || evt.srcElement);

                if (link.hasClass('olPopupCloseBox')) { // Close button
                    me.close(id);
                } else { // Action links
                    var i = link.attr('contentdata'),
                        text = link.attr('value');
                    if (!text) {
                        text = link.html();
                    }
                    if (contentData[i] && contentData[i].actions) {
                        var actionObject = _.find(contentData[i].actions, {'name': text});
                        if (typeof actionObject.action === 'function') {
                            contentData[i].actions[value]();
                        } else {
                            var event = sandbox.getEventBuilder('InfoboxActionEvent')(id, text, actionObject.action);
                            sandbox.notifyAll(event);
                        }
                    }
                }
                if(additionalTools.length > 0){
                    jQuery.each( additionalTools, function( index, key ){
                        if (link.hasClass(key.iconCls)) {
                            me.close(id);
                            key.callback(key.params);
                        }
                    });
                }

                if(!link.is('a') || link.parents('.getinforesult_table').length) {
                    evt.stopPropagation();
                }
            };
        },

        /**
         * Removes the data of given id from the popup and
         * renders it again to reflect the change.
         *
         * @method removeContentData
         * @private
         * @param  {String} popupId
         * @param  {String} contentId
         */
        removeContentData: function (popupId, contentId) {
            var popup = this.getPopups(popupId),
                removed = false,
                cLen,
                contentData,
                datum,
                i;

            if (!popup) {
                return;
            }

            contentData = popup.contentData;

            for (i = 0, cLen = contentData.length; i < cLen; i += 1) {
                datum = contentData[i];
                if (datum.layerId && ('' + datum.layerId === '' + contentId)) {
                    contentData.splice(i, 1);
                    removed = true;
                    break;
                }
            }

            if (removed) {
                if (contentData.length === 0) {
                    // No content left, close popup
                    this.close(popupId);
                } else {
                    this._renderPopup(
                        popupId,
                        contentData,
                        popup.title,
                        popup.lonlat,
                        popup.colourScheme,
                        popup.font,
                        true
                    );
                }
            }
        },

        setAdaptable: function (isAdaptable) {
            this.adaptable = isAdaptable;
        },

        _adaptPopupSize: function(olPopupId, isOld) {
            var size = this.getMapModule().getSize(),
                popup = jQuery('#' + olPopupId),
                left = parseFloat(popup.css('left')),
                maxWidth = size.width * 0.7,
                maxHeight = size.height * 0.7;

            if(isNaN(left)) {
                left = 0;
            }

            // popup needs to move 10 pixels to the right
            // so that header arrow can be moved out of container(left).
            // Only move it if creating a new popup
            if (!isOld) {
                left = left + 10;
            }
            popup.find('.popupHeaderArrow').css({
                'margin-left': '-10px'
            });
            popup.find('.popupHeader').css('width', '100%');

            var content = popup.find('.popupContent').css({
                'margin-left': '0',
                'padding': '5px 20px 5px 20px',
                'max-height': maxHeight - 40 + 'px'
            });

            popup.find('.olPopupContent').css({
                'width': '100%',
                'height': '100%'
            });

            var wrapper = content.find('.contentWrapper');
            popup.css({
                'height': 'auto',
                'width': 'auto',
                'min-width': '300px',
                'max-width': maxWidth + 'px',
                'min-height': '200px',
                'left': left + 'px',
                'position': 'absolute',
                'overflow' : 'visible',
                'z-index': '16000'
            });

            if (jQuery.browser.msie) {
                // allow scrolls to appear in IE, but not in any other browser
                // instead add some padding to the wrapper to make it look better
                wrapper.css({
                    'padding-bottom': '5px'
                });
            } else {
                var height = wrapper.height();
                height = height > maxHeight ? (maxHeight + 30) + 'px' : 'auto';
                var isOverThanMax = height > maxHeight ? true : false;
                content.css({
                    'height': height
                });

                if(!isOverThanMax) {
                    popup.css('min-height', 'inherit');
                }
            }
        },
        _adaptPopupSizeWithPositioning: function (olPopupId, isOld) {
            var size = this.getMapModule().getSize(),
                popup = jQuery('#' + olPopupId),
                maxWidth = size.width * 0.7,
                maxHeight = size.height * 0.7;
            popup.find('.popupHeader').css('width', '100%');

            var content = popup.find('.popupContent').css({
                'margin-left': '0',
                'padding': '5px 20px 5px 20px',
                'max-height': maxHeight - 40 + 'px'
            });

            popup.find('.olPopupContent').css({
                'width': '100%',
                'height': '100%'
            });
        },

        /**
         * @method _panMapToShowPopup
         * @private
         * Pans map if gfi popup would be out of screen
         * @param {OpenLayers.LonLat} lonlat where to show the popup
         */
        _panMapToShowPopup: function (lonlat) {
            var me = this,
                pixels = me.getMapModule().getPixelFromCoordinate(lonlat),
                size = me.getMapModule().getSize(),
                width = size.width,
                height = size.height;
            // if infobox would be out of screen
            // -> move map to make infobox visible on screen
            var panx = 0,
                pany = 0,
                popup = jQuery('.olPopup'),
                infoboxWidth = popup.width() + 128, // add some safety margin here so the popup close button won't got under the zoombar...
                infoboxHeight = popup.height() + 128;

            if (pixels[0] + infoboxWidth > width) {
                panx = width - (pixels[0] + infoboxWidth);
            }
            if (pixels[1] + infoboxHeight > height) {
                pany = height - (pixels[1] + infoboxHeight);
            }
            // check that we are not "over the top"
            else if (pixels[1] < 70) {
                pany = 70;
            }
            if (panx !== 0 || pany !== 0) {
                me.getMapModule().panMapByPixels(-panx, -pany);
            }
        },

        /**
         * Changes the colour scheme of the plugin
         *
         * @method changeColourScheme
         * @param {Object} colourScheme object containing the colour settings for the plugin
         *      {
         *          bgColour: <the background color of the gfi header>,
         *          titleColour: <the colour of the gfi title>,
         *          headerColour: <the colour of the feature name>,
         *          iconCls: <the icon class of the gfi close icon>
         *      }
         * @param {jQuery} div DOMElement
         * @param {String} id popup id
         */
        _changeColourScheme: function (colourScheme, div, id) {
            if (id) {
                div = div || jQuery('div#' + id);// || jQuery('.olPopup:visible');
            } else {
                div = div;// || jQuery('.olPopup:visible');
            }
            if (!colourScheme || !div) {
                return;
            }

            var gfiHeaderArrow = div.find('div.popupHeaderArrow'),
                gfiHeader = div.find('div.popupHeader'),
                gfiTitle = div.find('div.popupTitle'),
                layerHeader = div.find('div.getinforesult_header'),
                featureHeader = div.find('h3.myplaces_header'),
                closeButton = div.find('div.olPopupCloseBox');

            /*top arrow needs to be the same color as the header, when it's pointing out of the header (bottom and no positioning (=default))*/
            if (jQuery(gfiHeaderArrow).hasClass('top-center')) {
                gfiHeaderArrow.css({
                    'border-bottom-color': colourScheme.bgColour
                });
            } else if (jQuery(gfiHeaderArrow).hasClass('no-position-info')) {
                gfiHeaderArrow.css({
                    'border-right-color': colourScheme.bgColour
                });
            }

            gfiHeader.css({
                'background-color': colourScheme.bgColour,
                'color': colourScheme.titleColour
            });

            gfiTitle.css({
                'color': colourScheme.titleColour
            });

            layerHeader.css({
                'background-color': colourScheme.bgColour
            });

            layerHeader.find('div.getinforesult_header_title').css({
                'color': colourScheme.titleColour
            });

            featureHeader.css({
                'color': colourScheme.headerColour
            });
            // AH-1075 colourScheme.iconCls might not be set, so check first.
            if (colourScheme.iconCls) {
                closeButton
                    .removeClass('icon-close-white icon-close')
                    .addClass(colourScheme.iconCls);
            }

            /*buttons and actionlinks*/
            if (colourScheme) {
                if (colourScheme.linkColour) {
                    jQuery(div).find('span.infoboxActionLinks').find('a').css('color', colourScheme.linkColour);
                }
                if (colourScheme.buttonBgColour) {
                    jQuery(div).find('span.infoboxActionLinks').find('input:button').css('background','none');
                    jQuery(div).find('span.infoboxActionLinks').find('input:button').css('background-color',colourScheme.buttonBgColour);
                }
                if (colourScheme.buttonLabelColour) {
                    jQuery(div).find('span.infoboxActionLinks').find('input:button').css('color',colourScheme.buttonLabelColour);
                }
            }
        },
        _handleMapSizeChanges: function (width, height) {
            var me = this,
                pid,
                popup;
            for (pid in me._popups) {
                if (me._popups.hasOwnProperty(pid)) {
                    popup = this._popups[pid];
                    if (popup.isInMobileMode) {
                        //are we moving away from the mobile mode? -> close and rerender.
                        if (!me._isInMobileMode(popup.options.mobileBreakpoints)) {
                            popup.popup.close();
                            me._renderPopup(pid, popup.contentData, popup.title, popup.lonlat, popup.options, false, []);
                        }
                    } else {
                        //are we moving into the mobile mode? -> close old and rerender
                        if (me._isInMobileMode(popup.options.mobileBreakpoints)) {
                            me.close(pid);
                            me._renderPopup(pid, popup.contentData, popup.title, popup.lonlat, popup.options, false, []);
                        }
                    }
                }
            }
        },
        /**
         * Changes the font used by plugin by adding a CSS class to its DOM elements.
         *
         * @method _changeFont
         * @param {String} fontId
         * @param {jQuery} div DOMElement
         * @param {String} id popup id
         */
        _changeFont: function (fontId, div, id) {
            div = div || jQuery('div#' + id);

            if (!div || !fontId) {
                return;
            }

            // The elements where the font style should be applied to.
            var elements = [],
                j,
                el;

            elements.push(div);
            elements.push(div.find('table.getinforesult_table'));

            // Remove possible old font classes.
            for (j = 0; j < elements.length; j += 1) {
                el = elements[j];
                // FIXME create function outside the loop
                el.removeClass(function () {
                    var removeThese = '',
                        classNames = this.className.split(' '),
                        i;

                    // Check if there are any old font classes.
                    for (i = 0; i < classNames.length; i += 1) {
                        if (/oskari-publisher-font-/.test(classNames[i])) {
                            removeThese += classNames[i] + ' ';
                        }
                    }

                    // Return the class names to be removed.
                    return removeThese;
                });

                // Add the new font as a CSS class.
                el.addClass('oskari-publisher-font-' + fontId);
            }
        },

        /**
         * @method close
         * @param {String} id
         *      id for popup that we want to close (optional - if not given, closes all popups)
         */
        close: function (id, position) {
            // destroys all if id not given
            // deletes reference to the same id will work next time also
            var pid,
                popup,
                event,
            	sandbox = this.getMapModule().getSandbox();
            if (!id) {
                for (pid in this._popups) {
                    if (this._popups.hasOwnProperty(pid)) {
                        popup = this._popups[pid];
                        if (!position ||
                            position.lon !== popup.lonlat.lon ||
                            position.lat !== popup.lonlat.lat) {
                            if(typeof popup.popup.setPosition === 'function') {
                                popup.popup.setPosition(undefined);
                            }
                            if (popup.popup && popup.type === "desktop") {
                                this.getMapModule().getMap().removeOverlay(this._popups[pid].popup);
                            } else if (popup.popup && popup.type === "mobile") {
                                popup.popup.close();
                            }
                            delete this._popups[pid];
                            event = sandbox.getEventBuilder('InfoBox.InfoBoxEvent')(pid, false);
                        	sandbox.notifyAll(event);
                        }
                    }
                }
                return;
            }
            // id specified, delete only single popup
            if (this._popups[id]) {
                if (this._popups[id].popup && this._popups[id].type === "desktop") {
                    this.getMapModule().getMap().removeOverlay(this._popups[id].popup);
                } else if (this._popups[id].popup && this._popups[id].type === "mobile") {
                    this._popups[id].popup.close();
                }
                delete this._popups[id];
                event = sandbox.getEventBuilder('InfoBox.InfoBoxEvent')(id, false);
            	sandbox.notifyAll(event);
            }
            // else notify popup not found?
        },

        /**
         * @method getPopups
         * Returns references to popups that are currently open
         * @return {Object}
         */
        getPopups: function (id) {
            if (id) {
                return this._popups[id];
            }
            return this._popups;
        }
    }, {
        'extend': ['Oskari.mapping.mapmodule.plugin.AbstractMapModulePlugin'],
        /**
         * @static @property {string[]} protocol array of superclasses
         */
        'protocol': [
            'Oskari.mapframework.module.Module',
            'Oskari.mapframework.ui.module.common.mapmodule.Plugin'
        ]
    });
