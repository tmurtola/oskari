define(["lodash"], function(_) {

    var isDebug = false,
        includeCaller = false,
        hasConsole = window.console;
    var _logMsg = function (args, callee) {
        	var level = args.shift();
            if (!hasConsole || 
            	!window.console[level] || 
            	!window.console[level].apply) {
                // maybe gather messages and provide a custom debug console?
                return;
            }
            if(includeCaller && callee && callee.caller) {
                args.push(callee.caller);
            }
            window.console[level].apply(window.console, args);
        };

    var _unshift = function(addToFirst, list) {
  		var args = Array.prototype.slice.call(list);
  		args.unshift(addToFirst);
    	return args;
    }

    var Logger = function(name) {
        this.name = name || "Logger";
    };

    Logger.prototype.setInclCaller = function(bln) {
        includeCaller = !!bln;
    }

    Logger.prototype.enableDebug = function(bln) {
        isDebug = !!bln;
    }

    Logger.prototype.debug = function() {
        if(!isDebug) {
            return;
        }
        var newArgs = _unshift('debug', arguments);
        _logMsg(newArgs, arguments.callee);
    };

    Logger.prototype.warn =  function() {
        var newArgs = _unshift('warn', arguments);
        _logMsg(newArgs, arguments.callee);
    };

    Logger.prototype.error =  function() {
        var newArgs = _unshift('error', arguments);
        _logMsg(newArgs, arguments.callee);
    };

    return Logger;
});

