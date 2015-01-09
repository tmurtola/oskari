define(function() {
    // Add a sequence counter to Oskari
    var sequences = {};
    var getSeqNextVal = function(type) {
        if (!sequences[type]) {
            sequences[type] = 1;
        } else {
            sequences[type] += 1;
        }
        return sequences[type];
    };
    return {
        getSeqNextVal : getSeqNextVal
    }
});