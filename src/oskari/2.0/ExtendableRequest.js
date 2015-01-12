define(["src/oskari/1.5/oskari-extensions"], function(Oskari) {

    /* Oskari.Request */
    /* example: 
     *   var reqCls = Oskari.Request.extend({ name: 'MyRequest'});
     *   var req = reqcls.create( { 'prop': 'value' });
     *   Oskari.getSandbox().request("MainMapModule", req);
     *    
     */ 
    var ExtendableRequest = Oskari.cls('Oskari.Request', function() {
//        console.log("CREATED EXTENDABLE REQUEST as BASE for REQUESTS");
    }, {
	extend : function(props) {
          return Oskari.cls(props.name ? 'Oskari.request._.'+props.name: undefined,function(instanceProps) {
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
           protocol : ['Oskari.mapframework.request.Request']
         }).category(props);
       }
     });
	return ExtendableRequest;
});