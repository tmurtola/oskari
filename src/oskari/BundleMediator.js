define(function() {
    /**
     * @class Oskari.Bundle_mediator
     * A mediator class to support bundle to/from bundle manager communication
     * and initialisation as well as bundle state management
     *
     * @param {Object} options Options
     *
     */
    var Bundle_mediator = function (options) {
        var p;
        this.manager = null;

        for (p in options) {
            if (options.hasOwnProperty(p)) {
                this[p] = options[p];
            }
        }
    };

    Bundle_mediator.prototype = {

        /**
         * @public @method setState
         *
         * @param  {string} state State
         *
         * @return {string}       State
         */
        setState: function (state) {
            this.state = state;
            this.manager.postChange(this.bundle, this.instance, this.state);
            return this.state;
        },

        /**
         * @public @method getState
         *
         *
         * @return {string} State
         */
        getState: function () {
            return this.state;
        }
    };
    return Bundle_mediator;
});