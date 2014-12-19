/**
 * A localisation registry
 */

define({
	lang : 'en',
	localizations : {},
	supportedLocales : ['en_US'],

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
        return this.localizations[this.lang][key];
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
        if (!this.localizations[lang]) {
            this.localizations[lang] = {};
        }
        this.localizations[lang][key] = value;
    },

    /**
     * @public @method getLang
     *
     *
     * @return {string} Language
     */
    getLang: function () {
        return this.lang;
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
        this.lang = lang;
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

            if (console && console.warn) {
                console.warn(
                    'Found more than one separator for ' + this.getLang()
                );
            }
        }

        if (separators.length && separators[0]) {
            return separators[0];
        }
        return ','; // Most common separator
    },


    getDecimalSeparators: function () {
        return this.decimalSeparators;
    },

    /**
     * @public @method setDecimalSeparators
     *
     * @param {Object} decimalSeparators Decimal separators
     *
     */
    setDecimalSeparators: function (decimalSeparators) {
        this.decimalSeparators = decimalSeparators;
    },

    /**
     * @public @method getSupportedLanguages
     *
     *
     * @return {string[]} Supported languages 
     */
    getSupportedLanguages: function () {
        var langs = [],
            locale,
            i,
            index,
            lang;

        for (i = 0; i < this.supportedLocales.length; i += 1) {
            locale = this.supportedLocales[i];
            index = locale.indexOf('_');
            lang = locale;
            if(index !== -1) {
                lang = locale.substring(0, index);
            }
            langs.push(lang);
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
        return this.supportedLocales || [];
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
        this.supportedLocales = locales;
    },

    /**
     * @public @method getDefaultLanguage
     *
     *
     * @return {string} Default language 
     */
    getDefaultLanguage: function () {
        var locale = this.supportedLocales[0],
            ret;

        if (locale.indexOf('_') !== -1) {
            ret = locale.substring(0, locale.indexOf('_'));
        }
        return ret;
    },

    /**
     * @static
     * @method Oskari.registerLocalization
     */
    registerLocalization : function(props) {
        if (props.length) {
            for (var p = 0; p < props.length; p++) {
                var pp = props[p];
                this.setLocalization(pp.lang, pp.key, pp.value);
            }
        } else {
            return this.setLocalization(props.lang, props.key, props.value);
        }
    },
    /**
     * @static
     * @method Oskari.getLocalization
     */
    getLocalization : function(key) {
        return this.getLocalization(key);
    }
});