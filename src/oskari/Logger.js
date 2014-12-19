define(["lodash"], function(_) {

    var isDebug = true,
        hasConsole = window.console;
    var logMsg = function (args) {
        	var level = args.shift();
            if (!hasConsole || 
            	!window.console[level] || 
            	!window.console[level].apply) {
                // maybe gather messages and provide a custom debug console?
                return;
            }
            window.console[level].apply(window.console, args);
        };

    var unshift = function(addToFirst, list) {
  		var args = Array.prototype.slice.call(list);
  		args.unshift(addToFirst);
    	return args;
    }

    return {
    	debug : function() {
    		if(!isDebug) {
    			return;
    		}
    		var newArgs = unshift('debug', arguments);
    		logMsg(newArgs);
    	},
        warn :  function() {
    		var newArgs = unshift('warn', arguments);
    		logMsg(newArgs);
    	},
        error :  function() {
    		var newArgs = unshift('error', arguments);
    		logMsg(newArgs);
    	}
    }
});

