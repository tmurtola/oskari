// Do nothing, the purpose of this file is to overwrite comp.js from Oskari1 as these dependencies should have been in packages as separate files

define([
    "jquery-cookie",
    "jquery-cometd"
], function (jQcookie, jQcometd) {
	// TODO: remove global reference
	window.jQuery.cookie = jQcookie.cookie;
	window.jQuery.cometd = jQcometd.cometd;
});