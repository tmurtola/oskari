
/**
 * @class Oskari.mapframework.bundle.featuredata2.Flyout
 *
 * Renders the "featuredata2" flyout.
 */

Oskari.clazz.define(
    'Oskari.mapframework.bundle.featuredata2.Flyout',

    /**
     * @static @method create called automatically on construction
     *
     * @param {Oskari.mapframework.bundle.featuredata2.FeatureDataGridBundleInstance} instance
     * Reference to component that created the tile
     *
     */
    function (instance) {
        this.instance = instance;
        this.container = null;
        this.state = null;
        this.layers = {};
        this._fixedDecimalCount = 2;

        this.tabsContainer = null;
        this.selectedTab = null;
        this.active = false;
        this.templateLink = jQuery('<a href="JavaScript:void(0);"></a>');
        // Resizability of the flyout
        this.resizable = true;
        // Is layout currently resizing?
        this.resizing = false;
        // The size of the layout has been changed (needed when changing tabs)
        this.resized = false;

        // templates
        this.template = {};
        for (p in this.__templates) {
            if (this.__templates.hasOwnProperty(p)) {
                this.template[p] = jQuery(this.__templates[p]);
            }
        }
    }, {
        __templates: {
            wrapper : '<div class="gridMessageContainer" style="margin-top:30px; margin-left: 10px;"></div>'
        },
        /**
         * @method getName
         * @return {String} the name for the component
         */
        getName: function () {
            return 'Oskari.mapframework.bundle.featuredata2.Flyout';
        },

        /**
         * @method setEl
         * @param {Object} el
         *      reference to the container in browser
         *
         * Interface method implementation
         */
        setEl: function (el) {
            this.container = el[0];
            if (!jQuery(this.container).hasClass('featuredata')) {
                jQuery(this.container).addClass('featuredata');
            }
        },

        /**
         * @method startPlugin
         *
         * Interface method implementation, assigns the HTML templates
         * that will be used to create the UI
         */
        startPlugin: function () {
            this.tabsContainer = Oskari.clazz.create(
                'Oskari.userinterface.component.TabContainer',
                this.instance.getLocalization('nodata')
            );
        },

        /**
         * @method stopPlugin
         *
         * Interface method implementation, does nothing atm
         */
        stopPlugin: function () {

        },

        /**
         * @method getTitle
         * @return {String} localized text for the title of the flyout
         */
        getTitle: function () {
            return this.instance.getLocalization('title');
        },

        /**
         * @method getDescription
         * @return {String} localized text for the description of the
         * flyout
         */
        getDescription: function () {
            return this.instance.getLocalization('desc');
        },

        /**
         * @method getOptions
         * Interface method implementation, does nothing atm
         */
        getOptions: function () {

        },

        /**
         * @method setState
         * @param {Object} state
         *      state that this component should use
         * Interface method implementation, does nothing atm
         */
        setState: function (state) {
            this.state = state;
        },

        /**
         * @method setResizable
         * @param {Boolean} resizable
         *      state of the flyout resizability
         * Defines if the flyout is resizable
         */
        setResizable: function (resizable) {
            this.resizable = resizable;
        },

        /**
         * @method createUi
         * Creates the UI for a fresh start
         */
        createUi: function () {
            var me = this,
                flyout = jQuery(me.container),
                sandbox = me.instance.sandbox,
                dimReqBuilder = sandbox.getRequestBuilder(
                    'DimMapLayerRequest'
                ),
                hlReqBuilder = sandbox.getRequestBuilder(
                    'HighlightMapLayerRequest'
                );

            flyout.empty();
            me.WFSLayerService = sandbox.getService('Oskari.mapframework.bundle.mapwfs2.service.WFSLayerService');

            // if previous panel is undefined -> just added first tab
            // if selectedPanel is undefined -> just removed last tab
            me.tabsContainer.addTabChangeListener(
                function (previousPanel, selectedPanel) {
                    var request;
                    // sendout dim request for unselected tab
                    if (previousPanel) {
                        request = dimReqBuilder(previousPanel.layer.getId());
                        sandbox.request(me.instance.getName(), request);
                    }
                    me.selectedTab = selectedPanel;
                    if (selectedPanel) {
                        me.updateData(selectedPanel.layer);
                        // sendout highlight request for selected tab
                        if (me.active) {
                            request = hlReqBuilder(selectedPanel.layer.getId());
                            sandbox.request(me.instance.getName(), request);
                        }
                    }
                }
            );
            me.tabsContainer.insertTo(flyout);
        },

        /**
         * @method layerAdded
         * @param {Oskari.mapframework.domain.WfsLayer} layer
         *           WFS layer that was added
         * Adds a tab for the layer
         */
        layerAdded: function (layer) {
            var me = this,
                panel = Oskari.clazz.create(
                    'Oskari.userinterface.component.TabPanel'
                );

            panel.setTitle(layer.getName());
            panel.setTooltip(layer.getName());
            panel.getContainer().append(
                this.instance.getLocalization('loading')
            );
            panel.layer = layer;
            this.layers['' + layer.getId()] = panel;
            this.tabsContainer.addPanel(panel);
            panel.setTitleIcon('icon-funnel', function (event) {
                me.addFilterFunctionality(event, layer);
            });
        },

        turnOnClickOff: function () {
            var me = this;
            me.filterDialog.popup.dialog.off('click', '.add-link');
        },

        addFilterFunctionality: function (event, layer) {
            var me = this,
                prevJson;

                // this is needed to add the functionality to filter with aggregate analyse values
                // if value is true, the link to filter with aggregate analyse values is added to dialog
                isAggregateValueAvailable = me.checkIfAggregateValuesAreAvailable();

            var fixedOptions = {
                bboxSelection: true,
                clickedFeaturesSelection: false,
                addLinkToAggregateValues: isAggregateValueAvailable
            };
            me.filterDialog = Oskari.clazz.create(
                'Oskari.userinterface.component.FilterDialog',
                fixedOptions
            );

            me.filterDialog.setUpdateButtonHandler(function (filters) {
                // throw event to new wfs
                var event = me.instance.sandbox.getEventBuilder('WFSSetPropertyFilter')(filters, layer.getId());
                me.instance.sandbox.notifyAll(event);
            });

            if (me.service) {
                me.aggregateAnalyseFilter = Oskari.clazz.create(
                    'Oskari.analysis.bundle.analyse.aggregateAnalyseFilter',
                    me.instance,
                    me.filterDialog
                );

                me.filterDialog.createFilterDialog(layer, prevJson, function () {
                    me.service._returnAnalysisOfTypeAggregate(_.bind(me.aggregateAnalyseFilter.addAggregateFilterFunctionality, me));
                });
            } else {
                me.filterDialog.createFilterDialog(layer);
            }
            me.filterDialog.setCloseButtonHandler(_.bind(me.turnOnClickOff, me));
        },

        // function gives value to addLinkToAggregateValues (true/false)
        checkIfAggregateValuesAreAvailable: function () {
            this.service = this.instance.sandbox.getService(
                'Oskari.analysis.bundle.analyse.service.AnalyseService'
            );
            if (!this.service) {
                return false;
            }
            return true;
        },

        /**
         * @method layerRemoved
         * @param {Oskari.mapframework.domain.WfsLayer} layer
         *           WFS layer that was removed
         * Removes the tab for the layer
         */
        layerRemoved: function (layer) {
            var layerId = '' + layer.getId(),
                panel = this.layers[layerId];

            this.tabsContainer.removePanel(panel);
            // clean up
            if (panel) {
                panel.grid = null;
                delete panel.grid;
                panel.layer = null;
                delete panel.layer;
                this.layers[layerId] = null;
                delete this.layers[layerId];
            }
        },

        /**
         * @method updateData
         * @param {Oskari.mapframework.domain.WfsLayer} layer
         *           WFS layer that was added
         * Updates data for layer
         */
        updateData: function (layer) {
            if (!this.active || !layer) {
                return;
            }

            var map = this.instance.sandbox.getMap(),
                panel = this.layers['' + layer.getId()],
                selection = null,
                i,
                selectedFeatures;

            if (panel.grid) {
                selection = panel.grid.getSelection();
            }
            panel.getContainer().empty();
            if (!layer.isInScale(map.getScale())) {
                panel.getContainer().append(this.instance.getLocalization('errorscale'));
                return;
            }
            panel.getContainer().append(this.instance.getLocalization('loading'));


            if (this.instance.__loadingStatus[layer.getId()] === 'loading' || this.instance.__loadingStatus[layer.getId()] === 'error') {
                return;
            }

            // in scale, proceed
            this._prepareData(layer);
            if (selection && selection.length > 0 && typeof selection[0].featureId !== 'undefined') {
                for (i = 0; i < selection.length; i += 1) {
                    panel.grid.select(selection[i].featureId, true);
                }
            }

            // filter
            selectedFeatures = this.WFSLayerService.getSelectedFeatureIds(layer._id);
            if (panel.grid &&  selectedFeatures && selectedFeatures.length > 0) {
                for (i = 0; i < selectedFeatures.length; i++) {
                    panel.grid.select(selectedFeatures[i], true);
                }
            }

            // Grid opacity
            this.setGridOpacity(layer, 1.0);
        },

        /**
         * @method updateGrid
         * @param {Object} user's selection on map
         * Updates grid for drawn places
         */
        updateGrid: function () {
            if (!this.selectedTab) {
                return;
            }
            this.updateData(this.selectedTab.layer);
        },

        /**
         * @method _enableResize
         * Enables the flyout resizing
         */
        _enableResize: function () {
            var me = this,
                content = jQuery('div.oskari-flyoutcontent.featuredata'),
                flyout = content.parent().parent(),
                container = content.parent(),
                mouseOffsetX = 0,
                mouseOffsetY = 0;

            // Resizer image for lower right corner
            flyout.find('div.tab-content').css({
                'padding-top': '1px',
                'padding-right': '1px'
            });
            var resizer = jQuery('<div/>');
            resizer.addClass('flyout-resizer');
            var resizerHeight = 16;
            resizer.removeClass('allowHover');
            resizer.addClass('icon-drag');
            resizer.bind('dragstart', function (event) {
                event.preventDefault();
            });

            // Start resizing
            resizer.mousedown(function (e) {
                if (me.resizing) {
                    return;
                }
                me.resizing = true;
                mouseOffsetX = e.pageX - flyout[0].offsetWidth - flyout[0].offsetLeft;
                mouseOffsetY = e.pageY - flyout[0].offsetHeight - flyout[0].offsetTop;
                // Disable mouse selecting
                jQuery(document).attr('unselectable', 'on')
                    .css('user-select', 'none')
                    .on('selectstart', false);
            });

            // End resizing
            jQuery(document).mouseup(function () {
                me.resizing = false;
                me.resized = true;
            });

            // Resize the featuredata2 flyout
            jQuery(document).mousemove(function (e) {
                if (!me.resizing) {
                    return;
                }

                var flyOutMinHeight = 100,
                    bottomPadding = 60,
                    flyoutPosition = flyout.offset(),
                    containerPosition = container.offset();

                if (e.pageX > flyoutPosition.left) {
                    var newWidth = e.pageX - flyoutPosition.left - mouseOffsetX;
                    flyout.css('max-width', newWidth.toString() + 'px');
                    flyout.css('width', newWidth.toString() + 'px');
                }
                if (e.pageY - flyoutPosition.top > flyOutMinHeight) {
                    var newHeight = e.pageY - flyoutPosition.top - mouseOffsetY;
                    flyout.css('max-height', newHeight.toString() + 'px');
                    flyout.css('height', newHeight.toString() + 'px');

                    var newContainerHeight = e.pageY - containerPosition.top - mouseOffsetY;
                    container.css('max-height', (newContainerHeight - resizerHeight).toString() + 'px');
                    container.css('height', (newContainerHeight - resizerHeight).toString() + 'px');

                    var tabsContent = jQuery('div.oskari-flyoutcontent.featuredata').find('div.tabsContent'),
                        newMaxHeight = e.pageY - tabsContent[0].offsetTop - resizerHeight - bottomPadding,
                        tabTools = jQuery('div.oskari-flyoutcontent.featuredata').find('div.tab-tools');
                    if (tabTools.length > 0) {
                        newMaxHeight = newMaxHeight - tabTools.height();
                    }

                    flyout.find('div.tab-content').css('max-height', newMaxHeight.toString() + 'px');
                }
            });

            // Modify layout for the resizer image
            flyout.find('div.oskari-flyoutcontent').css('padding-bottom', '5px');
            if (jQuery('div.flyout-resizer').length === 0) {
                flyout.append(resizer);
            }
        },

        // helper for removing item (indexOf is not in IE8)
        remove_item: function (a, val) {
            var key;
            for (key in a) {
                if (a[key] === val) {
                    a.splice(key, 1);
                    break;
                }
            }
            return a;
        },

        /**
         * @private @method _prepareData
         * Updates data for layer
         *
         * @param {Oskari.mapframework.domain.WfsLayer} layer
         * WFS layer that was added
         * @param {Object} data
         * WFS data JSON
         *
         */
        _prepareData: function (layer) {
            var me = this,
                panel = this.layers['' + layer.getId()],
                isOk = this.tabsContainer.isSelected(panel),
                conf = me.instance.conf;

            if (isOk) {
                panel.getContainer().empty();

                // create model
                var model = Oskari.clazz.create(
                    'Oskari.userinterface.component.GridModel'
                );
                model.setIdField('__fid');

                // hidden fields (hide all - remove if not empty)
                var hiddenFields = layer.getFields().slice(0);

                // get data
                var fields = layer.getFields().slice(0),
                    locales = layer.getLocales().slice(0),
                    features = layer.getActiveFeatures().slice(0),
                    selectedFeatures = layer.getSelectedFeatures().slice(0); // filter

                me._addFeatureValues(model, fields, hiddenFields, features, selectedFeatures);
                me._addFeatureValues(model, fields, hiddenFields, selectedFeatures, null);

                fields = model.getFields();
                hiddenFields.push('__fid');
                hiddenFields.push('__centerX');
                hiddenFields.push('__centerY');
                hiddenFields.push('geometry');

                // check if properties (fields or locales) have changed
                if (!panel.fields || !panel.locales || !me._isArrayEqual(fields, panel.fields) || !me._isArrayEqual(locales, panel.locales)) {
                    panel.fields = fields;
                    panel.locales = locales;
                    panel.propertiesChanged = true;
                }

                if (!panel.grid || panel.propertiesChanged) {
                    panel.propertiesChanged = false;

                    var grid = Oskari.clazz.create(
                            'Oskari.userinterface.component.Grid',
                            me.instance.getLocalization('columnSelectorTooltip')
                        ),
                        k;

                    // Data source & metadata link
                    grid.setDataSource(
                        layer.getSource && layer.getSource() ? layer.getSource() : layer.getOrganizationName()
                    );
                    grid.setMetadataLink(layer.getMetadataIdentifier());

                    // localizations
                    if (locales) {
                        for (k = 0; k < locales.length; k += 1) {
                            grid.setColumnUIName(fields[k], locales[k]);
                        }
                    }

                    // set selection handler
                    grid.addSelectionListener(function (pGrid, dataId) {
                        me._handleGridSelect(layer, dataId);
                    });

                    // set popup handler for inner data
                    var showMore = me.instance.getLocalization('showmore');
                    grid.setAdditionalDataHandler(showMore,
                        function (link, content) {
                            var dialog = Oskari.clazz.create(
                                'Oskari.userinterface.component.Popup'
                            );
                            dialog.show(showMore, content);
                            dialog.moveTo(link, 'bottom');
                            if (me.dialog) {
                                me.dialog.close(true);
                            }
                            me.dialog = dialog;
                        });

                    // helper function for visibleFields
                    var contains = function (a, obj) {
                        for (var i = 0; i < a.length; i += 1) {
                            if (a[i] === obj) {
                                return true;
                            }
                        }
                        return false;
                    };

                    // filter out certain fields
                    var visibleFields = [],
                        i;

                    for (i = 0; i < fields.length; i += 1) {
                        if (!contains(hiddenFields, fields[i])) {
                            visibleFields.push(fields[i]);
                        }
                    }

                    grid.setVisibleFields(visibleFields);
                    grid.setColumnSelector(true);
                    grid.setResizableColumns(true);


                    if (conf && !conf.disableExport) {
                        grid.setExcelExporter(
                            layer.getPermission('download') === 'download_permission_ok'
                        );
                    }

                    panel.grid = grid;
                }
                panel.grid.setDataModel(model);
                _.forEach(visibleFields, function (field) {
                    grid.setNumericField(field, me._fixedDecimalCount);
                });
                panel.grid.renderTo(panel.getContainer());
                // define flyout size to adjust correctly to arbitrary tables
                var mapdiv = this.instance.sandbox.findRegisteredModuleInstance('MainMapModule').getMapEl(),
                    content = jQuery('div.oskari-flyoutcontent.featuredata'),
                    flyout = content.parent().parent();

                if (!me.resized) {
                    // Define default size for the object data list
                    flyout.find('div.tab-content').css('max-height', (mapdiv.height() / 4).toString() + 'px');
                    flyout.css('max-width', mapdiv.width().toString() + 'px');
                }
                if (me.resizable) {
                    this._enableResize();
                }

                // Extra header message on top of grid
                this._appendHeaderMessage(panel, locales, layer);

            }
        },
        setGridOpacity: function (layer, opacity) {
            if (!this.active || !layer || isNaN(opacity)) {
                return;
            }
            var me = this,
                panel = this.layers['' + layer.getId()],
                tabContent = jQuery('div.oskari-flyoutcontent.featuredata').find('div.tab-content');
                isOk = this.tabsContainer.isSelected(panel);


            if (isOk && panel.grid) {
                tabContent.css({ 'opacity': opacity });
            }
        },

        /**
         * @method _addFeatureValues
         * @private
         * @param {Oskari.userinterface.component.GridModel} grid
         * @param {Object[]} features
         *
         * Adds features to the model data
         */
        _addFeatureValues: function (model, fields, hiddenFields, features, selectedFeatures) {
            var i,
                j,
                k,
                featureData,
                urlLink,
                values;

            eachFeature:
                for (i = 0; i < features.length; i += 1) {
                    featureData = {};
                    values = features[i];

                    // remove from selected if in feature list
                    if (selectedFeatures !== null && selectedFeatures !== undefined && selectedFeatures.length > 0) {
                        for (k = 0; k < selectedFeatures.length; k += 1) {
                            if (values[0] === selectedFeatures[k][0]) { // fid match
                                selectedFeatures.splice(k, 1);
                            }
                        }
                    }

                    for (j = 0; j < fields.length; j += 1) {
                        if (!values || values[j] === null || values[j] === undefined || values[j] === '') {
                            featureData[fields[j]] = '';
                        } else {
                            // Generate and url links
                            if (this._isUrlValid(values[j])) {
                                if (values[j].substring(0, 4) === 'http') {
                                    urlLink = values[j];
                                } else {
                                    urlLink = 'http://' + values[j];
                                }
                                featureData[fields[j]] = '<a href="' + urlLink + '" target="_blank">' + values[j] + '</a>';
                            } else {
                                featureData[fields[j]] = values[j];
                            }
                            // remove from empty fields
                            this.remove_item(hiddenFields, fields[j]);
                        }
                    }

                    // Remove this when better solution to handle duplicates is implemented
                    var tableData = model.getData();
                    for (j = 0; j < tableData.length; j += 1) {
                        if (tableData[j].__fid === featureData.__fid) {
                            continue eachFeature;
                        }
                    }

                    model.addData(featureData);
                }
        },

        /**
         * @method _isUrlValid
         * @param {String} url
         * @returns {boolean}
         * @private
         *
         * Checks if a url is valid
         */
        _isUrlValid: function (url) {
            if ((!url) || (typeof url !== 'string')) {
                return false;
            }
            var re = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.)[a-zåÅäÄöÖ0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
            return re.test(url);
        },

        /**
         * @method _isArrayEqual
         * @private
         * @param {String[]} current
         * @param {String[]} old
         *
         * Checks if the arrays are equal
         */
        _isArrayEqual: function (current, old) {
            var i;

            if (old.length !== current.length) {
                // arrays have different lengths, no way are they equal
                return false;
            }

            for (i = 0; i < current.length; i += 1) {
                if (current[i] !== old[i]) {
                    return false;
                }
            }

            return true;
        },

        /**
         * @method _handleGridSelect
         * @private
         * @param {Oskari.mapframework.domain.WfsLayer} layer
         *           WFS layer that was added
         * @param {String} dataId
         *           id for the data that was selected
         * @param {Boolean} keepCollection
         *           true to keep previous selection, false to clear before selecting
         * Notifies components that a selection was made
         */
        _handleGridSelect: function (layer, dataId, keepCollection) {
            var sandbox = this.instance.sandbox,
                featureIds = [dataId],
                builder = sandbox.getEventBuilder('WFSFeaturesSelectedEvent');
            if (keepCollection === undefined) {
                keepCollection = sandbox.isCtrlKeyDown();
            }
            if (!keepCollection) {
                this.WFSLayerService.emptyWFSFeatureSelections(layer);
            }
            this.WFSLayerService.setWFSFeaturesSelections(layer._id, featureIds);
            var event = builder(this.WFSLayerService.getSelectedFeatureIds(layer._id), layer, true);
            sandbox.notifyAll(event);
        },

        /**
         * @method featureSelected
         *
         * @param {Oskari.mapframework.bundle.mapwfs.event.WFSFeaturesSelectedEvent} event
         * Handles changes on the UI when a feature has been selected (highlights grid row)
         *
         */
        featureSelected: function (event) {
            if (!this.active) {
                return;
            }

            var layer = event.getMapLayer(),
                panel = this.layers['' + layer.getId()],
                fids = event.getWfsFeatureIds(),
                i;

            if (fids !== null && fids !== undefined && fids.length > 0) {
                panel.grid.select(fids[0], event.isKeepSelection());
                if (fids.length > 1) {
                    for (i = 1; i < fids.length; i += 1) {
                        panel.grid.select(fids[i], event.isKeepSelection());
                    }
                }
            } else {
                if (panel && panel.grid) {
                    panel.grid.removeSelections();
                }
            }
        },

        /**
         * @method setEnabled
         * True to enable grid functionality
         * False to disable and stop reacting to any map movements etc
         *
         * @param {Boolean} isEnabled
         *
         */
        setEnabled: function (isEnabled, clearContent) {
            if (this.active === isEnabled) {
                return;
            }

            this.active = !!isEnabled;
            var sandbox = this.instance.sandbox,
                request;

            // feature info activation disabled if object data grid flyout active and vice versa
            var gfiReqBuilder = sandbox.getRequestBuilder(
                'MapModulePlugin.GetFeatureInfoActivationRequest'
            );
            if (gfiReqBuilder) {
                sandbox.request(
                    this.instance.getName(),
                    gfiReqBuilder(!this.active)
                );
            }

            // disabled
            if (!this.active &&this.selectedTab) {
                // dim possible highlighted layer
                var dimReqBuilder = sandbox.getRequestBuilder(
                    'DimMapLayerRequest'
                );
                request = dimReqBuilder(this.selectedTab.layer.getId());
                sandbox.request(this.instance.getName(), request);
            }
            // enabled
            else if (this.selectedTab) {
                // highlight layer if any
                var hlReqBuilder = sandbox.getRequestBuilder(
                    'HighlightMapLayerRequest'
                );
                request = hlReqBuilder(this.selectedTab.layer.getId());
                sandbox.request(this.instance.getName(), request);

                if(clearContent) {
                    // clear panels
                    for (var panel in this.layers) {
                        if (panel.getContainer) {
                            panel.getContainer().empty();
                        }
                    }

                    // update data
                    this.updateGrid();
                }
            }
        },
        /**
         * Shows/removes a loading indicator for the layer
         * @param  {String}  layerId
         * @param  {Boolean} blnLoading true to show, false to remove
         */
        showLoadingIndicator : function(layerId, blnLoading) {
            this.__addOrRemoveClassFromHeader(
                this.layers[layerId], blnLoading, 'loading');
        },
        /**
         * Shows/removes an error indicator for the layer
         * @param  {String}  layerId
         * @param  {Boolean} blnError true to show, false to remove
         */
        showErrorIndicator : function(layerId, blnError) {
            this.__addOrRemoveClassFromHeader(
                this.layers[layerId], blnError, 'error');
        },
        /**
         * Actual implementation to show/remove indicator. Just
         * adds a class to the header of a panel
         * @private
         * @param  {Oskari.userinterface.component.TabPanel} panel
         * @param  {Boolean} blnAdd  true to show, false to remove
         * @param  {String} strClass class to toggle
         */
        __addOrRemoveClassFromHeader : function(panel, blnAdd, strClass) {
            if(panel) {
                link = panel.getHeader().find('a');
            }
            if(!link) {
                // not found
                return;
            }
            // setup indicator
            if(blnAdd) {
                link.addClass(strClass);
            }
            else {
                link.removeClass(strClass);
            }
        },
        /**
         * Add message text over tab data grid, if analysislayer
         * @private
         * @param  {Oskari.userinterface.component.TabPanel} panel
         * @param  {Array} locales localized field names
         * @param  {String} layer  Oskari layer
         */
        _appendHeaderMessage: function (panel, locales, layer) {
            var footer = this.template.wrapper.clone(),
                sandbox = this.instance.getSandbox(),
                inputid,
                inputlayer,
                loc = this.instance.getLocalization('gridFooter'),
                message;
            //clean up the old headermessage in case there was one
            jQuery(panel.html).parent().find('div.gridMessageContainer').remove();
            if (!loc || !layer || layer.getLayerType().toUpperCase() !== 'ANALYSIS') {
                return;
            }
            // Extract analysis input layer id
            inputid = layer.getId().split("_")[1];
            inputlayer = sandbox.findMapLayerFromAllAvailable(inputid);
            if (inputlayer &&  inputlayer.getLayerType().toUpperCase() === 'WFS') {
                if (inputlayer.getWpsLayerParams()) {
                    if (inputlayer.getWpsLayerParams().no_data) {
                        message = loc.noDataCommonMessage + ' (' + inputlayer.getWpsLayerParams().no_data + ').';
                        if(locales){
                            //TODO: better management for recognasing private data messages
                            _.forEach(locales, function (field) {
                                if (field === loc.aggregateColumnField){
                                    message = loc.noDataMessage + ' (' + inputlayer.getWpsLayerParams().no_data + ').';
                                } else if (field ===  'Muutos_t2-t1') {
                                    message += ' '+loc.differenceMessage + ' -111111111.';
                                }
                            });
                        }

                    }
                }
            }

            if (message) {
                //insert header text into dom before tabcontent (=always visible when content scrolling)
                jQuery(panel.html).before(footer.html(message));
            }

        }

    }, {
        /**
         * @static @property {String[]} protocol
         */
        protocol: ['Oskari.userinterface.Flyout']
    }
);
