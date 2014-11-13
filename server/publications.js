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

Meteor.publish('playback-checkins', function(limit){
    return Checkins.find({ geography : { $exists : true }},{
        sort : {
            created : 1
        },
        limit : limit
    });
});

Meteor.publish('checkinsByCity', function(cityId){
    return Checkins.find({ 'geography.cityId' : cityId });
});

Meteor.publish('city-stats', function(){
    return CityStats.find();
});

Meteor.publish('country-stats', function(){
    return CountryStats.find();
});

Meteor.publish('all-users', function(){
    return Meteor.users.find();
});