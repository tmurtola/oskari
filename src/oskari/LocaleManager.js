/**
 * A localisation registry
 */

define(["src/oskari/Logger"], function(Logger) {
    var log = new Logger('LocaleManager');
    var _getLangFromLocale = function(locale) {
        if(!locale) {
            // if no locale, default to default language
            return _lang;
        }
        var index = locale.indexOf('_');
        if(index !== -1) {
            return locale.substring(0, index);
        }
        return locale;
    };

    var _localizations = {},
        _supportedLocales = ['en_US'],
        _lang = _getLangFromLocale(_supportedLocales[0]),
        _decimalSeparators = {};

    return {

        /**
         * @public @method getLocalization
         * @param  {string} key Key
         * @return {string}     Localized value for key 
         */
    	getLocalization : function (key) {
            if (key === null || key === undefined) {
                throw new TypeError(
                    'getLocalization(): Missing key'
                );
            }
            if(!_localizations[_lang]) {
                _localizations[_lang] = {};
                log.warn("Requested localization missing for lang " + _lang);
            }
            var value = _localizations[_lang][key];
            if(!value) {
                log.warn("Localization missing for key " + key);
            }
            return value;
        },

        /**
         * @public @method setLocalization
         *
         * @param {string}  lang  Language
         * @param {string}  key   Key
         * @param {string=} value Value
         *
         */
        setLocalization: function (lang, key, value) {
            if (lang === null || lang === undefined) {
                throw new TypeError(
                    'setLocalization(): Missing lang'
                );
            }
            if (key === null || key === undefined) {
                throw new TypeError(
                    'setLocalization(): Missing key'
                );
            }
            if (!_localizations[lang]) {
                _localizations[lang] = {};
            }
            _localizations[lang][key] = value;
        },

        /**
         * @public @static @method Oskari.registerLocalization
         *
         * @param  {Object|Object[]} props Properties
         *
         */
        registerLocalization: function (props) {
            var i,
                prop,
                list = props;

            if (props === null || props === undefined) {
                throw new TypeError('registerLocalization(): Missing props');
            }

            if (!props.length) {
                list = [props];
            }
            for (i = 0; i < list.length; i += 1) {
                prop = list[i];
                this.setLocalization(prop.lang, prop.key, prop.value);
            }
        },
        /**
         * @public @method getLang
         *
         *
         * @return {string} Language
         */
        getLang: function () {
            return _lang;
        },

        /**
         * @public @method setLang
         *
         * @param {string} lang Language
         *
         */
        setLang: function (lang) {
            if (lang === null || lang === undefined) {
                throw new TypeError(
                    'setLang(): Missing lang'
                );
            }
            _lang = lang;
        },

        /**
         * @public @method getDecimalSeparator
         *
         *
         * @return {string} Decimal separator
         */
        getDecimalSeparator: function () {
            var me = this,
                lang = me.getLang(),
                locales = me.getSupportedLocales().filter(
                    function (locale){
                        return locale.indexOf(lang) === 0;
                    }
                ),
                separators = locales.map(function (locale) {
                        return me.getDecimalSeparators()[locale];
                    }
                );

            if (separators.length > 1) {
                log.warn('Found more than one separator for ' + this.getLang());
            }

            if (separators.length && separators[0]) {
                return separators[0];
            }
            return ','; // Most common separator
        },


        getDecimalSeparators: function () {
            return _decimalSeparators;
        },

        /**
         * @public @method setDecimalSeparators
         *
         * @param {Object} decimalSeparators Decimal separators
         *
         */
        setDecimalSeparators: function (decimalSeparators) {
            _decimalSeparators = decimalSeparators || {};
        },

        /**
         * @public @method getSupportedLanguages
         *
         *
         * @return {string[]} Supported languages 
         */
        getSupportedLanguages: function () {
            var langs = [],
                locales = this.getSupportedLocales(),
                i = 0;

            for (; i < locales.length; i++) {
                langs.push(_getLangFromLocale(locales[i]));
            }
            return langs;
        },

        /**
         * @public @method getSupportedLocales
         *
         *
         * @return {string[]} Supported locales 
         */
        getSupportedLocales: function () {
            return _supportedLocales || ['en_US'];
        },

        /**
         * @public @method setSupportedLocales
         *
         * @param {string[]} locales Locales array
         *
         */
        setSupportedLocales: function (locales) {
            if (locales === null || locales === undefined) {
                throw new TypeError(
                    'setSupportedLocales(): Missing locales'
                );
            }
            if (!Array.isArray(locales)) {
                throw new TypeError(
                    'setSupportedLocales(): locales is not an array'
                );
            }
            _supportedLocales = locales;
        },

        /**
         * @public @method getDefaultLanguage
         *
         * @return {string} Default language 
         */
        getDefaultLanguage: function () {
            var locale = this.getSupportedLocales()[0];
            return _getLangFromLocale(locale);
        }
    };
});