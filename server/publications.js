Meteor.publish('checkins', function(limit){
    
    // use this for throttling purposes (e.g. to debug loading template)
    // var self = this;

    // Meteor.setTimeout(function(){
    //     var checkins = getAllCheckins().fetch();
    //     _.each(checkins, function(c){
    //         self.added('checkins', c._id, c);
    //     });

    //     self.ready();
    // }, 5000);

    return getAllCheckins(limit);
});

Meteor.publish('city-stats', function(){
    return CityStats.find();
});

Meteor.publish('country-stats', function(){
    return CountryStats.find();
});
