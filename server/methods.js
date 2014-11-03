Meteor.methods({
    reverseGeocode : function(latitude,longitude){
        var Future = Npm.require('fibers/future');
        var future = new Future();
        Geocoder.reverseGeocode(latitude, longitude, function(result){
            future.return(result);
        });
        return future.wait();
    }
});