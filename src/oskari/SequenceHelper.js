define(function() {
    // Add a sequence counter to Oskari
    var sequences = {};
    var getNextVal = function(type) {
        if (!sequences[type]) {
            sequences[type] = 1;
        } else {
            sequences[type] += 1;
        }
        return sequences[type];
    };
    return {
        getNextVal : getNextVal
    }
});