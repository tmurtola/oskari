define(["src/oskari/1.5/oskari-extensions"], function(Oskari) {

    
    /* Object Generic class */
    /* example:
     *    // instantiate
     *    var obj = Oskari.Object.create({ 'prop' : 'value' });
     * 
     *    // extend 
     *    var objCls = Oskari.Object.extend( {
     *        funk: function() { return "obj extended "+this.prop; } 
     *   }); 
     *    // and instantiate
     *   var enhancedObj = objCls.create({ 'prop' : 'new value' });
     *   enhancedObj.funk();
     */ 
    var oskariObj = Oskari.cls('Oskari.Object' ,function(instanceProps) {
        for (ip in instanceProps) {
            if (instanceProps.hasOwnProperty(ip)) {
                 this[ip] = instanceProps[ip];
            }
        }
    });
    return oskariObj;
});