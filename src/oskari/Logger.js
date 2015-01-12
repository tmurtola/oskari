define(["lodash"], function(_) {

    var isDebug = true,
        includeCaller = false,
        hasConsole = window.console;
    var logMsg = function (args, callee) {
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

    var unshift = function(addToFirst, list) {
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
        var newArgs = unshift('debug', arguments);
        logMsg(newArgs, arguments.callee);
    };

    Logger.prototype.warn =  function() {
        var newArgs = unshift('warn', arguments);
        logMsg(newArgs, arguments.callee);
    };

    Logger.prototype.error =  function() {
        var newArgs = unshift('error', arguments);
        logMsg(newArgs, arguments.callee);
    };

    return Logger;
});

