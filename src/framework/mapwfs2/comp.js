define([
	"jquery-cookie",
    "jquery-cometd"
], function(jqcookie, jqcometd) {
	window.jQuery.cometd = jqcometd.cometd;
    // Do nothing
    // TODO: refactor mapwfs2 packages bundle.js to include jquery-cometd directly instread of comp.js which combines cometd.org and jQuery.cometd plugins
});