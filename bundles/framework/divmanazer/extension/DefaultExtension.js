/**
 * @class Oskari.userinterface.extension.DefaultExtension
 *
 *
 */
Oskari.clazz.define('Oskari.userinterface.extension.DefaultExtension',

    /**
     * @static @method create called automatically on construction
     *
     * @param {string} name        Bundle name to be used for communication with
     *                             sandbox
     * @param {string} flyoutClazz An optional class name for flyout
     * @param {string} tileClazz   An optional class name for tile
     * @param {string} viewClazz   An optional class name for view
     * @param {string} locale      Locale
     *
     */
    function (name, flyoutClazz, tileClazz, viewClazz, locale) {
        this.sandbox = null;
        this.plugins = {};
        this._localization = locale;
        this.defaultConf = {
            name: name,
            tileClazz:
                tileClazz || 'Oskari.userinterface.extension.DefaultTile',
            flyoutClazz:
                flyoutClazz || 'Oskari.userinterface.extension.DefaultFlyout',
            viewClazz: viewClazz
        };
    }, {

        /**
         * @method getTitle
         * Extension protocol method
         *
         * @return {String} Localized text for the title of the component
         */
        getTitle: function () {
            return this.getLocalization('title');
        },

        /**
         * @method getDescription
         * Extension protocol method
         *
         * @return {String} Localized text for the description of the component
         */
        getDescription: function () {
            return this.getLocalization('desc');
        },

        /**
         * @method getSandbox
         * Convenience method to call from Tile and Flyout
         *
         * @return {Oskari.mapframework.sandbox.Sandbox} Sandbox
         */
        getSandbox: function () {
            return this.sandbox;
        },

        /**
         * @method update
         * BundleInstance protocol method
         */
        update: function () {},

        /**
         * @method getLocalization
         * Convenience method to call from Tile and Flyout
         * Returns JSON presentation of bundles localization data for current
         * language.
         * If key-parameter is not given, returns the whole localization data.
         *
         * @param {string=} key (optional) if given, returns the value for key
         *
         * @return {string|Object} returns single localization string or
         *      JSON object for complete data depending on localization
         *      structure and if parameter key is given
         */
        getLocalization: function (key) {
            if (!this._localization) {
                this._localization = Oskari.getLocalization(this.getName());
            }
            if (key) {
                return this._localization[key];
            }
            return this._localization;
        },

        /**
         * @method start
         * BundleInstance protocol method
         */
        start: function () {
            var me = this,
                conf = me.getConfiguration(),
                sandboxName = conf && conf.sandbox ? conf.sandbox : 'sandbox',
                sandbox = Oskari.getSandbox(sandboxName),
                request;

            me.sandbox = sandbox;
            sandbox.register(this);

            /* stateful */
            if (conf && conf.stateful === true) {
                sandbox.registerAsStateful(this.mediator.bundleId, this);
            }

            request = sandbox.getRequestBuilder(
                'userinterface.AddExtensionRequest'
            )(this);

            sandbox.request(this, request);

            this.afterStart(sandbox);
        },

        /**
         * Hook for bundle specific start functionality.
         * Override this in extending bundle to hook in your own startup
         * functionality.
         *
         * @param  {Oskari.mapframework.sandbox.Sandbox} sandbox Sandbox
         *
         */
        afterStart: function (sandbox) {},

        /**
         * @method stop
         * BundleInstance protocol method
         */
        stop: function () {
            var sandbox = this.sandbox,
                /* sandbox cleanup */
                request = sandbox.getRequestBuilder(
                    'userinterface.RemoveExtensionRequest'
                )(this);
            sandbox.request(this, request);

            sandbox.unregisterStateful(this.mediator.bundleId);
            sandbox.unregister(this);
            this.sandbox = null;
            this.started = false;
        },

        /**
         * @method startExtension
         * Extension protocol method
         */
        startExtension: function () {
            var me = this,
                sandbox = me.sandbox,
                p,
                locFlyout,
                locTile,
                locView;

            me.startPlugin();

            for (p in me.requestHandlers) {
                if (me.requestHandlers.hasOwnProperty(p)) {
                    sandbox.addRequestHandler(p, this);
                }
            }
            for (p in me.eventHandlers) {
                if (me.eventHandlers.hasOwnProperty(p)) {
                    sandbox.registerForEventByName(me, p);
                }
            }

            locFlyout = me.getLocalization('flyout');
            if (locFlyout && me.conf.flyoutClazz) {
                me.plugins['Oskari.userinterface.Flyout'] =
                    Oskari.clazz.create(me.conf.flyoutClazz, me, locFlyout);
            }

            locTile = me.getLocalization('tile');
            if (locTile && me.conf.tileClazz) {
                me.plugins['Oskari.userinterface.Tile'] =
                    Oskari.clazz.create(me.conf.tileClazz, me, locTile);
            }

            locView = me.getLocalization('view');
            if (locView && me.conf.viewClazz) {
                me.plugins['Oskari.userinterface.View'] =
                    Oskari.clazz.create(me.conf.viewClazz, me, locView);
            }
        },

        /* hook */
        startPlugin: function () {

        },

        /* hook */
        stopPlugin: function () {

        },

        /**
         * @method stopExtension
         * Extension protocol method
         */
        stopExtension: function () {
            var me = this,
                sandbox = me.sandbox,
                p,
                pluginType;
            for (p in me.eventHandlers) {
                if (me.eventHandlers.hasOwnProperty(p)) {
                    sandbox.unregisterFromEventByName(me, p);
                }
            }
            for (p in me.requestHandlers) {
                if (me.requestHandlers.hasOwnProperty(p)) {
                    sandbox.removeRequestHandler(p, this);
                }
            }
            for (pluginType in me.plugins) {
                if (me.plugins.hasOwnProperty(pluginType)) {
                    if (pluginType) {
                        me.plugins[pluginType] = null;
                    }
                }
            }

            me.stopPlugin();
        },

        /**
         * @method getPlugins
         * Extension protocol method
         */
        getPlugins: function () {
            return this.plugins;
        },

        init: function () {
            return null;
        },

        /**
         * @method getName
         * Module protocol method
         */
        getName: function () {
            return this.getConfiguration().name;
        },

        /**
         * @method getConfiguration
         *
         * @return {Ob}
         */
        getConfiguration: function () {
            // Extend the default config with injected conf and use the product
            // as actual conf.
            // This way an empty injected conf won't break the expected
            // functionality.
            // NOTE! seems loader sets conf for each inheritance step so we need
            // to do this each time name conf is undefined or name is changed.
            if (!this.conf ||
                    this.__confMerged === undefined ||
                    this.__confMerged !== this.conf.name) {
                this.conf = jQuery.extend(
                    true,
                    {},
                    this.defaultConf,
                    this.conf
                );
                this.__confMerged = this.conf.name;
            }
            return this.conf;
        },

        /**
         * @property eventHandlers
         * may be overridden in derived classes to get some events
         */
        eventHandlers: {

        },

        /**
         * @property requestHandlers
         * may be overridden in derived classes to get some requests
         */
        requestHandlers: {

        },

        /**
         * @method onEvent
         * Event is handled forwarded to correct #eventHandlers if found or
         * discarded if not.
         *
         * @param {Oskari.mapframework.event.Event} event a Oskari event object
         *
         */
        onEvent: function (event) {
            var me = this,
                handler = me.eventHandlers[event.getName()];
            if (!handler) {
                return;
            }

            return handler.apply(this, [event]);
        },

        /* o2 support for handling requests with less code... */
        handleRequest: function (core, request) {
            return this.onRequest(request);
        },

        onRequest: function (request) {
            var me = this,
                handler = me.requestHandlers[request.getName()];
            if (!handler) {
                return;
            }

            return handler.apply(this, [request]);
        },

        /**
         * @method getLang
         * helper to get current language from Oskari
         *
         */
        getLang: function () {
            return Oskari.getLang();
        },

        /* O2 helpers */

        getTile: function () {
            return this.plugins['Oskari.userinterface.Tile'];
        },

        setTile: function (t) {
            this.plugins['Oskari.userinterface.Tile'] = t;
        },

        setDefaultTile: function (txt) {
            var tileCls = Oskari.cls().extend(
                    'Oskari.userinterface.extension.DefaultTile'
                ),
                tile = tileCls.create(this, {
                    title: txt || ''
                });
            this.plugins['Oskari.userinterface.Tile'] = tile;
            return tile;
        },

        getFlyout: function () {
            return this.plugins['Oskari.userinterface.Flyout'];
        },

        setFlyout: function (f) {
            this.plugins['Oskari.userinterface.Flyout'] = f;
        },
        getView: function () {
            return this.plugins['Oskari.userinterface.View'];
        },

        /* o2 helpers for notifications and requetss */
        slicer: Array.prototype.slice,

        request: function (request) {
            return this.getSandbox().request(this, request);
        },

        /**
         * @method issue
         * Issues a request to sandbox and returns value from *the* registered
         *  equesthandler if any.
         *
         */
        issue: function (requestName) {
            var args = this.slicer.apply(arguments, [1]),
                builder = this.getSandbox().getRequestBuilder(requestName),
                request = builder.apply(builder, args);

            return this.getSandbox().request(this.getExtension(), request);
        },

        /**
         * @method notify sends notification to any registered listeners
         */
        notify: function (eventName) {
            var args = this.slicer.apply(arguments, [1]),
                builder = this.getSandbox().getEventBuilder(eventName),
                evt = builder.apply(builder, args);

            return this.getSandbox().notifyAll(evt);
        }
    }, {
        protocol: [
            'Oskari.bundle.BundleInstance',
            'Oskari.mapframework.module.Module',
            'Oskari.userinterface.Extension'
        ]
    });
