define(["src/oskari/1.5/oskari-extensions"], function(Oskari) {

    
    /* Oskari.Event */
    /* example: 
     *   var evtCls = Oskari.Event.extend({ name: 'MyEvent' });
     *   var evt = evtCls.create({ 'prop': 'value' }); 
     *   Oskari.getSandbox().notifyAll(evt);  
     */ 
    var ExtendableEvent = Oskari.cls('Oskari.Event', function() {
//        console.log("CREATED EXTENDABLE EVENT as BASE for EVENTS");
    }, {
	extend : function(props) {
	   return Oskari.cls(props.name ? 'Oskari.event._.'+props.name: undefined,function(instanceProps) {
	        for (ip in instanceProps) {
	       	    if (instanceProps.hasOwnProperty(ip)) {
        		this[ip] = instanceProps[ip];
	            }	
        	}
	      },{
              getName : function() {
                return this.name;
              }
           },{
             protocol : ['Oskari.mapframework.event.Event']
           }).category(props);
	}
    });
	return ExtendableEvent;
});